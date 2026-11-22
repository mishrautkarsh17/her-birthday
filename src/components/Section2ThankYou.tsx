"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const thankYouItems = [
  "for choosing me.",
  "for making me feel loved.",
  "for making me feel important.",
  "for making me feel seen.",
  "for every random conversation.",
  "for every late night.",
  "for every laugh.",
  "for every smile.",
  "for every inside joke.",
  "for every walk.",
  "for every little memory.",
  "for listening.",
  "for understanding.",
  "for believing in me.",
  "for making ordinary days feel extraordinary.",
  "for making me feel safe.",
  "for making me genuinely happy.",
  "for existing.",
];

function ThankYouLine({ text }: { text: string }) {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 85%", "center 50%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.3, 0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  return (
    <motion.div
      ref={lineRef}
      style={{ opacity, y, scale }}
      className="py-3 px-2 sm:px-4 rounded-2xl transition-colors duration-500 hover:bg-white/50"
    >
      <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-medium leading-snug tracking-tight">
        {text}
      </p>
    </motion.div>
  );
}

export default function Section2ThankYou() {
  return (
    <section id="section-2" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle ambient blur */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FF9A9E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#F6D365]/10 rounded-full blur-3xl pointer-events-none" />

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
            Thank You
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-neutral-600 font-normal">
            Every sentence is a piece of my heart...
          </p>
        </motion.div>

        {/* Lead line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 px-2 sm:px-4"
        >
          <p className="font-serif italic text-3xl sm:text-4xl text-[#1A1A1A] font-semibold border-l-4 border-[#FF9A9E] pl-4">
            Thank you...
          </p>
        </motion.div>

        {/* Individual Staggered Sentences */}
        <div className="space-y-1 pl-2">
          {thankYouItems.map((item, index) => (
            <ThankYouLine key={index} text={item} />
          ))}
        </div>

        {/* Soft closing line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block w-12 h-[2px] bg-neutral-300 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
