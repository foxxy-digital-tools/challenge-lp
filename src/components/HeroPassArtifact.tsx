import React from 'react';
import { ChevronRight, ShieldCheck, Zap } from 'lucide-react';

interface HeroPassArtifactProps {
  onOpenCheckout: () => void;
}

export const HeroPassArtifact: React.FC<HeroPassArtifactProps> = ({ onOpenCheckout }) => {
  return (
    <div className="relative w-full">
      {/* Cohort Pass Artifact */}
      <div className="card-elevated rounded-2xl sm:rounded-3xl border border-orange-100/80 bg-gradient-to-b from-slate-50/50 via-white to-orange-50/30 shadow-ticket p-5 sm:p-6 space-y-4 relative overflow-hidden">
        {/* Top Telemetry Pills */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[11px] sm:text-xs text-[#065F46] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            Verified WhatsApp Cohort
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#C2410C] text-[11px] sm:text-xs font-black tracking-wide border border-[#FDBA74]">
            Save 80% • ₹999 Launch Rate
          </span>
        </div>

        {/* Hero Centerpiece: The Titanium 21-Day Cohort Pass */}
        <div className="rounded-2xl bg-gradient-to-br from-[#18181B] via-[#09090B] to-[#27272A] text-white p-5 sm:p-6 shadow-xl shadow-zinc-950/20 relative overflow-hidden border border-white/15 transition-transform duration-300 hover:scale-[1.01]">
          {/* Holographic light reflection */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#EA580C]/20 to-[#D4F636]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Pass Header */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#D4F636] text-[#09090B] flex items-center justify-center font-black text-sm shadow-md shrink-0">
                CR
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4F636] font-bold block">
                  OFFICIAL COHORT PASS
                </span>
                <span className="text-xs font-mono text-[#A1A1AA] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-ping" />
                  PASS // CR-ACADEMY-C01-2026
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-[#D4F636] text-[#09090B] font-black text-[10px] uppercase shadow-sm font-mono shrink-0 whitespace-nowrap">
              ₹999 • WORTH ₹4,999
            </span>
          </div>

          {/* Product Title */}
          <h4 className="text-lg sm:text-2xl font-black text-white tracking-tight mb-4">
            21-Day Instagram Pattern & Growth Challenge
          </h4>

          {/* Spec Badges Grid (3 Columns) */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20 text-xs">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-center sm:text-left">
              <span className="text-[#A1A1AA] block text-[9px] uppercase font-mono">Retail:</span>
              <span className="font-bold text-white/70 line-through decoration-[#EA580C] font-mono text-xs sm:text-sm">
                ₹4,999
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-center sm:text-left">
              <span className="text-[#A1A1AA] block text-[9px] uppercase font-mono">Your Price:</span>
              <span className="font-black text-[#D4F636] font-mono text-xs sm:text-sm">
                ₹999
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-center sm:text-left">
              <span className="text-[#A1A1AA] block text-[9px] uppercase font-mono">Commitment:</span>
              <span className="font-bold text-[#34D399] font-mono text-[10px] sm:text-xs flex items-center justify-center sm:justify-start gap-1">
                <Zap size={11} className="shrink-0" />
                <span>45 Mins/Day</span>
              </span>
            </div>
          </div>
        </div>

        {/* Visual Digital Assets (2 Tangible Dossiers) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Dossier 1 */}
          <div className="rounded-2xl p-3.5 sm:p-4 bg-gradient-to-br from-[#1E1B4B] via-[#2E1065] to-[#1E1B4B] text-white border border-indigo-400/30 shadow-md relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8.5px] font-mono uppercase tracking-widest text-indigo-300 font-bold">
                MASTER WORKBOOK
              </span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/40 text-indigo-200 text-[8.5px] font-mono font-bold">
                2026
              </span>
            </div>
            <h5 className="text-xs sm:text-sm font-black text-white leading-tight mb-0.5">
              10-Account Outlier Vault
            </h5>
            <span className="text-[10px] text-indigo-200/80 font-medium block">
              AI Pattern Decoding Matrix
            </span>
          </div>

          {/* Dossier 2 */}
          <div className="rounded-2xl p-3.5 sm:p-4 bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#047857] text-white border border-emerald-400/30 shadow-md relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8.5px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                WORKBOOK
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/40 text-emerald-200 text-[8.5px] font-mono font-bold">
                2 CYCLES
              </span>
            </div>
            <h5 className="text-xs sm:text-sm font-black text-white leading-tight mb-0.5">
              72h Distribution Log
            </h5>
            <span className="text-[10px] text-emerald-200/80 font-medium block">
              Daily Action Blueprint
            </span>
          </div>
        </div>

        {/* Bottom Visual Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-[#52525B] font-medium text-[11px] sm:text-xs">
            <ShieldCheck size={15} className="text-[#059669] shrink-0" />
            <span>Official Cohort Pass • Direct WhatsApp Cohort Access</span>
          </span>
          <button
            onClick={onOpenCheckout}
            className="text-[#EA580C] font-bold hover:underline flex items-center gap-1 text-xs sm:text-sm cursor-pointer py-1"
          >
            <span>Claim Seat for ₹999</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
