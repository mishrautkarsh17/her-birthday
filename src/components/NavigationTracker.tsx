"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Sunrise" },
  { id: "section-1", label: "Letter" },
  { id: "section-2", label: "Gratitude" },
  { id: "section-3", label: "Little Things" },
  { id: "section-4", label: "Feelings" },
  { id: "section-5", label: "Apology" },
  { id: "section-6", label: "Because Of You" },
  { id: "section-7", label: "Playlist" },
  { id: "section-8", label: "Wishes" },
  { id: "final-section", label: "Stars" },
];

export default function NavigationTracker() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollPercent(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)));

      // Determine active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 glass-pill px-4 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/80">
      {/* Progress pill line */}
      <div className="w-16 h-1 bg-neutral-200 rounded-full overflow-hidden mr-2">
        <motion.div
          className="h-full bg-gradient-to-r from-[#F6D365] via-[#FF9A9E] to-[#FECFEF]"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            title={sec.label}
            className={`transition-all duration-300 rounded-full ${
              isActive
                ? "w-6 h-2 bg-[#FF9A9E]"
                : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        );
      })}
    </div>
  );
}
