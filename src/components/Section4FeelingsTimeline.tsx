"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Smartphone,
  MessageSquareHeart,
  Calendar,
  HeartHandshake,
  ShieldCheck,
  Home,
} from "lucide-react";

const loveBecameItems = [
  {
    title: "waiting for one notification.",
    icon: Bell,
    detail: "Every ring of my phone carried a secret hope that it was your name.",
  },
  {
    title: "smiling at my phone.",
    icon: Smartphone,
    detail: "Catching myself smiling like an idiot in crowded rooms just reading your replies.",
  },
  {
    title: "wanting to tell someone every tiny thing.",
    icon: MessageSquareHeart,
    detail: "The funny dog I saw, the song playing, the quiet thoughts nobody else knew.",
  },
  {
    title: "looking forward to tomorrow.",
    icon: Calendar,
    detail: "The future suddenly didn't feel daunting; it felt like something to look forward to.",
  },
  {
    title: "feeling understood.",
    icon: HeartHandshake,
    detail: "Being able to speak without calculating my words, knowing you truly got me.",
  },
  {
    title: "feeling cared for.",
    icon: ShieldCheck,
    detail: "The tenderness of someone asking if I reached home safe or ate today.",
  },
  {
    title: "feeling home.",
    icon: Home,
    detail: "Realizing home isn't four walls, but a pair of arms and a gentle voice.",
  },
];

export default function Section4FeelingsTimeline() {
  return (
    <section id="section-4" className="py-32 px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[900px] bg-gradient-to-b from-[#FECFEF]/15 via-[#D9E7FF]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

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
            What You Made Me Feel
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-neutral-600 font-normal">
            How quiet simplicity rewrote the definition of love.
          </p>
        </motion.div>

        {/* Timeline Part 1: Before You */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 sm:p-10 rounded-[24px] glass-card border border-white/90 mb-12 relative overflow-hidden shadow-sm"
        >
          <h3 className="font-serif italic text-2xl sm:text-3xl text-neutral-600 font-medium mb-2">
            Before you...
          </h3>
          <p className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-semibold leading-snug">
            I thought love was grand gestures.
          </p>
        </motion.div>

        {/* Connecting Transition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center my-12"
        >
          <p className="font-serif italic text-2xl sm:text-3xl text-[#1A1A1A] font-semibold">
            Then you came into my life.
          </p>
          <div className="mt-4">
            <p className="font-serif text-2xl sm:text-3xl text-neutral-700 font-medium">
              Love became...
            </p>
          </div>
        </motion.div>

        {/* Timeline Path of Love Became Items */}
        <div className="relative pl-6 sm:pl-10 space-y-8 mt-12 border-l-2 border-[#FF9A9E]/40">
          {loveBecameItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Glowing Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-white border-2 border-[#FF9A9E] shadow-[0_0_10px_rgba(255,154,158,0.6)] group-hover:scale-125 transition-transform" />

                <div className="p-6 rounded-[20px] bg-white/80 hover:bg-white/95 border border-white/90 shadow-[0_6px_20px_rgba(200,180,170,0.14)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF9A9E]/20 flex items-center justify-center text-[#FF9A9E]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm font-sans text-neutral-600 font-normal pl-11">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
