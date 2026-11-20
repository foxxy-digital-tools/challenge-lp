import React from 'react';
import { ArrowRight, Lock, Zap } from 'lucide-react';
import { CHALLENGE_CONFIG } from '../config';
import { HeroPassArtifact } from './HeroPassArtifact';

interface HeroSectionProps {
  onEnroll: () => void;
  onPhases: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnroll, onPhases }) => {
  return (
    <section className="relative py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-dot-pattern">
      {/* =========================================================================
          DESKTOP HERO (>= md: 768px): 100% UNTOUCHED DESKTOP ARCHITECTURE
          ========================================================================= */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (50% on desktop) */}
          <div className="col-span-6 space-y-4 sm:space-y-6">
            {/* Category & Social Proof Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-xs text-[#EA580C] font-semibold">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA580C]" />
              </span>
              <span>Battle-Tested by 5,000+ Creators & Founders</span>
            </div>

            {/* H1 Headline — Clean, punchy lines with Instrument Serif accent */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#09090B] tracking-tight leading-[1.12]">
              Master the{' '}
              <span className="font-serif italic font-normal text-[#EA580C]">
                repeatable patterns
              </span>{' '}
              behind outlier Reels.
            </h1>

            {/* Subheadline — Direct Value Hook */}
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-lg">
              A 21-day WhatsApp cohort for creators & founders. Decode proven outlier formulas, test validated hook frameworks, and build a repeatable organic growth system in 45 mins/day.
            </p>

            {/* Minimalist Action Stack: CTA Button + Attached Price Anchor */}
            <div className="pt-1 space-y-3">
              <div className="flex flex-row items-center gap-3">
                <button
                  onClick={onEnroll}
                  className="shrink-0 whitespace-nowrap min-h-[48px] px-6 lg:px-7 py-3.5 sm:py-4 rounded-xl btn-tactile font-extrabold text-sm sm:text-base tracking-tight shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
                >
                  <span>Join the {CHALLENGE_CONFIG.durationDays}-Day Challenge — {CHALLENGE_CONFIG.priceINR}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform text-[#D4F636]" />
                </button>

                <div className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-[#F4F3EE] border border-[#E5E4DE] text-xs font-mono">
                  <span className="text-[#A1A1AA] line-through">{CHALLENGE_CONFIG.originalPriceINR}</span>
                  <span className="text-base font-black text-[#09090B]">{CHALLENGE_CONFIG.priceINR}</span>
                  <span className="text-[10px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    Save {CHALLENGE_CONFIG.savingsPercent}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={onPhases}
                  className="text-xs font-bold text-[#52525B] hover:text-[#09090B] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Explore the 4-Phase Roadmap ↓</span>
                </button>
              </div>

              {/* Micro-Trust Row */}
              <div className="flex items-center justify-start gap-3 text-xs text-[#52525B] pt-0.5">
                <span className="inline-flex items-center gap-1 font-semibold text-[#52525B] whitespace-nowrap">
                  <Lock size={13} className="text-[#059669] shrink-0" />
                  <span>Zero Paid Software Required</span>
                </span>
                <span className="text-[#D4D4D0]">•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#52525B] whitespace-nowrap">
                  <Zap size={13} className="text-[#EA580C] shrink-0" />
                  <span>Instant WhatsApp Onboarding</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artifact */}
          <div className="col-span-6">
            <HeroPassArtifact onOpenCheckout={onEnroll} />
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE HERO (< md: 768px): BESPOKE HIGH-CONVERTING MOBILE LAYOUT
          ========================================================================= */}
      <div className="block md:hidden space-y-4">
        {/* Category & Proof Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] text-[#EA580C] font-semibold">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA580C]" />
          </span>
          <span>Battle-Tested by 5,000+ Creators</span>
        </div>

        {/* Scaled H1 Headline */}
        <h1 className="text-[28px] xs:text-3xl font-black text-[#09090B] tracking-tight leading-[1.18]">
          Master the{' '}
          <span className="font-serif italic font-normal text-[#EA580C]">
            repeatable patterns
          </span>{' '}
          behind outlier Reels.
        </h1>

        {/* Mobile Subheadline */}
        <p className="text-[13px] text-[#52525B] leading-relaxed">
          A 21-day WhatsApp cohort for creators & founders. Decode proven outlier formulas and build a repeatable organic system in 45 mins/day.
        </p>

        {/* Physical Cohort Pass Artifact */}
        <div className="pt-1">
          <HeroPassArtifact onOpenCheckout={onEnroll} />
        </div>

        {/* Mobile Action Stack */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={onEnroll}
            className="w-full min-h-[48px] px-4 py-3.5 rounded-xl btn-tactile font-extrabold text-sm tracking-tight shadow-md flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
          >
            <span>Join the {CHALLENGE_CONFIG.durationDays}-Day Challenge — {CHALLENGE_CONFIG.priceINR}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4F636]" />
          </button>

          <div className="w-full min-h-[44px] inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#F4F3EE] border border-[#E5E4DE] text-xs font-mono">
            <span className="text-[#A1A1AA] line-through">{CHALLENGE_CONFIG.originalPriceINR}</span>
            <span className="text-sm font-black text-[#09090B]">{CHALLENGE_CONFIG.priceINR}</span>
            <span className="text-[10px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
              Save {CHALLENGE_CONFIG.savingsPercent}
            </span>
          </div>

          <div className="flex items-center justify-center pt-0.5">
            <button
              onClick={onPhases}
              className="min-h-[44px] text-xs font-bold text-[#52525B] hover:text-[#09090B] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Explore the 4-Phase Roadmap ↓</span>
            </button>
          </div>

          {/* Micro-Trust Pills (Zero Overflow) */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#52525B] pt-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4F3EE] border border-[#E5E4DE] font-medium">
              <Lock size={12} className="text-[#059669] shrink-0" />
              <span>Zero Paid Software Required</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4F3EE] border border-[#E5E4DE] font-medium">
              <Zap size={12} className="text-[#EA580C] shrink-0" />
              <span>Instant WhatsApp Access</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

