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
    <section className="relative py-10 sm:py-16 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-dot-pattern">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (55% on desktop) */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          {/* Category & Social Proof Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] sm:text-xs text-[#EA580C] font-semibold">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA580C]" />
            </span>
            <span>Battle-Tested by 5,000+ Creators & Founders</span>
          </div>

          {/* H1 Headline — Clean, punchy lines with Instrument Serif accent */}
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#09090B] tracking-tight leading-[1.12]">
            Stop guessing why your Reels stall. Master the{' '}
            <span className="font-serif italic font-normal text-[#EA580C]">
              repeatable pattern
            </span>{' '}
            system behind outlier growth.
          </h1>

          {/* Subheadline — Direct Value Hook */}
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-lg">
            A structured {CHALLENGE_CONFIG.durationDays}-day implementation cohort for creators, founders, and professionals.
            Diagnose your baseline, decode 10 comparable niche accounts with supplied AI frameworks, 
            test original hypotheses, and turn attention into real opportunities.
          </p>

          {/* Minimalist Action Stack: CTA Button + Attached Price Anchor */}
          <div className="pt-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={onEnroll}
                className="w-full sm:w-auto shrink-0 whitespace-nowrap min-h-[48px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl btn-tactile font-extrabold text-sm sm:text-base tracking-tight shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
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
            <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-xs text-[#52525B] pt-0.5">
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
        <div className="lg:col-span-6">
          <HeroPassArtifact onOpenCheckout={onEnroll} />
        </div>
      </div>
    </section>
  );
};
