"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Section5Sorry() {
  return (
    <section id="section-5" className="py-32 px-6 relative overflow-hidden">
      {/* Muted background styling */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EFECE8] rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#1A1A1A] font-semibold tracking-tight mb-4">
            I&apos;m Sorry
          </h2>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] p-8 sm:p-14 bg-white/90 border border-neutral-200 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] space-y-7"
        >
          <p className="font-serif italic text-2xl text-neutral-600 font-medium">
            Looking back...
          </p>

          <div className="space-y-4 font-serif text-xl sm:text-2xl text-[#222222] font-normal leading-relaxed">
            <p>I know I made mistakes.</p>
            <p className="text-[#1A1A1A] font-semibold">I know I hurt you.</p>
            <p className="text-neutral-700">
              There were moments where you deserved better from me.
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-4 font-serif text-xl sm:text-2xl text-[#222222] font-normal leading-relaxed">
            <p className="italic text-neutral-600 font-medium">
              If I could revisit those moments...
            </p>
            <p>I wouldn&apos;t change the memories.</p>
            <p className="text-[#1A1A1A] font-semibold">
              I&apos;d change the way I handled them.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFF9F5] border border-[#FF9A9E]/30 my-6 shadow-sm">
            <p className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-medium leading-relaxed">
              I&apos;m deeply sorry for every moment I became the reason behind your tears.
            </p>
          </div>

          <div className="space-y-2 font-serif text-xl sm:text-2xl text-neutral-800 font-normal">
            <p>You deserved more patience.</p>
            <p>More understanding.</p>
            <p className="text-[#1A1A1A] font-semibold">More maturity.</p>
          </div>

          <div className="pt-6 border-t border-neutral-200 space-y-2">
            <p className="font-serif italic text-lg sm:text-xl text-neutral-600 font-medium">
              I&apos;m still learning.
            </p>
            <p className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-semibold">
              Thank you for every lesson you unknowingly taught me.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
