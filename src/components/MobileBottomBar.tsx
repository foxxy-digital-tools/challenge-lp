import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CHALLENGE_CONFIG } from '../config';

interface MobileBottomBarProps {
  onOpenCheckout: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenCheckout }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-[#E5E4DE] shadow-xl">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex flex-col leading-tight min-w-0">
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <span className="font-bold text-[#EA580C]">COHORT 01</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
            <span className="text-[#52525B] font-medium truncate">{CHALLENGE_CONFIG.seatsLeft} spots remaining</span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-black text-base text-[#09090B] font-mono leading-none">{CHALLENGE_CONFIG.priceINR}</span>
            <span className="text-[11px] text-[#A1A1AA] line-through font-mono leading-none">{CHALLENGE_CONFIG.originalPriceINR}</span>
            <span className="font-mono text-[9px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-1.5 py-0.2 rounded">
              {CHALLENGE_CONFIG.savingsPercent} OFF
            </span>
          </div>
        </div>

        <button
          onClick={onOpenCheckout}
          className="btn-tactile px-5 py-2.5 text-xs font-black flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer active:scale-95 transition-transform"
        >
          <span>Claim Pass</span>
          <ArrowRight size={13} className="text-[#D4F636]" />
        </button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
