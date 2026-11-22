"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  MessageCircle,
  Sun,
  Smile,
  Compass,
  Coffee,
  Heart,
  Sparkles,
  Hourglass,
  Home,
} from "lucide-react";

interface MemoryCard {
  title: string;
  detail: string;
  icon: React.ElementType;
  gradient: string;
}

const memories: MemoryCard[] = [
  {
    title: "Waiting to meet you.",
    detail: "That nervous, wonderful anticipation checking the minutes before seeing your face.",
    icon: Clock,
    gradient: "from-[#F6D365]/20 to-[#FF9A9E]/10",
  },
  {
    title: "Reading your messages.",
    detail: "The way one little ping on my screen could change my entire mood for the day.",
    icon: MessageCircle,
    gradient: "from-[#FF9A9E]/20 to-[#FECFEF]/15",
  },
  {
    title: "Your smile.",
    detail: "The quiet, genuine one that reached all the way to your eyes.",
    icon: Sun,
    gradient: "from-[#F6D365]/25 to-[#FFE6DE]/20",
  },
  {
    title: "Your laugh.",
    detail: "The purest sound in the world, completely effortless and contagious.",
    icon: Smile,
    gradient: "from-[#FECFEF]/25 to-[#D9E7FF]/15",
  },
  {
    title: "Our random conversations.",
    detail: "Talking about everything and nothing at 1 AM without noticing the hours fly by.",
    icon: Coffee,
    gradient: "from-[#D9E7FF]/25 to-[#FFF1EB]/20",
  },
  {
    title: "Every place we explored.",
    detail: "The quiet corners, coffee shops, and unfamiliar streets that suddenly felt special with you.",
    icon: Compass,
    gradient: "from-[#F6D365]/15 to-[#FECFEF]/20",
  },
  {
    title: "Every silly argument we laughed about later.",
    detail: "Those absurd little disagreements that melted into inside jokes we still remember.",
    icon: Heart,
    gradient: "from-[#FF9A9E]/15 to-[#F6D365]/15",
  },
  {
    title: "The excitement before every meeting.",
    detail: "Counting down the hours, picking what to wear, and replaying what I'd say.",
    icon: Sparkles,
    gradient: "from-[#FECFEF]/20 to-[#FF9A9E]/20",
  },
  {
    title: "How time disappeared whenever we were together.",
    detail: "Eight hours felt like eight minutes. The world outside simply paused.",
    icon: Hourglass,
    gradient: "from-[#D9E7FF]/20 to-[#F6D365]/15",
  },
  {
    title: "The comfort I found in simply being around you.",
    detail: "No need to pretend. No need to perform. Just breathing easy in your presence.",
    icon: Home,
    gradient: "from-[#FFF1EB] to-[#FECFEF]/25",
  },
];

export default function Section3LittleThings() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="section-3" className="py-32 px-6 relative overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#FFF1EB]/60 via-[#FECFEF]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#1A1A1A] font-semibold tracking-tight mb-4">
            The Little Things
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-neutral-600 font-normal max-w-lg mx-auto">
            It was never the grand gestures. It was always the quiet moments that stayed.
          </p>
        </motion.div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {memories.map((card, index) => {
            const Icon = card.icon;
            const isHovered = activeCard === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: (index % 3) * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative group rounded-[24px] p-8 transition-all duration-500 cursor-default ${
                  isHovered
                    ? "shadow-[0_20px_45px_-12px_rgba(255,154,158,0.28)] -translate-y-1.5"
                    : "shadow-[0_10px_30px_-10px_rgba(200,180,170,0.18)]"
                } glass-card border border-white/90 bg-gradient-to-br ${card.gradient}`}
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF9A9E] shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#1A1A1A] font-semibold tracking-tight mb-3 leading-snug">
                  {card.title}
                </h3>

                {/* Subtext detail */}
                <p className="font-sans text-sm text-[#444444] leading-relaxed font-normal">
                  {card.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
