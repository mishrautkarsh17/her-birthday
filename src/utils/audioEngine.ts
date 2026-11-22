// High-Fidelity Song Audio Engine for hbd.mp3
// Handles seamless streaming, play/pause, smooth volume fading, and global UI synchronization.

class SongAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.85;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private fadeInterval: NodeJS.Timeout | null = null;
  private userManuallyPaused: boolean = false;
  private isAutoPlaySetup: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.audio = new Audio("/hbd.mp3");
      this.audio.preload = "auto";
      this.audio.loop = true;
      this.audio.volume = this.currentVolume;

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("ended", () => {
        this.isPlaying = false;
        this.notify();
      });

      // Immediately attempt autoplay and register global interaction triggers
      this.attemptAutoPlay();
      this.setupGlobalUnlock();
    }
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.add(fn);
    fn(this.isPlaying);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.isPlaying);
      } catch {
        // ignore listener errors
      }
    });
  }

  public attemptAutoPlay() {
    if (!this.audio || this.isPlaying || this.userManuallyPaused) return;
    this.start(0.8).catch(() => {
      // Browser autoplay policy blocked unprompted start; setupGlobalUnlock will catch user's first gesture
    });
  }

  private cleanupUnlockListeners: (() => void) | null = null;

  public setupGlobalUnlock() {
    if (typeof window === "undefined" || this.isAutoPlaySetup) return;
    this.isAutoPlaySetup = true;

    const events = ["click", "pointerdown", "touchstart", "scroll", "wheel", "keydown"];
    
    const cleanup = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, unlock);
      });
      this.cleanupUnlockListeners = null;
    };
    this.cleanupUnlockListeners = cleanup;

    const unlock = () => {
      if (this.isPlaying) {
        cleanup();
        return;
      }
      if (!this.userManuallyPaused) {
        this.start(0.8)
          .then(() => {
            cleanup();
          })
          .catch(() => {});
      }
    };

    events.forEach((evt) => {
      window.addEventListener(evt, unlock, { passive: true });
    });
  }

  public async start(fadeDuration: number = 0.8, isManual: boolean = false) {
    if (isManual) {
      this.userManuallyPaused = false;
    }
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    try {
      this.audio.volume = 0;
      await this.audio.play();
      this.isPlaying = true;
      this.notify();

      if (this.cleanupUnlockListeners) {
        this.cleanupUnlockListeners();
      }

      const steps = 16;
      const stepTime = (fadeDuration * 1000) / steps;
      const volStep = this.currentVolume / steps;
      let step = 0;

      this.fadeInterval = setInterval(() => {
        step++;
        if (this.audio) {
          this.audio.volume = Math.min(this.currentVolume, step * volStep);
        }
        if (step >= steps) {
          if (this.fadeInterval) clearInterval(this.fadeInterval);
        }
      }, stepTime);
    } catch {
      // autoplay prevented by browser policy before user gesture
    }
  }

  public stop(fadeDuration: number = 0.8, isManual: boolean = false) {
    if (isManual) {
      this.userManuallyPaused = true;
    }
    if (!this.audio || !this.isPlaying) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const steps = 16;
    const stepTime = (fadeDuration * 1000) / steps;
    const initialVol = this.audio.volume;
    const volStep = initialVol / steps;
    let step = 0;

    this.fadeInterval = setInterval(() => {
      step++;
      if (this.audio) {
        this.audio.volume = Math.max(0, initialVol - step * volStep);
      }
      if (step >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.audio?.pause();
        this.isPlaying = false;
        this.notify();
      }
    }, stepTime);
  }

  public fadeOutToSilence(durationSeconds: number = 2.5) {
    this.stop(durationSeconds);
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.currentVolume;
    }
  }

  public restart() {
    if (this.audio) {
      this.audio.currentTime = 0;
      this.start(0.4);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = typeof window !== "undefined" ? new SongAudioEngine() : null;
