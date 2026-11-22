"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface FinalSectionPeakProps {
  herName?: string;
  onOneLastThing: () => void;
}

export default function FinalSectionPeak({ herName = "Jiya", onOneLastThing }: FinalSectionPeakProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Stars
    const starCount = 80;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: (Math.random() - 0.5) * 0.015,
    }));

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }

    let shootingStar: ShootingStar | null = null;
    let shootingStarTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.alpha)})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
      });

      // Handle shooting stars
      shootingStarTimer++;
      if (!shootingStar && shootingStarTimer > 180 && Math.random() < 0.02) {
        shootingStar = {
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: 80 + Math.random() * 60,
          speed: 7 + Math.random() * 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1,
          active: true,
        };
        shootingStarTimer = 0;
      }

      if (shootingStar && shootingStar.active) {
        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(1, `rgba(255, 240, 220, ${shootingStar.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.015;

        if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar = null;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="final-section"
      className="relative min-h-screen py-36 px-6 bg-[#0B0F1C] text-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Night Sky Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Atmospheric Nebula Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-gradient-to-tr from-[#FF9A9E]/15 via-[#6E8EFB]/20 to-[#FECFEF]/15 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#F6D365]/15 rounded-full blur-[100px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
        {/* Cinematic Text Block matching prompt verbatim */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="space-y-8 font-serif text-2xl sm:text-3xl md:text-4xl text-neutral-100 font-normal leading-relaxed"
        >
          <p>
            I don&apos;t know whether this is the end of our story...
            <br />
            <span className="text-white/70 italic text-xl sm:text-2xl">
              or simply the end of one chapter.
            </span>
          </p>

          <p className="text-neutral-200">
            I won&apos;t ask you for an answer today.
            <br />
            I won&apos;t let this message become a burden on your birthday.
          </p>

          <div className="py-6 border-y border-white/15 my-8 space-y-3">
            <p className="text-white font-medium text-3xl sm:text-4xl">
              I simply wanted to thank you.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg sm:text-xl text-white/85 font-sans font-medium tracking-wide">
              <span>For every smile.</span>
              <span>&bull;</span>
              <span>Every memory.</span>
              <span>&bull;</span>
              <span>Every lesson.</span>
            </div>
            <p className="text-xl sm:text-2xl text-neutral-200 pt-2 font-serif italic">
              Every ordinary day that became extraordinary because you were in it.
            </p>
          </div>

          <p className="text-white text-3xl sm:text-4xl md:text-5xl font-medium leading-snug">
            Loving you has been one of the most beautiful experiences of my life.
          </p>

          <p className="text-neutral-200">
            No matter where life takes us...
            <br />
            <span className="text-white font-semibold">
              I&apos;ll always be grateful that our paths crossed.
            </span>
          </p>

          {/* If someday passage */}
          <div className="p-8 sm:p-12 rounded-[28px] bg-white/[0.08] border border-white/20 backdrop-blur-xl text-left sm:text-center space-y-4 my-8 shadow-2xl">
            <p className="italic text-white/80 text-xl font-normal">
              If, someday,
            </p>
            <p className="text-white text-2xl sm:text-3xl font-medium">
              you ever feel there&apos;s still a chapter left for us to write,
            </p>
            <p className="text-[#F6D365] text-2xl sm:text-3xl font-semibold">
              I&apos;d love to begin with a blank page—
            </p>
            <p className="text-white/90 text-xl sm:text-2xl font-normal">
              not by repeating our old story,
              <br />
              but by writing a better one together.
            </p>
          </div>

          <div className="space-y-4 text-neutral-200">
            <p>And if that day never comes...</p>
            <p className="italic text-white/80 font-normal">that&apos;s okay too.</p>
            <p className="text-2xl sm:text-3xl text-white font-medium">
              I&apos;ll still look back at us
              <br />
              <span className="text-[#FF9A9E] font-semibold">with gratitude,</span>
              <br />
              rather than regret.
            </p>
          </div>

          {/* Birthday wish & heart */}
          <div className="pt-10 space-y-4">
            <h3 className="font-serif text-5xl sm:text-7xl text-white font-bold tracking-tight">
              Happy Birthday, {herName}.
            </h3>
            <p className="font-serif italic text-3xl sm:text-4xl text-white font-medium">
              Thank you... for everything.
            </p>
            <div className="pt-2">
              <Heart className="inline-block w-9 h-9 sm:w-11 sm:h-11 text-[#FF9A9E] fill-[#FF9A9E] animate-pulse-glow" />
            </div>
          </div>
        </motion.div>

        {/* The "One Last Thing" button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-16 pb-8"
        >
          <button
            onClick={onOneLastThing}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-sans font-semibold text-sm tracking-wide hover:bg-neutral-100 shadow-[0_0_35px_rgba(255,255,255,0.35)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] transition-all duration-500 hover:scale-105 active:scale-100 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FF9A9E]" />
            <span>One Last Thing</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
