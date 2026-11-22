"use client";

import React, { useState, useEffect } from "react";
import { VolumeX, Music } from "lucide-react";
import { audioEngine } from "@/utils/audioEngine";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!audioEngine) return;
    const unsubscribe = audioEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleAudio = () => {
    if (!audioEngine) return;
    setHasInteracted(true);

    if (isPlaying) {
      audioEngine.stop(0.8, true);
    } else {
      audioEngine.start(0.8, true);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Pause birthday song" : "Play birthday song"}
        className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-500 glass-pill ${
          isPlaying
            ? "border-[#FF9A9E]/50 shadow-[0_4px_20px_rgba(255,154,158,0.3)] bg-white/90"
            : "border-neutral-200/80 hover:border-neutral-300 text-neutral-700 bg-white/80"
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-[2.5px] h-3.5 w-3.5">
              <span className="w-0.5 bg-[#FF9A9E] animate-[bounce_1.2s_ease-in-out_infinite] h-full rounded-full" />
              <span className="w-0.5 bg-[#FF9A9E] animate-[bounce_1s_ease-in-out_infinite_0.2s] h-2/3 rounded-full" />
              <span className="w-0.5 bg-[#FF9A9E] animate-[bounce_1.4s_ease-in-out_infinite_0.4s] h-4/5 rounded-full" />
            </div>
            <span className="text-xs font-serif italic text-neutral-900 font-medium tracking-wide">
              singing for you
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-800 transition-colors" />
            <span className="text-xs font-serif italic text-neutral-600 group-hover:text-neutral-900 font-medium tracking-wide">
              {hasInteracted ? "song paused" : "play song"}
            </span>
            <Music className="w-3 h-3 text-[#FF9A9E] opacity-75 group-hover:opacity-100 transition-opacity" />
          </>
        )}
      </button>
    </div>
  );
}
