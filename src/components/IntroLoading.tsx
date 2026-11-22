"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { audioEngine } from "@/utils/audioEngine";

interface IntroLoadingProps {
  onComplete: () => void;
  herName?: string;
}

export default function IntroLoading({ onComplete, herName = "Jiya" }: IntroLoadingProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Attempt auto-playback as early as possible
    if (audioEngine) {
      audioEngine.attemptAutoPlay();
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsReady(true);
          return 100;
        }
        return prev + 3;
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  const handleEnter = () => {
    if (!isVisible) return;
    // Direct synchronous user gesture: 100% unlocks audio in Brave, Chrome, Safari, iOS
    if (audioEngine) {
      audioEngine.start(1.2, true);
    }
    setIsVisible(false);
    setTimeout(onComplete, 700);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleEnter}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF9F5] text-[#1A1A1A] select-none cursor-pointer"
        >
          {/* Subtle warm aura in the center */}
          <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-[#FF9A9E]/20 via-[#F6D365]/20 to-[#FECFEF]/20 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-6 px-6 text-center max-w-md w-full"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="p-3.5 rounded-full bg-white/90 shadow-[0_8px_30px_rgba(255,154,158,0.25)] border border-[#FF9A9E]/30"
            >
              <Sparkles className="w-5 h-5 text-[#FF9A9E]" />
            </motion.div>

            <h1 className="font-serif italic text-3xl sm:text-4xl text-[#1A1A1A] font-medium tracking-wide">
              {isReady ? `A quiet celebration for ${herName}` : "Loading a few precious memories..."}
            </h1>

            {/* Delicate progress line */}
            {!isReady ? (
              <div className="w-48 sm:w-64 h-[3px] bg-neutral-200 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F6D365] via-[#FF9A9E] to-[#FECFEF]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            ) : null}

            {isReady ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnter();
                }}
                className="mt-2 px-8 py-3.5 rounded-full bg-neutral-900 text-white font-sans font-medium text-sm shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex items-center gap-2.5 transition-transform hover:bg-neutral-800"
              >
                <span>Step Inside</span>
                <ArrowRight className="w-4 h-4 text-[#FF9A9E]" />
              </motion.button>
            ) : (
              <div className="space-y-1">
                <p className="text-xs tracking-widest uppercase text-neutral-600 font-sans font-semibold mt-2">
                  moments of light & warmth
                </p>
                <p className="text-[11px] font-serif italic text-neutral-400">
                  (tap anywhere to enter with music)
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
