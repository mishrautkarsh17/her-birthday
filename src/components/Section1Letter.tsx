"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";

interface Section1LetterProps {
  herName: string;
}

export default function Section1Letter({ herName }: Section1LetterProps) {
  return (
    <section id="section-1" className="min-h-screen py-24 px-6 flex flex-col items-center justify-center relative">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#FECFEF]/20 via-[#F6D365]/15 to-[#D9E7FF]/20 blur-3xl" />
      </div>

      <div className="w-full max-w-2xl mx-auto">
        {/* Envelope & Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative rounded-[28px] overflow-hidden bg-[#FFFCFA] border border-[#F0E5DE] shadow-[0_25px_60px_-15px_rgba(200,180,170,0.35),0_0_0_1px_rgba(255,255,255,0.8)_inset] p-8 sm:p-14">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FF9A9E]/10 via-[#F6D365]/5 to-transparent rounded-bl-full pointer-events-none" />

            <div className="space-y-6 text-[#1A1A1A]">
              {/* Salutation */}
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-semibold"
              >
                Dear {herName},
              </motion.h2>

              {/* Body paragraphs */}
              <div className="space-y-5 font-serif text-xl sm:text-2xl text-[#222222] leading-relaxed font-normal">
                <p className="leading-relaxed">
                  I don&apos;t know where life will take us.
                </p>
                <p className="leading-relaxed">
                  Maybe our paths meet again.
                </p>
                <p className="leading-relaxed text-neutral-600 italic">
                  Maybe they don&apos;t.
                </p>
                <p className="leading-relaxed pt-2">
                  But before time quietly carries us forward...
                  <br />
                  there are things my heart has wanted to tell you.
                </p>
                <p className="leading-relaxed pt-2">
                  Today isn&apos;t about asking for anything.
                </p>
                <p className="leading-relaxed">
                  It isn&apos;t about changing your mind.
                </p>
                <p className="leading-relaxed text-[#1A1A1A] font-medium pt-2">
                  It&apos;s simply about celebrating someone who made my world brighter.
                </p>
              </div>

              {/* Closing */}
              <div className="pt-8 border-t border-neutral-200/60 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="font-serif italic text-neutral-600 text-xl font-medium">So...</p>
                  <p className="font-serif italic text-3xl sm:text-4xl text-[#1A1A1A] font-semibold mt-1">
                    Thank you.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto text-neutral-600 text-xs font-sans font-medium">
                  <HeartHandshake className="w-4 h-4 text-[#FF9A9E]" />
                  <span>With genuine warmth</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
