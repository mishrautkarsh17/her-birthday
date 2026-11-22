"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { audioEngine } from "@/utils/audioEngine";

interface HeroLandingProps {
  onBegin: () => void;
}

export default function HeroLanding({ onBegin }: HeroLandingProps) {
  const handleStart = () => {
    if (audioEngine && !audioEngine.getIsPlaying()) {
      audioEngine.start();
    }
    onBegin();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden text-center select-none pt-16 pb-24">
      {/* Animated Sunrise Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F5] via-[#FFF1EB] to-[#FFE6DE]" />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            y: [0, -15, 0],
            opacity: [0.75, 0.9, 0.75],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[550px] rounded-[100%] bg-gradient-to-t from-[#F6D365]/35 via-[#FF9A9E]/25 to-transparent blur-3xl"
        />

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FECFEF]/20 via-[#D9E7FF]/15 to-transparent" />

        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-10, 15, -10],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-[#F6D365]/15 blur-2xl"
        />
        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [15, -10, 15],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/6 w-80 h-80 rounded-full bg-[#FF9A9E]/15 blur-2xl"
        />
      </div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#1A1A1A] font-semibold leading-none mb-8">
          Happy Birthday{" "}
          <span className="inline-block relative">
            <Heart className="inline w-10 h-10 sm:w-14 sm:h-14 text-[#FF9A9E] fill-[#FF9A9E] align-middle -mt-2 animate-pulse-glow" />
          </span>
        </h1>

        {/* Subtext */}
        <div className="space-y-3 font-sans text-base sm:text-xl text-[#333333] font-normal leading-relaxed max-w-xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Today is about celebrating you.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            This isn&apos;t here to make your birthday emotional.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            It&apos;s simply my little way of saying
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="font-serif italic text-3xl sm:text-4xl text-[#1A1A1A] font-semibold pt-2"
          >
            Thank you.
          </motion.p>
        </div>
      </motion.div>

      {/* Begin Journey Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.9 }}
        className="mt-12 sm:mt-16"
      >
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1A1A1A] text-white hover:bg-neutral-800 transition-all duration-300 shadow-[0_10px_30px_rgba(26,26,26,0.18)] hover:shadow-[0_15px_35px_rgba(255,154,158,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span className="font-sans font-semibold text-sm tracking-wide">
            Begin Journey
          </span>
          <ChevronDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-all" />
        </button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-500 text-xs tracking-widest uppercase font-sans font-medium flex items-center gap-1.5 pointer-events-none"
      >
        <span>Scroll gently</span>
      </motion.div>
    </section>
  );
}
