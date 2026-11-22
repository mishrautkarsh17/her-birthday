"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ArtisanCakeProps {
  isCutting: boolean;
  isCakeCut: boolean;
  onCutComplete?: () => void;
}

export default function ArtisanCake({ isCutting, isCakeCut }: ArtisanCakeProps) {
  return (
    <div className="relative w-full max-w-[460px] mx-auto aspect-[5/4] flex items-center justify-center select-none">
      <svg
        viewBox="0 0 500 400"
        className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)] overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Flame Glow Filter */}
          <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft Shadow Filter for Pedestal & Cake */}
          <filter id="cakeDropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000000" floodOpacity="0.45" />
          </filter>

          {/* Candle Glow Filter */}
          <filter id="haloGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          </filter>

          {/* Gradients */}
          {/* Cake Exterior Frosting (Velvety Ivory / Champagne Cream) */}
          <linearGradient id="frostingBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF2E6" />
            <stop offset="25%" stopColor="#FFF8F2" />
            <stop offset="70%" stopColor="#F7E6D7" />
            <stop offset="100%" stopColor="#DFCAA8" />
          </linearGradient>

          {/* Cake Top Frosting */}
          <radialGradient id="frostingTop" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFC" />
            <stop offset="65%" stopColor="#FFF4EA" />
            <stop offset="100%" stopColor="#F2DFCE" />
          </radialGradient>

          {/* Glossy Strawberry/Berry Drizzle */}
          <linearGradient id="berryDrizzle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D93856" />
            <stop offset="40%" stopColor="#F25C76" />
            <stop offset="80%" stopColor="#BD1E3E" />
            <stop offset="100%" stopColor="#8A0F29" />
          </linearGradient>

          {/* Interior Sponge Cake Texture */}
          <linearGradient id="spongeCake" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCEFD8" />
            <stop offset="100%" stopColor="#EDD3AA" />
          </linearGradient>

          {/* Berry Jam Layer */}
          <linearGradient id="berryJam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A81834" />
            <stop offset="50%" stopColor="#CF294B" />
            <stop offset="100%" stopColor="#8A0F29" />
          </linearGradient>

          {/* Vanilla Mascarpone Cream Layer */}
          <linearGradient id="creamLayer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF7EE" />
          </linearGradient>

          {/* Crystal/Marble Cake Pedestal Top */}
          <radialGradient id="standPlatter" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#EAEAEA" />
            <stop offset="90%" stopColor="#D4D4D4" />
            <stop offset="100%" stopColor="#B3B3B3" />
          </radialGradient>

          {/* Pedestal Stem & Base */}
          <linearGradient id="standStem" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A8A8A8" />
            <stop offset="35%" stopColor="#EFEFEF" />
            <stop offset="70%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#9C9C9C" />
          </linearGradient>

          {/* Knife Blade Steel Gradient */}
          <linearGradient id="knifeBlade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F5F7" />
            <stop offset="30%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#D4D5DC" />
            <stop offset="85%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#9FA2B0" />
          </linearGradient>

          {/* Knife Handle (Rose Gold & Pearl) */}
          <linearGradient id="knifeHandle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#875334" />
            <stop offset="35%" stopColor="#D89D6C" />
            <stop offset="70%" stopColor="#F6CB9F" />
            <stop offset="100%" stopColor="#6E3D1F" />
          </linearGradient>

          {/* Gold Candle Shaft */}
          <linearGradient id="candleGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A138" />
            <stop offset="35%" stopColor="#F9E298" />
            <stop offset="70%" stopColor="#FFEFC0" />
            <stop offset="100%" stopColor="#AA7A1E" />
          </linearGradient>

          {/* Knife Glint Sweep */}
          <linearGradient id="bladeGlint" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ═══════════════════════════════════════════════════════
            1. CAKE STAND / PEDESTAL (Crystal & Fine Porcelain)
           ═══════════════════════════════════════════════════════ */}
        <g id="cakeStand">
          {/* Ground Ambient Reflection / Table Shadow */}
          <ellipse cx="250" cy="378" rx="155" ry="18" fill="#000000" opacity="0.45" filter="url(#cakeDropShadow)" />
          
          {/* Base Rim */}
          <ellipse cx="250" cy="365" rx="100" ry="15" fill="url(#standStem)" />
          <ellipse cx="250" cy="362" rx="92" ry="12" fill="#E8E8E8" />
          
          {/* Pedestal Fluted Stem */}
          <path
            d="M 235 292 C 235 320 226 338 218 360 C 235 364 265 364 282 360 C 274 338 265 320 265 292 Z"
            fill="url(#standStem)"
          />
          {/* Stem Highlight Line */}
          <path d="M 250 292 L 250 362" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.75" />

          {/* Platter Under-Bevel Shadow */}
          <ellipse cx="250" cy="294" rx="178" ry="46" fill="#757575" opacity="0.6" />

          {/* Platter Glass / Porcelain Lip Thickness */}
          <path
            d="M 68 288 A 182 48 0 0 0 432 288 L 432 295 A 182 48 0 0 1 68 295 Z"
            fill="#B0B0B0"
          />

          {/* Platter Surface (Main Ellipse) */}
          <ellipse cx="250" cy="288" rx="182" ry="48" fill="url(#standPlatter)" stroke="#EAEAEA" strokeWidth="1.5" />
          
          {/* Specular Rim Light */}
          <ellipse cx="250" cy="287" rx="176" ry="45" fill="none" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.8" />
        </g>

        {/* ═══════════════════════════════════════════════════════
            2. BASE CAKE BODY (MAIN CYLINDER & FROSTING)
           ═══════════════════════════════════════════════════════ */}
        <g id="mainCakeBody">
          {/* Shadow Cast by Cake onto Platter */}
          <ellipse cx="250" cy="288" rx="146" ry="40" fill="#000000" opacity="0.32" />

          {/* Cylinder Side (Base Tier) */}
          <path
            d="M 112 195 A 138 38 0 0 0 388 195 L 388 280 A 138 38 0 0 1 112 280 Z"
            fill="url(#frostingBody)"
          />

          {/* Subtle Textured Spatula Strokes on Frosting */}
          <path
            d="M 116 220 C 180 238 320 238 384 220"
            fill="none"
            stroke="#FFFDF9"
            strokeWidth="3"
            opacity="0.35"
          />
          <path
            d="M 114 250 C 180 270 320 270 386 250"
            fill="none"
            stroke="#CBB392"
            strokeWidth="2"
            opacity="0.25"
          />

          {/* Bottom Piped Shell Frosting Border */}
          <g id="pipedBottomBorder" fill="#FFFBF5" stroke="#E2CCA6" strokeWidth="0.8">
            {[116, 134, 154, 176, 200, 225, 250, 275, 300, 324, 346, 366, 384].map((cx, idx) => {
              // follow the bottom elliptical arc
              const norm = (cx - 250) / 138;
              const cy = 280 + Math.sqrt(Math.max(0, 1 - norm * norm)) * 36;
              return (
                <ellipse
                  key={idx}
                  cx={cx}
                  cy={cy - 4}
                  rx="11"
                  ry="7"
                  className="drop-shadow-xs"
                />
              );
            })}
          </g>

          {/* Strawberry / Rose Glaze Dripping Down Sides */}
          <path
            d="M 112 195 
               Q 125 224 136 198 
               Q 148 245 162 200 
               Q 178 230 192 199 
               Q 210 262 225 198 
               Q 245 222 260 199 
               Q 282 250 298 200 
               Q 318 232 334 199 
               Q 352 248 368 198 
               Q 378 220 388 195 
               A 138 38 0 0 1 112 195 Z"
            fill="url(#berryDrizzle)"
            opacity="0.95"
          />

          {/* Glaze Glossy Specular Highlights */}
          <path
            d="M 148 202 Q 148 232 150 236 M 210 202 Q 212 248 214 252 M 283 202 Q 284 238 286 242 M 353 202 Q 354 235 356 238"
            stroke="#FFA8B8"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />

          {/* Cake Top Face (Top Ellipse) */}
          <ellipse cx="250" cy="195" rx="138" ry="38" fill="url(#frostingTop)" stroke="#FFF2E2" strokeWidth="1.5" />
          
          {/* Inner Glaze Pool on Top */}
          <ellipse cx="250" cy="195" rx="126" ry="33" fill="#D63857" opacity="0.18" />
        </g>

        {/* ═══════════════════════════════════════════════════════
            3. INTERIOR CUT CAVITY (Visible when Slice separates)
           ═══════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isCakeCut && (
            <motion.g
              id="cakeInteriorCavity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Left Cut Wall Interior (Cross-Section) */}
              <polygon
                points="250,195 210,230 210,314 250,280"
                fill="url(#spongeCake)"
                stroke="#D6A76E"
                strokeWidth="1"
              />
              {/* Left Wall Jam Layers */}
              <polygon points="210,250 250,217 250,222 210,255" fill="url(#berryJam)" />
              <polygon points="210,278 250,245 250,250 210,283" fill="url(#berryJam)" />
              {/* Left Wall Cream Layers */}
              <polygon points="210,238 250,205 250,209 210,242" fill="url(#creamLayer)" />
              <polygon points="210,266 250,233 250,237 210,270" fill="url(#creamLayer)" />

              {/* Right Cut Wall Interior (Cross-Section) */}
              <polygon
                points="250,195 290,230 290,314 250,280"
                fill="#F7DEC0"
                stroke="#D6A76E"
                strokeWidth="1"
              />
              {/* Right Wall Jam Layers */}
              <polygon points="250,217 290,250 290,255 250,222" fill="url(#berryJam)" />
              <polygon points="250,245 290,278 290,283 250,250" fill="url(#berryJam)" />
              {/* Right Wall Cream Layers */}
              <polygon points="250,205 290,238 290,242 250,209" fill="url(#creamLayer)" />
              <polygon points="250,233 290,266 290,270 250,237" fill="url(#creamLayer)" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════
            4. THE CUT SLICE (WEDGE) - Glides Forward When Cut!
           ═══════════════════════════════════════════════════════ */}
        <motion.g
          id="cutWedgeSlice"
          animate={
            isCakeCut
              ? {
                  y: 46,
                  x: 0,
                  scale: 1.02,
                  filter: "drop-shadow(0px 18px 24px rgba(0,0,0,0.5))",
                }
              : { y: 0, x: 0, scale: 1 }
          }
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Slice Top Face */}
          <path
            d="M 250 195 L 210 230 A 138 38 0 0 0 290 230 Z"
            fill="url(#frostingTop)"
            stroke="#FFF2E2"
            strokeWidth="1.2"
          />
          {/* Slice Front Rounded Arc Wall */}
          <path
            d="M 210 230 A 138 38 0 0 0 290 230 L 290 314 A 138 38 0 0 1 210 314 Z"
            fill="url(#frostingBody)"
          />
          {/* Slice Front Drips */}
          <path
            d="M 210 230 Q 225 265 240 232 Q 260 270 275 231 Q 284 250 290 230 A 138 38 0 0 1 210 230 Z"
            fill="url(#berryDrizzle)"
          />

          {/* When separated, show the left side of the slice */}
          {isCakeCut && (
            <>
              {/* Left Cross Section of Cut Slice */}
              <polygon
                points="250,195 210,230 210,314 250,280"
                fill="#FFECCF"
                stroke="#D6A76E"
                strokeWidth="0.8"
              />
              <polygon points="210,250 250,217 250,222 210,255" fill="url(#berryJam)" />
              <polygon points="210,278 250,245 250,250 210,283" fill="url(#berryJam)" />
              <polygon points="210,238 250,205 250,209 210,242" fill="url(#creamLayer)" />
              <polygon points="210,266 250,233 250,237 210,270" fill="url(#creamLayer)" />

              {/* Right Cross Section of Cut Slice */}
              <polygon
                points="250,195 290,230 290,314 250,280"
                fill="url(#spongeCake)"
                stroke="#D6A76E"
                strokeWidth="0.8"
              />
              <polygon points="250,217 290,250 290,255 250,222" fill="url(#berryJam)" />
              <polygon points="250,245 290,278 290,283 250,250" fill="url(#berryJam)" />
              <polygon points="250,205 290,238 290,242 250,209" fill="url(#creamLayer)" />
              <polygon points="250,233 290,266 290,270 250,237" fill="url(#creamLayer)" />
            </>
          )}

          {/* Toppings sitting on the slice */}
          <circle cx="250" cy="222" r="7" fill="#BD1E3E" className="drop-shadow-sm" />
          <path d="M 248 217 Q 250 214 252 217 Q 251 224 248 217" fill="#3D7B32" />
          <circle cx="252" cy="220" r="1.5" fill="#FFFFFF" opacity="0.8" />
        </motion.g>

        {/* ═══════════════════════════════════════════════════════
            5. GOURMET TOPPINGS & BERRIES (On main cake)
           ═══════════════════════════════════════════════════════ */}
        <g id="cakeToppings">
          {/* Piped Cream Rosettes around Rim */}
          {[
            { cx: 135, cy: 195 },
            { cx: 155, cy: 180 },
            { cx: 185, cy: 170 },
            { cx: 220, cy: 165 },
            { cx: 280, cy: 165 },
            { cx: 315, cy: 170 },
            { cx: 345, cy: 180 },
            { cx: 365, cy: 195 },
          ].map((pos, idx) => (
            <g key={idx} transform={`translate(${pos.cx}, ${pos.cy})`}>
              <ellipse cx="0" cy="0" rx="9" ry="6" fill="#FFFFFF" stroke="#EEDCC4" strokeWidth="0.6" />
              <path d="M -5 1 Q 0 -6 5 1" fill="none" stroke="#E6CEB0" strokeWidth="1" />
              <circle cx="0" cy="-2" r="2.5" fill="#FFFDF8" />
            </g>
          ))}

          {/* Fresh Ruby Strawberries & Blackberries */}
          {/* Strawberry Left */}
          <g transform="translate(175, 185)">
            <path
              d="M 0 -12 C 10 -10 14 6 0 14 C -14 6 -10 -10 0 -12 Z"
              fill="#D62846"
              stroke="#A8152E"
              strokeWidth="0.8"
            />
            {/* Seeds */}
            <circle cx="-3" cy="0" r="0.7" fill="#FCE59F" />
            <circle cx="3" cy="2" r="0.7" fill="#FCE59F" />
            <circle cx="0" cy="7" r="0.7" fill="#FCE59F" />
            {/* Calyx Leaves */}
            <path d="M -6 -12 Q 0 -7 6 -12 Q 2 -15 0 -11 Q -2 -15 -6 -12" fill="#4B8C3A" />
            {/* Specular Glint */}
            <path d="M -4 -6 Q -2 -2 -5 3" stroke="#FFA3B3" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </g>

          {/* Strawberry Right */}
          <g transform="translate(325, 185) scale(0.9) rotate(15)">
            <path
              d="M 0 -12 C 10 -10 14 6 0 14 C -14 6 -10 -10 0 -12 Z"
              fill="#D62846"
              stroke="#A8152E"
              strokeWidth="0.8"
            />
            <circle cx="-3" cy="0" r="0.7" fill="#FCE59F" />
            <circle cx="3" cy="2" r="0.7" fill="#FCE59F" />
            <path d="M -6 -12 Q 0 -7 6 -12 Q 2 -15 0 -11 Q -2 -15 -6 -12" fill="#4B8C3A" />
            <path d="M -4 -6 Q -2 -2 -5 3" stroke="#FFA3B3" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </g>

          {/* Blueberries & Blackberries */}
          <g transform="translate(198, 178)">
            <circle cx="0" cy="0" r="6" fill="#2E3352" />
            <circle cx="-1" cy="-1.5" r="2" fill="#586391" opacity="0.7" />
          </g>
          <g transform="translate(302, 178)">
            <circle cx="0" cy="0" r="6.5" fill="#2E3352" />
            <circle cx="-1" cy="-1.5" r="2.2" fill="#586391" opacity="0.7" />
          </g>

          {/* Edible Gold Leaf Flakes */}
          <polygon points="160,188 163,184 165,189 162,191" fill="#FFD700" />
          <polygon points="338,188 342,185 344,190 340,192" fill="#FFD700" />
          <polygon points="230,178 233,174 236,177 232,180" fill="#FFD700" />
          <polygon points="270,178 274,175 275,180 271,181" fill="#FFD700" />
        </g>

        {/* ═══════════════════════════════════════════════════════
            6. THREE SLENDER GOLD TAPER CANDLES & LIVING FLAMES
           ═══════════════════════════════════════════════════════ */}
        <g id="candlesGroup">
          {[
            { x: 216, y: 168, h: 48, scale: 0.95 },
            { x: 250, y: 154, h: 56, scale: 1.05 },
            { x: 284, y: 168, h: 48, scale: 0.95 },
          ].map((candle, idx) => (
            <g key={idx}>
              {/* Candle Body (Spiral Gold) */}
              <rect
                x={candle.x - 3}
                y={candle.y - candle.h}
                width="6"
                height={candle.h}
                rx="2"
                fill="url(#candleGold)"
                stroke="#9E731C"
                strokeWidth="0.5"
              />
              {/* Spiral Ribbing on Candle */}
              <path
                d={`M ${candle.x - 3} ${candle.y - candle.h + 8} L ${candle.x + 3} ${candle.y - candle.h + 14}
                    M ${candle.x - 3} ${candle.y - candle.h + 20} L ${candle.x + 3} ${candle.y - candle.h + 26}
                    M ${candle.x - 3} ${candle.y - candle.h + 32} L ${candle.x + 3} ${candle.y - candle.h + 38}`}
                stroke="#FFFFFF"
                strokeWidth="0.9"
                opacity="0.45"
              />

              {/* Black Wick */}
              <line
                x1={candle.x}
                y1={candle.y - candle.h}
                x2={candle.x}
                y2={candle.y - candle.h - 5}
                stroke="#2B2B2B"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* The Flame (Animated Flicker or Blow Out) */}
              <AnimatePresence>
                {!isCakeCut ? (
                  <motion.g
                    key={`flame-${idx}`}
                    exit={{ opacity: 0, scale: 0, y: -8 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Warm Halo Glow behind flame */}
                    <circle
                      cx={candle.x}
                      cy={candle.y - candle.h - 14}
                      r="22"
                      fill="#FF9A9E"
                      opacity="0.3"
                      filter="url(#haloGlow)"
                    />
                    <circle
                      cx={candle.x}
                      cy={candle.y - candle.h - 14}
                      r="14"
                      fill="#F6D365"
                      opacity="0.5"
                      filter="url(#flameGlow)"
                    />

                    {/* Outer Radiant Flame */}
                    <motion.path
                      animate={{
                        d: [
                          `M ${candle.x} ${candle.y - candle.h - 5} Q ${candle.x - 6} ${candle.y - candle.h - 16} ${candle.x} ${candle.y - candle.h - 26} Q ${candle.x + 6} ${candle.y - candle.h - 16} ${candle.x} ${candle.y - candle.h - 5}`,
                          `M ${candle.x} ${candle.y - candle.h - 5} Q ${candle.x - 8} ${candle.y - candle.h - 15} ${candle.x + 2} ${candle.y - candle.h - 28} Q ${candle.x + 5} ${candle.y - candle.h - 17} ${candle.x} ${candle.y - candle.h - 5}`,
                          `M ${candle.x} ${candle.y - candle.h - 5} Q ${candle.x - 5} ${candle.y - candle.h - 18} ${candle.x - 1} ${candle.y - candle.h - 25} Q ${candle.x + 7} ${candle.y - candle.h - 14} ${candle.x} ${candle.y - candle.h - 5}`,
                        ],
                        scale: [1, 1.05, 0.98, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.1 + idx * 0.25,
                        ease: "easeInOut",
                      }}
                      fill="url(#candleGold)"
                    />

                    {/* Inner White-Hot Core */}
                    <motion.ellipse
                      animate={{
                        ry: [7, 8, 6.5, 7],
                        rx: [2.5, 2.8, 2.3, 2.5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8 + idx * 0.2,
                        ease: "easeInOut",
                      }}
                      cx={candle.x}
                      cy={candle.y - candle.h - 13}
                      rx="2.5"
                      ry="7"
                      fill="#FFFFFF"
                    />
                  </motion.g>
                ) : (
                  /* Gentle rising smoke wisps when blown out */
                  <motion.g
                    key={`smoke-${idx}`}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.7, 0], y: -30, x: [0, (idx - 1) * 12] }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                  >
                    <path
                      d={`M ${candle.x} ${candle.y - candle.h - 6} C ${candle.x - 5} ${candle.y - candle.h - 16} ${candle.x + 6} ${candle.y - candle.h - 24} ${candle.x} ${candle.y - candle.h - 35}`}
                      stroke="#EAEAEA"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          ))}
        </g>

        {/* ═══════════════════════════════════════════════════════
            7. VINTAGE SILVER & ROSE-GOLD CAKE KNIFE (The Slicing Act)
           ═══════════════════════════════════════════════════════ */}
        <motion.g
          id="ornateCakeKnife"
          initial={{ opacity: 0, x: 120, y: -160, rotate: -35 }}
          animate={
            isCutting
              ? {
                  // Knife enters gracefully, pauses at slice point, cuts down smoothly, then glides away
                  opacity: [0, 1, 1, 1, 0],
                  x: [120, 20, 0, 0, 80],
                  y: [-160, -40, 20, 75, -20],
                  rotate: [-35, -20, -6, -2, -25],
                }
              : { opacity: 0, x: 120, y: -160, rotate: -35 }
          }
          transition={{
            duration: 1.5,
            times: [0, 0.25, 0.55, 0.8, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-none"
        >
          {/* Knife Blade (Polished Damascus / Silver Steel) */}
          <g transform="translate(250, 70)">
            {/* Blade Drop Shadow */}
            <path
              d="M 0 0 L 14 150 L -6 150 Z"
              fill="#000000"
              opacity="0.3"
              filter="url(#cakeDropShadow)"
            />

            {/* Main Blade */}
            <path
              d="M 0 0 C 4 35 7 90 10 145 C 5 152 -2 152 -6 145 C -4 90 -2 35 0 0 Z"
              fill="url(#knifeBlade)"
              stroke="#D8D9E0"
              strokeWidth="0.8"
            />

            {/* Knife Bevel / Cutting Edge Line */}
            <path d="M 0 0 L 10 145" stroke="#FFFFFF" strokeWidth="1.8" />
            <path d="M -3 30 L 5 142" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.85" />

            {/* Light Reflection Glint on Blade */}
            <rect
              x="-6"
              y="40"
              width="16"
              height="35"
              fill="url(#bladeGlint)"
              transform="skewY(-15)"
            />

            {/* Ornate Ferrule / Bolster (Antique Gold) */}
            <rect x="-8" y="-6" width="16" height="7" rx="2" fill="#D4A138" stroke="#875334" strokeWidth="0.8" />
            <circle cx="0" cy="-2.5" r="2" fill="#FFF2C6" />

            {/* Sculpted Rosewood / Pearl Handle */}
            <path
              d="M -7 -6 C -10 -25 -10 -55 -6 -75 C -1 -78 1 -78 6 -75 C 10 -55 10 -25 7 -6 Z"
              fill="url(#knifeHandle)"
              stroke="#542C12"
              strokeWidth="0.8"
            />
            {/* Handle Shading Highlights */}
            <path d="M -2 -8 C -4 -25 -4 -55 -2 -70" stroke="#FFE7D1" strokeWidth="1.5" opacity="0.6" fill="none" />

            {/* Pommel (End Cap in Brass) */}
            <ellipse cx="0" cy="-76" rx="7" ry="3.5" fill="#E5B242" stroke="#78481A" strokeWidth="0.8" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
