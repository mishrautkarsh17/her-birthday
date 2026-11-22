"use client";

import React, { useState, useEffect } from "react";
import IntroLoading from "@/components/IntroLoading";
import HeroLanding from "@/components/HeroLanding";
import Section1Letter from "@/components/Section1Letter";
import Section2ThankYou from "@/components/Section2ThankYou";
import Section3LittleThings from "@/components/Section3LittleThings";
import Section4FeelingsTimeline from "@/components/Section4FeelingsTimeline";
import Section5Sorry from "@/components/Section5Sorry";
import Section6BecauseOfYou from "@/components/Section6BecauseOfYou";
import Section7Playlist from "@/components/Section7Playlist";
import Section8Wishes from "@/components/Section8Wishes";
import FinalSectionPeak from "@/components/FinalSectionPeak";
import InteractiveCelebration from "@/components/InteractiveCelebration";
import LastScreenWhiteout from "@/components/LastScreenWhiteout";
import AudioPlayer from "@/components/AudioPlayer";
import CursorGlow from "@/components/CursorGlow";
import FloatingParticles from "@/components/FloatingParticles";
import { audioEngine } from "@/utils/audioEngine";

export default function BirthdayPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCelebration, setIsCelebration] = useState(false);
  const [isWhiteout, setIsWhiteout] = useState(false);
  const herName = "Jiya";

  useEffect(() => {
    // Immediately attempt autoplay and setup universal interaction unlock
    if (audioEngine) {
      audioEngine.setupGlobalUnlock();
      audioEngine.attemptAutoPlay();
    }
  }, []);

  const scrollToFirstSection = () => {
    const el = document.getElementById("section-1");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStartCelebration = () => {
    setIsCelebration(true);
  };

  const handleFinishCelebration = () => {
    setIsCelebration(false);
    setIsWhiteout(true);
  };

  return (
    <main className="relative min-h-screen bg-[#FFF9F5] text-[#1A1A1A] selection:bg-[#FF9A9E]/30 selection:text-[#1A1A1A]">
      {/* Intro Loading Sequence */}
      {isLoading && <IntroLoading onComplete={() => setIsLoading(false)} />}

      {/* Trailing Cursor Glow on Desktop */}
      <CursorGlow />

      {/* Studio Ghibli Golden Dust Floating Particles */}
      <FloatingParticles />

      {/* Ambient Audio Player Toggle */}
      {!isCelebration && !isWhiteout && <AudioPlayer />}

      {/* Hero Landing */}
      <div id="hero">
        <HeroLanding onBegin={scrollToFirstSection} />
      </div>

      {/* Section 1: The Letter */}
      <Section1Letter herName={herName} />

      {/* Section 2: Thank You */}
      <Section2ThankYou />

      {/* Section 3: The Little Things */}
      <Section3LittleThings />

      {/* Section 4: What You Made Me Feel */}
      <Section4FeelingsTimeline />

      {/* Section 5: I'm Sorry */}
      <Section5Sorry />

      {/* Section 6: Because Of You */}
      <Section6BecauseOfYou />

      {/* Section 7: Our Playlist */}
      <Section7Playlist />

      {/* Section 8: My Wish For You */}
      <Section8Wishes />

      {/* Final Section: The Emotional Peak */}
      <FinalSectionPeak
        herName={herName}
        onOneLastThing={handleStartCelebration}
      />

      {/* Interactive Cake Cutting & Wish Recording */}
      {isCelebration && (
        <InteractiveCelebration
          herName={herName}
          onFinish={handleFinishCelebration}
        />
      )}

      {/* Last Screen: Fade to pure white and silence */}
      {isWhiteout && <LastScreenWhiteout />}
    </main>
  );
}
