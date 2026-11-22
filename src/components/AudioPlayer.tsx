"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { audioEngine } from "@/utils/audioEngine";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check initial state
    if (audioEngine) {
      setIsPlaying(audioEngine.getIsPlaying());
    }
  }, []);

  const toggleAudio = () => {
    if (!audioEngine) return;
    setHasInteracted(true);

    if (isPlaying) {
      audioEngine.stop(1.5);
      setIsPlaying(false);
    } else {
      audioEngine.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full transition-all duration-500 glass-pill ${
          isPlaying
            ? "border-[#FF9A9E]/40 shadow-[0_4px_20px_rgba(255,154,158,0.25)] bg-white/80"
            : "border-neutral-200/60 hover:border-neutral-300 text-neutral-600 bg-white/60"
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-[2px] h-3.5 w-3.5">
              <span className="w-0.5 bg-[#FF9A9E] animate-[bounce_1.2s_ease-in-out_infinite] h-full rounded-full" />
              <span className="w-0.5 bg-[#FF9A9E] animate-[bounce_1s_ease-in-out_infinite_0.2s] h-2/3 rounded-full" />
              <span className="w-0.5 bg-[#FF9A9E] animate-[bounce_1.4s_ease-in-out_infinite_0.4s] h-4/5 rounded-full" />
            </div>
            <span className="text-xs font-serif italic text-neutral-800 tracking-wide">
              ambient music on
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
            <span className="text-xs font-serif italic text-neutral-500 group-hover:text-neutral-700 tracking-wide">
              {hasInteracted ? "sound paused" : "play soundscape"}
            </span>
            <Sparkles className="w-3 h-3 text-[#F6D365] opacity-70 group-hover:opacity-100 transition-opacity" />
          </>
        )}
      </button>
    </div>
  );
}
