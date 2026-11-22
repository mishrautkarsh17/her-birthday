"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { audioEngine } from "@/utils/audioEngine";

export default function LastScreenWhiteout() {
  useEffect(() => {
    if (audioEngine) {
      audioEngine.fadeOutToSilence(3.5);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#1A1A1A] px-8 text-center select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1.8, ease: "easeOut" }}
        className="max-w-2xl space-y-8"
      >
        <p className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1A1A1A] font-semibold leading-tight tracking-tight">
          Go enjoy your birthday.
          <br />
          <span className="text-neutral-700 block mt-4 text-2xl sm:text-4xl md:text-5xl font-normal leading-snug">
            You deserve every bit of happiness this world has to offer.
          </span>
        </p>

        <p className="font-serif italic text-lg sm:text-2xl text-neutral-500 font-medium pt-8">
          &ldquo;I&apos;ll always be thankful that our paths crossed.&rdquo;
        </p>
      </motion.div>
    </motion.div>
  );
}
