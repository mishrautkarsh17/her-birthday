"use client";

import React, { useState, useEffect } from "react";
import { Mic, Trash2, RefreshCw, Calendar, ArrowLeft, Heart, Volume2 } from "lucide-react";
import Link from "next/link";

interface WishRecord {
  id: string;
  createdAt: string;
  type: "audio" | "text";
  audioUrl?: string;
  text?: string;
  duration?: number;
}

export default function DashboardPage() {
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      if (data.success) {
        setWishes(data.wishes || []);
      } else {
        setError(data.error || "Failed to load wishes");
      }
    } catch {
      setError("Failed to connect to wishes storage");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recorded wish?")) return;
    try {
      const res = await fetch(`/api/wishes?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setWishes((prev) => prev.filter((w) => w.id !== id));
      }
    } catch {
      alert("Failed to delete wish");
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF9F5] text-[#1A1A1A] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/"
                className="text-xs font-sans text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Birthday Letter</span>
              </Link>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-semibold tracking-tight">
              Jiya&apos;s Wishes Dashboard
            </h1>
            <p className="font-sans text-sm text-neutral-600 mt-1 font-normal">
              Manage and listen to the wishes she recorded during the celebration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchWishes}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-xs font-sans font-medium text-neutral-700 hover:bg-neutral-50 shadow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Wishes List */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#FF9A9E] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif italic text-neutral-500">Loading wishes...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-sans">
            {error}
          </div>
        ) : wishes.length === 0 ? (
          <div className="py-24 text-center rounded-[28px] glass-card border border-white/80 p-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FF9A9E]/15 text-[#FF9A9E] flex items-center justify-center mx-auto shadow-inner">
              <Heart className="w-6 h-6 fill-[#FF9A9E]/40" />
            </div>
            <h2 className="font-serif text-2xl text-[#1A1A1A] font-semibold">
              No wishes recorded yet
            </h2>
            <p className="font-sans text-sm text-neutral-500 max-w-md mx-auto">
              When Jiya reaches the &ldquo;One Last Thing&rdquo; section and speaks or types her birthday wish, it will appear here immediately for you to listen to.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-sans text-neutral-500 px-2">
              <span>Total Recorded: <strong>{wishes.length}</strong></span>
              <span>Sorted newest first</span>
            </div>

            {wishes.map((wish, index) => (
              <div
                key={wish.id}
                className="p-6 sm:p-8 rounded-[24px] glass-card border border-white/90 shadow-sm space-y-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF9A9E]/15 text-[#FF9A9E] flex items-center justify-center shrink-0">
                      {wish.type === "audio" ? <Mic className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-semibold">
                        {wish.type === "audio" ? `Voice Wish #${wishes.length - index}` : `Written Wish #${wishes.length - index}`}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-sans text-neutral-500 mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(wish.createdAt)}</span>
                        {wish.duration ? (
                          <>
                            <span>&bull;</span>
                            <span>{wish.duration}s recording</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(wish.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors rounded-full hover:bg-neutral-100"
                    title="Delete wish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Audio Player for Voice Wishes */}
                {wish.type === "audio" && wish.audioUrl && (
                  <div className="p-4 rounded-2xl bg-white/80 border border-neutral-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs font-sans text-neutral-600">
                      <span className="font-medium flex items-center gap-1.5 text-neutral-800">
                        <Volume2 className="w-4 h-4 text-[#FF9A9E]" />
                        Voice Audio Playback
                      </span>
                      <a
                        href={wish.audioUrl}
                        download={`jiya_wish_${wish.id}.webm`}
                        className="text-[#FF9A9E] hover:underline font-medium"
                      >
                        Download Recording
                      </a>
                    </div>
                    <audio
                      src={wish.audioUrl}
                      controls
                      className="w-full h-11 rounded-lg"
                    />
                  </div>
                )}

                {/* Text for Written Wishes */}
                {wish.text && (
                  <div className="p-5 rounded-2xl bg-white/80 border border-neutral-200/80">
                    <p className="font-serif italic text-lg sm:text-xl text-[#1A1A1A] leading-relaxed">
                      &ldquo;{wish.text}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
