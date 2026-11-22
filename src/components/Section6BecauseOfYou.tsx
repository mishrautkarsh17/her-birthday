"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MessageCircle, Trees, Feather } from "lucide-react";

const lessons = [
  {
    text: "I learned what genuine care feels like.",
    icon: Heart,
    color: "text-[#FF9A9E]",
    bg: "bg-[#FF9A9E]/15",
  },
  {
    text: "I learned that love lives inside small moments.",
    icon: Sparkles,
    color: "text-[#D99A1E]",
    bg: "bg-[#F6D365]/25",
  },
  {
    text: "I learned communication matters.",
    icon: MessageCircle,
    color: "text-[#4A85E6]",
    bg: "bg-[#D9E7FF]/40",
  },
  {
    text: "I learned how beautiful emotional support can be.",
    icon: Feather,
    color: "text-[#D96BBA]",
    bg: "bg-[#FECFEF]/35",
  },
  {
    text: "I learned where I needed to grow.",
    icon: Trees,
    color: "text-[#588B54]",
    bg: "bg-[#8BA888]/20",
  },
];

export default function Section6BecauseOfYou() {
  return (
    <section id="section-6" className="py-32 px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#F6D365]/15 via-[#FECFEF]/20 to-[#D9E7FF]/15 rounded-full blur-3xl pointer-events-none -z-10" />

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
            Because Of You
          </h2>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#1A1A1A] font-medium">
            Because of you...
          </p>
        </motion.div>

        {/* Lessons List */}
        <div className="space-y-4">
          {lessons.map((lesson, index) => {
            const Icon = lesson.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 sm:p-7 rounded-[22px] glass-card border border-white/90 flex items-center gap-5 hover:bg-white/95 transition-all duration-300 shadow-[0_8px_25px_rgba(200,180,170,0.12)]"
              >
                <div className={`w-12 h-12 rounded-full ${lesson.bg} flex items-center justify-center shrink-0 shadow-xs`}>
                  <Icon className={`w-5 h-5 ${lesson.color}`} />
                </div>
                <p className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium leading-snug">
                  {lesson.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Thought */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-14 p-8 rounded-[24px] bg-white/80 border border-neutral-200 text-center shadow-sm"
        >
          <p className="font-serif italic text-xl text-neutral-600 font-medium mb-2">
            Whether we meet again or not...
          </p>
          <p className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-semibold">
            I&apos;ll always carry those lessons.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
