"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const wishes = [
  "you laugh more than you cry.",
  "you achieve every dream.",
  "life surprises you in beautiful ways.",
  "you never lose your kindness.",
  "you always remember how valuable you are.",
  "you find peace.",
  "you find happiness.",
];

export default function Section8Wishes() {
  return (
    <section id="section-8" className="py-32 px-6 relative overflow-hidden">
      {/* Background starlight shimmer */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#FECFEF]/20 via-[#D9E7FF]/25 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#1A1A1A] font-semibold tracking-tight mb-4">
            My Wish For You
          </h2>

          <p className="font-serif italic text-3xl sm:text-4xl text-[#1A1A1A] font-semibold mt-4">
            I hope...
          </p>
        </motion.div>

        {/* Wishes List */}
        <div className="space-y-4">
          {wishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="p-6 sm:p-7 rounded-[22px] glass-card border border-white/90 hover:bg-white/95 transition-all duration-300 flex items-center gap-4 group"
            >
              <div className="w-9 h-9 rounded-full bg-[#F6D365]/25 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Star className="w-4 h-4 text-[#D99A1E] fill-[#F6D365]/60" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium leading-snug">
                {wish}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing Climax of Wishes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 p-8 sm:p-10 rounded-[28px] bg-gradient-to-r from-[#FF9A9E]/20 via-[#F6D365]/20 to-[#FECFEF]/20 border border-white text-center shadow-sm"
        >
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-semibold">
            because you deserve every bit of it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
