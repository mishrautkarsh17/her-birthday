"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Check, Sparkles, Volume2, VolumeX, ArrowRight, PenLine, Disc, ExternalLink, Music } from "lucide-react";
import confetti from "canvas-confetti";
import { audioEngine } from "@/utils/audioEngine";
import ArtisanCake from "@/components/ArtisanCake";
import { playlistSongs } from "@/components/Section7Playlist";

interface InteractiveCelebrationProps {
  herName: string;
  onFinish: () => void;
}

export default function InteractiveCelebration({
  herName,
  onFinish,
}: InteractiveCelebrationProps) {
  // Step 1: "wish", Step 2: "cake", Step 3: "cut_celebration", Step 4: "playlist"
  const [currentStep, setCurrentStep] = useState<"wish" | "cake" | "cut_celebration" | "playlist">("wish");

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [wishRecorded, setWishRecorded] = useState(false);
  const [wishText, setWishText] = useState("");
  const [isTypingWish, setIsTypingWish] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cake Cutting State
  const [isCutting, setIsCutting] = useState(false);
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [isCakeSongPlaying, setIsCakeSongPlaying] = useState(false);
  const cakeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Playlist state inside celebration
  const [celebrationSongIndex, setCelebrationSongIndex] = useState(0);
  const activeCelebrationSong = playlistSongs[celebrationSongIndex];

  // Initialize cake celebration audio (happy.mp3)
  useEffect(() => {
    const audio = new Audio("/happy.mp3");
    audio.preload = "auto";
    audio.addEventListener("play", () => setIsCakeSongPlaying(true));
    audio.addEventListener("pause", () => setIsCakeSongPlaying(false));
    audio.addEventListener("ended", () => setIsCakeSongPlaying(false));
    cakeAudioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Timer for recording duration
  useEffect(() => {
    if (isRecording) {
      setRecordDuration(0);
      timerRef.current = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Start Mic Recording
  const startRecording = async () => {
    // Pause background song while recording voice wish so mic is clean
    if (audioEngine && audioEngine.getIsPlaying()) {
      audioEngine.stop(0.4);
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await saveWishToServer(audioBlob, recordDuration);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      setIsTypingWish(true);
    }
  };

  // Stop Mic Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setWishRecorded(true);
    }
  };

  // Save Wish to Backend API
  const saveWishToServer = async (audioBlob?: Blob, duration?: number, text?: string) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      if (audioBlob) {
        formData.append("audio", audioBlob, "wish.webm");
        formData.append("duration", String(duration || 0));
      }
      if (text) {
        formData.append("text", text);
      }

      await fetch("/api/wishes", {
        method: "POST",
        body: formData,
      });
      setWishRecorded(true);
    } catch {
      setWishRecorded(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveTextWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    await saveWishToServer(undefined, 0, wishText.trim());
    setWishRecorded(true);
  };

  // Subtle acoustic sound when cake is sliced
  const playSliceAcousticCue = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.3);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // AudioContext not allowed or not supported, ignore gracefully
    }
  };

  // Trigger Cake Cutting
  const handleCutCake = () => {
    if (isCutting || isCakeCut) return;
    setIsCutting(true);

    setTimeout(() => {
      playSliceAcousticCue();
    }, 700);

    setTimeout(() => {
      setIsCakeCut(true);
      setCurrentStep("cut_celebration");

      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.65 },
        colors: ["#F6D365", "#FF9A9E", "#FECFEF", "#D9E7FF", "#FFFFFF", "#FFD700"],
      });

      // Pause the background song so the celebration music plays cleanly
      if (audioEngine && audioEngine.getIsPlaying()) {
        audioEngine.stop(0.4);
      }

      // Play the "happy" mp3 for cake celebration
      if (cakeAudioRef.current) {
        cakeAudioRef.current.currentTime = 0;
        cakeAudioRef.current.play().catch(() => {
          // Autoplay fallback if blocked by browser
        });
      }
    }, 1300);
  };

  const toggleCakeAudio = () => {
    if (!cakeAudioRef.current) return;
    if (isCakeSongPlaying) {
      cakeAudioRef.current.pause();
    } else {
      if (audioEngine && audioEngine.getIsPlaying()) {
        audioEngine.stop(0.4);
      }
      cakeAudioRef.current.play().catch(() => {});
    }
  };

  const handleProceedToPlaylist = () => {
    if (cakeAudioRef.current) {
      cakeAudioRef.current.pause();
    }
    if (audioEngine && audioEngine.getIsPlaying()) {
      audioEngine.stop(0.8);
    }
    setCurrentStep("playlist");
  };

  const handleFinishCelebration = () => {
    if (cakeAudioRef.current) {
      cakeAudioRef.current.pause();
    }
    onFinish();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F1C] text-white px-6 select-none overflow-y-auto py-12">

      {/* Atmospheric warm background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#FF9A9E]/15 via-[#F6D365]/20 to-[#FECFEF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-xl w-full mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          {/* ─────────────────────────────────────────────────────
              STAGE 1: MAKE A WISH
             ───────────────────────────────────────────────────── */}
          {currentStep === "wish" && (
            <motion.div
              key="stage-wish"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Solitary Candle Flame */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-8 h-20 flex flex-col items-center justify-end">
                  <motion.div
                    animate={{
                      scaleY: [1, 1.15, 0.95, 1],
                      scaleX: [1, 0.9, 1.05, 1],
                      rotate: [-1, 2, -2, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-5 h-8 bg-gradient-to-t from-[#F6D365] via-[#FF9A9E] to-white rounded-[50%_50%_35%_35%] shadow-[0_0_25px_rgba(246,211,101,0.9)] mb-1"
                  />
                  <div className="w-0.5 h-3 bg-neutral-600 rounded-full" />
                  <div className="w-5 h-10 bg-gradient-to-b from-[#FFF9F5] to-[#E8DED6] rounded-t-sm shadow-md" />
                </div>
              </div>

              <div>
                <h2 className="font-serif text-4xl sm:text-5xl text-white font-semibold tracking-tight">
                  Make a wish, {herName}.
                </h2>
                <p className="font-sans text-neutral-300 text-sm sm:text-base mt-3 font-normal max-w-md mx-auto leading-relaxed">
                  Before you cut your cake, close your eyes and ask for whatever your heart desires.
                </p>
              </div>

              {/* Wish Interaction Container */}
              <div className="p-8 rounded-[28px] bg-white/[0.07] border border-white/15 backdrop-blur-xl shadow-2xl">
                {!wishRecorded ? (
                  !isTypingWish ? (
                    <div className="flex flex-col items-center gap-6">
                      {isRecording ? (
                        <>
                          <div className="relative">
                            <motion.div
                              animate={{ scale: [1, 1.35, 1] }}
                              transition={{ repeat: Infinity, duration: 1.4 }}
                              className="absolute inset-0 rounded-full bg-red-500/30 blur-md"
                            />
                            <button
                              onClick={stopRecording}
                              className="relative w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                              title="Stop and save wish"
                            >
                              <Square className="w-7 h-7 fill-white" />
                            </button>
                          </div>

                          <div className="space-y-1">
                            <p className="font-serif italic text-xl text-neutral-200">
                              Listening to your wish...
                            </p>
                            <span className="font-sans text-xs text-red-400 font-medium">
                              00:{recordDuration < 10 ? `0${recordDuration}` : recordDuration}
                            </span>
                          </div>

                          <button
                            onClick={stopRecording}
                            className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-sans font-medium transition-colors"
                          >
                            Lock in my wish
                          </button>
                        </>
                      ) : (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startRecording}
                            className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#F6D365] via-[#FF9A9E] to-[#FECFEF] text-neutral-900 flex items-center justify-center shadow-[0_0_30px_rgba(255,154,158,0.4)] cursor-pointer"
                            title="Speak your wish"
                          >
                            <Mic className="w-8 h-8 text-neutral-900" />
                          </motion.button>

                          <div className="space-y-1">
                            <p className="font-serif italic text-lg sm:text-xl text-neutral-200 font-medium">
                              Tap the mic & speak your wish
                            </p>
                            <p className="text-xs font-sans text-neutral-400">
                              Your voice is saved safely for me
                            </p>
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={() => setIsTypingWish(true)}
                              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors font-sans"
                            >
                              <PenLine className="w-3.5 h-3.5" />
                              <span>Prefer to type your wish?</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Typing Wish Option */
                    <form onSubmit={handleSaveTextWish} className="space-y-4">
                      <p className="font-serif italic text-lg text-neutral-200">
                        Whisper your wish in words...
                      </p>
                      <textarea
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        placeholder="My wish for this year is..."
                        rows={3}
                        className="w-full rounded-2xl bg-white/10 border border-white/20 p-4 text-white text-sm focus:outline-none focus:border-[#FF9A9E] transition-colors resize-none placeholder:text-neutral-500 font-serif"
                        autoFocus
                      />
                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setIsTypingWish(false)}
                          className="text-xs text-neutral-400 hover:text-white transition-colors font-sans"
                        >
                          Use mic instead
                        </button>
                        <button
                          type="submit"
                          disabled={!wishText.trim() || isUploading}
                          className="px-6 py-2.5 rounded-full bg-white text-neutral-900 font-sans font-semibold text-xs hover:bg-neutral-100 disabled:opacity-40 transition-all cursor-pointer shadow-md"
                        >
                          {isUploading ? "Saving..." : "Lock In Wish"}
                        </button>
                      </div>
                    </form>
                  )
                ) : (
                  /* Wish Saved Confirmation */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4 py-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#8BA888]/30 border border-[#8BA888] text-[#A3E39F] flex items-center justify-center mx-auto shadow-sm">
                      <Check className="w-6 h-6" />
                    </div>
                    <p className="font-serif text-2xl text-white font-medium">
                      Your wish is sealed and kept safe.
                    </p>
                    <p className="text-xs font-sans text-neutral-400">
                      May every single word of it come true.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Proceed to Cake Cutting */}
              <div>
                <button
                  onClick={() => setCurrentStep("cake")}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-neutral-950 font-sans font-semibold text-sm hover:bg-neutral-100 shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all cursor-pointer hover:scale-105 active:scale-100"
                >
                  <span>{wishRecorded ? "Let's Cut Your Cake" : "Ready to Cut the Cake"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────
              STAGE 2: ARTISAN CAKE CUTTING ANIMATION & SONG
             ───────────────────────────────────────────────────── */}
          {(currentStep === "cake" || currentStep === "cut_celebration") && (
            <motion.div
              key="stage-cake"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl text-white font-semibold tracking-tight">
                  {isCakeCut ? `Happy Birthday, ${herName}! 🎂` : "Time to Cut the Cake"}
                </h2>
                <p className="font-serif italic text-lg sm:text-xl text-neutral-300 mt-2 font-normal">
                  {isCakeCut
                    ? "Listen... this song is for you."
                    : "Press the button below to slice your birthday cake."}
                </p>
              </div>

              {/* Artisan Handcrafted Cake with 3D Slice & Vintage Knife */}
              <div className="relative py-2">
                <ArtisanCake isCutting={isCutting} isCakeCut={isCakeCut} />
              </div>

              {/* Action Buttons & Player */}
              <div className="space-y-6">
                {!isCakeCut ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isCutting}
                    onClick={handleCutCake}
                    className="px-10 py-4 rounded-full bg-gradient-to-r from-[#F6D365] via-[#FF9A9E] to-[#FECFEF] text-neutral-900 font-sans font-bold text-base shadow-[0_0_35px_rgba(255,154,158,0.55)] hover:shadow-[0_0_45px_rgba(246,211,101,0.7)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isCutting ? "Slicing Your Cake..." : "Press to Cut Cake 🎂"}
                  </motion.button>
                ) : (
                  <div className="space-y-6">
                    {/* Song Playing Indicator */}
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md max-w-sm mx-auto flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-end gap-[3px] h-4 w-4">
                          <span className={`w-0.5 bg-[#FF9A9E] ${isCakeSongPlaying ? 'animate-[bounce_1.2s_ease-in-out_infinite]' : 'h-1.5'} rounded-full`} />
                          <span className={`w-0.5 bg-[#FF9A9E] ${isCakeSongPlaying ? 'animate-[bounce_1s_ease-in-out_infinite_0.2s]' : 'h-1'} rounded-full`} />
                          <span className={`w-0.5 bg-[#FF9A9E] ${isCakeSongPlaying ? 'animate-[bounce_1.4s_ease-in-out_infinite_0.4s]' : 'h-2'} rounded-full`} />
                        </div>
                        <div className="text-left">
                          <p className="font-serif italic text-sm text-white font-medium">
                            Happy Birthday 🎂
                          </p>
                          <p className="text-[11px] font-sans text-neutral-400">
                            {isCakeSongPlaying ? "Playing your birthday celebration" : "Music paused"}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={toggleCakeAudio}
                        className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                        title={isCakeSongPlaying ? "Pause song" : "Play song"}
                      >
                        {isCakeSongPlaying ? (
                          <Volume2 className="w-4 h-4 text-[#FF9A9E]" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-neutral-400" />
                        )}
                      </button>
                    </div>

                    {/* Button to proceed to the emotional songs playlist */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      <button
                        onClick={handleProceedToPlaylist}
                        className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-neutral-950 font-sans font-semibold text-sm hover:bg-neutral-100 shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all cursor-pointer hover:scale-105 active:scale-100"
                      >
                        <Sparkles className="w-4 h-4 text-[#FF9A9E]" />
                        <span>Two Songs For You</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────
              STAGE 3: THE EMOTIONAL SONGS PLAYLIST
             ───────────────────────────────────────────────────── */}
          {currentStep === "playlist" && (
            <motion.div
              key="stage-playlist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h2 className="font-serif text-3xl sm:text-5xl text-white font-semibold tracking-tight">
                  Two Songs For You
                </h2>
                <p className="font-serif italic text-base sm:text-xl text-neutral-300 mt-2 font-normal">
                  Listen before you read the final words...
                </p>
              </div>

              {/* Emotion Tabs */}
              <div className="flex flex-wrap justify-center gap-2.5">
                {playlistSongs.map((song, idx) => (
                  <button
                    key={song.id}
                    onClick={() => setCelebrationSongIndex(idx)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 ${
                      celebrationSongIndex === idx
                        ? "bg-white text-neutral-950 font-semibold shadow-md scale-105"
                        : "bg-white/15 text-neutral-300 hover:bg-white/25 border border-white/20 font-medium"
                    }`}
                  >
                    <Music className="w-3.5 h-3.5" />
                    <span>{song.emotion}</span>
                  </button>
                ))}
              </div>

              {/* Active Song Player Card */}
              <div className="p-6 sm:p-8 rounded-[28px] bg-white/[0.08] border border-white/15 backdrop-blur-xl shadow-2xl text-left space-y-5">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-sans font-semibold text-[#F6D365] mb-2">
                    {activeCelebrationSong.emotion}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                    {activeCelebrationSong.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-400">
                    {activeCelebrationSong.artist}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-serif italic text-lg sm:text-xl text-neutral-200">
                    &ldquo;{activeCelebrationSong.caption}&rdquo;
                  </p>
                </div>

                {/* Spotify Embed Player */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-sans text-neutral-400 flex items-center gap-1.5">
                      <Disc className="w-3.5 h-3.5 text-[#1DB954]" />
                      Listen on Spotify
                    </span>
                    <a
                      href={`https://open.spotify.com/track/${activeCelebrationSong.spotifyId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-sans text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      Open in app <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="rounded-xl overflow-hidden shadow-sm border border-white/10 bg-black/40">
                    <iframe
                      src={`https://open.spotify.com/embed/track/${activeCelebrationSong.spotifyId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="border-0 rounded-xl"
                      title={`${activeCelebrationSong.title} - ${activeCelebrationSong.artist}`}
                    />
                  </div>
                </div>
              </div>

              {/* Proceed to The Final Message */}
              <div className="pt-2">
                <button
                  onClick={handleFinishCelebration}
                  className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-white text-neutral-950 font-sans font-semibold text-sm hover:bg-neutral-100 shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-100"
                >
                  <Sparkles className="w-4 h-4 text-[#FF9A9E]" />
                  <span>The Final Words</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
