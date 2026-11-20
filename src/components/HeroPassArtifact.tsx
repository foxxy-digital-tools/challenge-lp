import React from 'react';
import { ChevronRight, ShieldCheck, Zap, Sparkles, CheckCheck } from 'lucide-react';
import { CHALLENGE_CONFIG } from '../config';

interface HeroPassArtifactProps {
  onOpenCheckout: () => void;
}

export const HeroPassArtifact: React.FC<HeroPassArtifactProps> = ({ onOpenCheckout }) => {
  return (
    <div className="relative w-full max-w-full">
      {/* Cohort Pass Artifact */}
      <div className="card-elevated rounded-2xl sm:rounded-3xl border border-orange-100/80 bg-gradient-to-b from-slate-50/50 via-white to-orange-50/30 shadow-ticket p-4 sm:p-6 space-y-3.5 sm:space-y-4 relative overflow-hidden">
        {/* Top Telemetry Pills */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[10.5px] sm:text-xs text-[#065F46] font-bold">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#059669] animate-pulse shrink-0" />
            Verified WhatsApp Cohort
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#FFF7ED] text-[#C2410C] text-[10.5px] sm:text-xs font-black tracking-wide border border-[#FDBA74]">
            Save {CHALLENGE_CONFIG.savingsPercent} • {CHALLENGE_CONFIG.priceINR} Launch
          </span>
        </div>

        {/* Hero Centerpiece: The Titanium 21-Day Cohort Pass */}
        <div className="rounded-2xl bg-gradient-to-br from-[#18181B] via-[#09090B] to-[#27272A] text-white p-4 sm:p-6 shadow-xl shadow-zinc-950/20 relative overflow-hidden border border-white/15 transition-transform duration-300 hover:scale-[1.01]">
          {/* Holographic light reflection */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#EA580C]/20 to-[#D4F636]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Pass Header */}
          <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D4F636] text-[#09090B] flex items-center justify-center font-black text-xs sm:text-sm shadow-md shrink-0">
                CR
              </div>
              <div className="min-w-0">
                <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-widest text-[#D4F636] font-bold block truncate">
                  OFFICIAL COHORT PASS
                </span>
                <span className="text-[10.5px] sm:text-xs font-mono text-[#A1A1AA] font-bold flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-ping shrink-0" />
                  PASS // CR-ACADEMY-C01
                </span>
              </div>
            </div>

            <span className="px-2 sm:px-2.5 py-1 rounded-full bg-[#D4F636] text-[#09090B] font-black text-[9px] sm:text-[10px] uppercase shadow-sm font-mono shrink-0 whitespace-nowrap">
              {CHALLENGE_CONFIG.priceINR} • {CHALLENGE_CONFIG.savingsPercent} OFF
            </span>
          </div>

          {/* Product Title */}
          <h4 className="text-base sm:text-2xl font-black text-white tracking-tight mb-3 sm:mb-4 leading-snug">
            {CHALLENGE_CONFIG.durationDays}-Day Instagram Pattern & Growth Challenge
          </h4>

          {/* Spec Badges Grid (3 Columns) */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-white/20 text-xs">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 backdrop-blur-xs text-center sm:text-left">
              <span className="text-[#A1A1AA] block text-[8px] sm:text-[9px] uppercase font-mono">Retail:</span>
              <span className="font-bold text-white/70 line-through decoration-[#EA580C] font-mono text-[11px] sm:text-sm">
                {CHALLENGE_CONFIG.originalPriceINR}
              </span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 backdrop-blur-xs text-center sm:text-left">
              <span className="text-[#A1A1AA] block text-[8px] sm:text-[9px] uppercase font-mono">Your Price:</span>
              <span className="font-black text-[#D4F636] font-mono text-[11px] sm:text-sm">
                {CHALLENGE_CONFIG.priceINR}
              </span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 backdrop-blur-xs text-center sm:text-left">
              <span className="text-[#A1A1AA] block text-[8px] sm:text-[9px] uppercase font-mono">Commit:</span>
              <span className="font-bold text-[#34D399] font-mono text-[10px] sm:text-xs flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1">
                <Zap size={10} className="shrink-0" />
                <span className="truncate">45m/Day</span>
              </span>
            </div>
          </div>
        </div>

        {/* Visual Digital Assets (2 Core Included Assets) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Asset 1: AI Decoding Toolkit */}
          <div className="rounded-xl sm:rounded-2xl p-3 sm:p-3.5 bg-[#FAF9F6] border border-[#E5E4DE] shadow-xs hover:border-[#D4D4D0] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8px] sm:text-[8.5px] font-mono uppercase tracking-wider text-[#EA580C] font-bold flex items-center gap-1">
                <Sparkles size={11} className="text-[#EA580C] shrink-0" />
                <span>AI TOOLKIT</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74] text-[8px] font-mono font-bold shrink-0">
                INCLUDED
              </span>
            </div>
            <h5 className="text-[11.5px] sm:text-[13px] font-extrabold text-[#09090B] leading-tight mb-0.5">
              Pattern Decoding Matrix
            </h5>
            <p className="text-[9.5px] sm:text-[10.5px] text-[#71717A] leading-tight">
              Reverse-engineer 10 outlier accounts
            </p>
          </div>

          {/* Asset 2: Action System */}
          <div className="rounded-xl sm:rounded-2xl p-3 sm:p-3.5 bg-[#FAF9F6] border border-[#E5E4DE] shadow-xs hover:border-[#D4D4D0] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8px] sm:text-[8.5px] font-mono uppercase tracking-wider text-[#059669] font-bold flex items-center gap-1">
                <CheckCheck size={11} className="text-[#059669] shrink-0" />
                <span>ACTION SYSTEM</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-[8px] font-mono font-bold shrink-0">
                2 CYCLES
              </span>
            </div>
            <h5 className="text-[11.5px] sm:text-[13px] font-extrabold text-[#09090B] leading-tight mb-0.5">
              45-Min Daily Sprints
            </h5>
            <p className="text-[9.5px] sm:text-[10.5px] text-[#71717A] leading-tight">
              Two live publishing & review loops
            </p>
          </div>
        </div>

        {/* Bottom Visual Action Bar */}
        <div className="pt-1.5 sm:pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-[#52525B] font-medium text-[10.5px] sm:text-xs">
            <ShieldCheck size={14} className="text-[#059669] shrink-0" />
            <span>Direct WhatsApp Cohort Access</span>
          </span>
          <button
            onClick={onOpenCheckout}
            className="text-[#EA580C] font-bold hover:underline flex items-center gap-1 text-[11px] sm:text-sm cursor-pointer py-1 min-h-[36px]"
          >
            <span>Claim Seat for {CHALLENGE_CONFIG.priceINR}</span>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
