"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc, Play, Pause, Music, ExternalLink } from "lucide-react";

export interface Song {
  id: string;
  title: string;
  artist: string;
  emotion: string;
  caption: string;
  spotifyId: string;
  themeColor: string;
}

export const playlistSongs: Song[] = [
  {
    id: "meri-banogi-kya",
    title: "Meri Banogi Kya",
    artist: "Rito Riba",
    emotion: "What I Wanted It To Be",
    caption: "This is what I always wanted it to be... the world I dreamed of building with you.",
    spotifyId: "6gprR0rGv59wALbBU7yZkl",
    themeColor: "#F6D365",
  },
  {
    id: "lambiya-judaiyan",
    title: "Lambiya Judaiyan",
    artist: "Bilal Saeed",
    emotion: "How It's Ending",
    caption: "This is how silence settled in... the quiet ache of distance.",
    spotifyId: "5URFbXz1XsdmWQ3ZVhERRW",
    themeColor: "#D9E7FF",
  },
];

export default function Section7Playlist() {
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isPlayingVinyl, setIsPlayingVinyl] = useState(true);

  const activeSong = playlistSongs[activeSongIndex];

  return (
    <section id="section-7" className="py-32 px-6 relative overflow-hidden">
      {/* Background glow matching active song mood */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none transition-colors duration-1000 -z-10"
        style={{
          backgroundColor:
            activeSongIndex === 0
              ? "rgba(246, 211, 101, 0.22)"
              : "rgba(217, 231, 255, 0.3)",
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#1A1A1A] font-semibold tracking-tight mb-4">
            Our Playlist
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-neutral-600 font-normal">
            Certain melodies hold entire worlds in three minutes.
          </p>
        </motion.div>

        {/* Vinyl Player Turntable Console */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[32px] p-6 sm:p-12 glass-card border border-white/90 shadow-[0_30px_70px_-20px_rgba(200,180,170,0.35)]"
        >
          {/* Emotion-Named Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {playlistSongs.map((song, index) => (
              <button
                key={song.id}
                onClick={() => setActiveSongIndex(index)}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-sans ${
                  activeSongIndex === index
                    ? "bg-[#1A1A1A] text-white shadow-md scale-105 font-medium"
                    : "bg-white/80 text-neutral-700 hover:bg-white border border-neutral-300 font-normal"
                }`}
              >
                <Music className="w-4 h-4" />
                <span className="font-semibold">{song.emotion}</span>
                <span className="text-xs opacity-80 font-normal">&bull; {song.title}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Turntable Vinyl Record Visualizer */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                {/* Turntable Platter Base */}
                <div className="absolute inset-0 rounded-full bg-neutral-200/60 shadow-inner border border-neutral-300" />

                {/* Spinning Vinyl */}
                <motion.div
                  animate={{ rotate: isPlayingVinyl ? 360 : 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "linear",
                  }}
                  className="absolute inset-2 rounded-full bg-[#151515] shadow-2xl flex items-center justify-center overflow-hidden border-2 border-neutral-800"
                >
                  <div className="absolute inset-4 rounded-full border border-neutral-700/30" />
                  <div className="absolute inset-8 rounded-full border border-neutral-700/25" />
                  <div className="absolute inset-12 rounded-full border border-neutral-700/20" />
                  <div className="absolute inset-16 rounded-full border border-neutral-700/15" />
                  <div className="absolute inset-20 rounded-full border border-neutral-700/20" />

                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />

                  {/* Center Album Label */}
                  <div
                    className="relative w-24 h-24 rounded-full flex flex-col items-center justify-center p-2 text-center shadow-md transition-colors duration-700"
                    style={{
                      background:
                        activeSongIndex === 0
                          ? "linear-gradient(135deg, #F6D365, #FF9A9E)"
                          : "linear-gradient(135deg, #D9E7FF, #FECFEF)",
                    }}
                  >
                    <Disc className="w-5 h-5 text-neutral-900 mb-1" />
                    <span className="text-[10px] font-sans font-bold text-neutral-950 tracking-tight leading-none uppercase">
                      {activeSong.title}
                    </span>
                    <span className="text-[8px] font-sans font-medium text-neutral-800 opacity-90 mt-0.5">
                      {activeSong.artist}
                    </span>
                    <div className="absolute w-3 h-3 rounded-full bg-[#151515] border border-white/60" />
                  </div>
                </motion.div>

                {/* Turntable Tonearm */}
                <motion.div
                  animate={{
                    rotate: isPlayingVinyl ? 24 : 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute -top-3 -right-3 origin-top-right pointer-events-none z-10"
                >
                  <div className="w-5 h-5 rounded-full bg-neutral-400 border border-neutral-500 shadow-sm" />
                  <div className="w-1.5 h-32 bg-gradient-to-b from-neutral-400 to-neutral-300 ml-1.5 rounded-full shadow" />
                  <div className="w-3.5 h-6 bg-neutral-800 rounded-sm ml-0.5 -mt-1 shadow" />
                </motion.div>
              </div>

              {/* Vinyl control pill */}
              <button
                onClick={() => setIsPlayingVinyl(!isPlayingVinyl)}
                className="mt-6 flex items-center gap-2 text-xs font-sans font-medium text-neutral-700 hover:text-neutral-950 bg-white/85 px-4 py-1.5 rounded-full border border-neutral-300 shadow-sm transition-all"
              >
                {isPlayingVinyl ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause Rotation</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Spin Vinyl</span>
                  </>
                )}
              </button>
            </div>

            {/* Song Story & Spotify Embed */}
            <div className="lg:col-span-6 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSong.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FFF9F5] border border-neutral-300 text-xs font-sans font-semibold text-neutral-700 mb-2">
                      {activeSong.emotion}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-semibold leading-tight">
                      {activeSong.title}
                    </h3>
                    <p className="font-sans text-base text-neutral-600 font-medium">
                      {activeSong.artist}
                    </p>
                  </div>

                  {/* Caption */}
                  <div className="p-5 rounded-2xl bg-white/90 border border-neutral-200 shadow-sm">
                    <p className="font-serif italic text-2xl sm:text-3xl text-[#1A1A1A] font-medium leading-relaxed">
                      &ldquo;{activeSong.caption}&rdquo;
                    </p>
                  </div>

                  {/* Embedded Spotify Player */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-sans text-neutral-600 font-medium flex items-center gap-1.5">
                        <Disc className="w-3.5 h-3.5 text-[#1DB954]" />
                        Listen on Spotify
                      </span>
                      <a
                        href={`https://open.spotify.com/track/${activeSong.spotifyId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-sans font-medium text-neutral-500 hover:text-neutral-800 flex items-center gap-1"
                      >
                        Open app <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-sm border border-neutral-300 bg-white">
                      <iframe
                        src={`https://open.spotify.com/embed/track/${activeSong.spotifyId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="152"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="border-0 rounded-xl"
                        title={`${activeSong.title} - ${activeSong.artist}`}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
