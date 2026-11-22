// Web Audio API Procedural Ambient Soundscape Engine
// Generates warm, peaceful, cinematic ambient chords (Cmaj7 -> Gmaj7 -> Am7 -> Fmaj7)
// with soft lowpass filtering, gentle stereo panning, and subtle tape warmth.

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private chordInterval: NodeJS.Timeout | null = null;
  private activeNodes: (AudioNode)[] = [];
  private currentVolume: number = 0.35;

  private chords = [
    // Cmaj7: C4, E4, G4, B4, D5
    [261.63, 329.63, 392.00, 493.88, 587.33],
    // Gmaj7: G3, B3, D4, F#4, A4
    [196.00, 246.94, 293.66, 369.99, 440.00],
    // Am7: A3, C4, E4, G4, C5
    [220.00, 261.63, 329.63, 392.00, 523.25],
    // Fmaj7: F3, A3, C4, E4, G4
    [174.61, 220.00, 261.63, 329.63, 392.00]
  ];

  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number, delay: number, velocity: number = 0.2) {
    if (!this.ctx || !this.masterGain) return;

    const startTime = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Gentle sine / warm triangle combination
    osc.type = Math.random() > 0.4 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(freq, startTime);

    // Subtle pitch drift for analog nostalgia
    const detune = (Math.random() - 0.5) * 8;
    osc.detune.setValueAtTime(detune, startTime);

    // Warm low-pass filter
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800 + Math.random() * 400, startTime);
    filter.Q.setValueAtTime(1.2, startTime);

    // Soft envelope (slow attack, long smooth release)
    const attackTime = 1.2;
    const releaseTime = duration - attackTime;

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(velocity * 0.15, startTime + attackTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + attackTime + releaseTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.5);

    this.activeNodes.push(osc, gain, filter);
  }

  private triggerChord() {
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    // Arpeggiate softly across 6.5 seconds
    chord.forEach((freq, idx) => {
      const delay = idx * 0.35 + (Math.random() * 0.1);
      this.playTone(freq, 6.0, delay, 0.22 - idx * 0.02);
    });

    // Occasional gentle bell chime high in octave
    if (Math.random() > 0.4) {
      const chimeFreq = chord[Math.floor(Math.random() * chord.length)] * 2;
      this.playTone(chimeFreq, 4.0, 2.0 + Math.random(), 0.08);
    }
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    // Fade in master gain smoothly
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.currentVolume, this.ctx.currentTime + 2);
    }

    this.triggerChord();
    this.chordInterval = setInterval(() => {
      this.triggerChord();
    }, 6000);
  }

  public stop(fadeDuration: number = 1.5) {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);
    }
  }

  public fadeOutToSilence(durationSeconds: number = 3) {
    this.stop(durationSeconds);
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && this.isPlaying) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = typeof window !== "undefined" ? new AmbientAudioEngine() : null;
