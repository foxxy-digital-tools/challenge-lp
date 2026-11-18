import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { CHALLENGE_CONFIG, INCLUSIONS_DATA } from '../config';

interface CheckoutSectionProps {
  onEnroll: () => void;
}

export const CheckoutSection: React.FC<CheckoutSectionProps> = ({ onEnroll }) => {
  return (
    <section id="enroll" className="relative py-12 sm:py-20 bg-white">
      <div className="px-6 sm:px-10 lg:px-12 mb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-[#A1A1AA] tracking-[0.08em] uppercase font-semibold">
            [ENROLLMENT PASS // 05]
          </span>
          <span className="w-1 h-1 rounded-full bg-[#059669]" />
          <span className="font-mono text-[10px] text-[#059669] tracking-[0.05em] uppercase font-semibold">
            SECURE YOUR PASS
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#09090B] leading-[1.15]">
          Reserve your place in{' '}
          <span className="font-serif italic font-normal text-[#EA580C]">
            Cohort 01.
          </span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden border border-[#E5E4DE] shadow-ticket">
          {/* Ticket Header */}
          <div className="p-6 sm:p-8 bg-[#09090B] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4F636] opacity-10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#D4F636] text-[#09090B] flex items-center justify-center font-black text-sm shrink-0">
                  CR
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-[#A1A1AA] uppercase block">
                    OFFICIAL COHORT BOARDING PASS
                  </span>
                  <span className="font-mono text-[13px] font-bold text-white tracking-[0.04em]">
                    PASS // CR-ACADEMY-C01-2026
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-[9px] text-[#A1A1AA] uppercase block mb-1">STATUS</span>
                <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#059669] text-white">
                  VERIFIED OPEN
                </span>
              </div>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 relative z-10">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {CHALLENGE_CONFIG.priceINR}
              </span>
              <div>
                <div className="text-[#71717A] line-through text-lg font-semibold">
                  {CHALLENGE_CONFIG.originalPriceINR}
                </div>
                <div className="inline-flex items-center bg-[#D4F636] text-[#09090B] font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                  SAVE {CHALLENGE_CONFIG.savingsPercent} • COHORT 01 LAUNCH RATE
                </div>
              </div>
            </div>

            <div className="mt-3 font-mono text-[10px] text-[#A1A1AA]">
              {CHALLENGE_CONFIG.gstLabel}
            </div>
          </div>

          {/* Perforated Divider Strip with Notch Cutouts */}
          <div className="relative flex items-center px-4 py-1 bg-white">
            <div className="absolute -left-3.5 w-7 h-7 rounded-full bg-[#FAF9F6] border border-[#E5E4DE]" />
            <div className="flex-1 border-t-2 border-dashed border-[#E5E4DE] mx-4" />
            <div className="absolute -right-3.5 w-7 h-7 rounded-full bg-[#FAF9F6] border border-[#E5E4DE]" />
          </div>

          {/* Ticket Inclusions Grid */}
          <div className="p-6 sm:p-8">
            <span className="font-mono text-[10px] text-[#71717A] font-bold uppercase tracking-wider block mb-4">
              INCLUDED SPECIFICATIONS:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {INCLUSIONS_DATA.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-[#059669]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[13px] font-bold text-[#09090B] leading-tight truncate">
                        {item.title}
                      </span>
                      <span className="font-mono text-[8px] font-bold px-1.5 py-0.2 rounded bg-[#F4F3EE] text-[#71717A]">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#52525B] leading-tight mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seats Remaining Bar */}
          <div className="px-6 sm:px-8 pb-4">
            <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
              <span className="text-[#71717A] font-semibold uppercase">COHORT CAPACITY</span>
              <span className="text-[#EA580C] font-bold">
                {CHALLENGE_CONFIG.seatsLeft} of {CHALLENGE_CONFIG.totalSeats} seats remaining
              </span>
            </div>
            <div className="h-2 bg-[#F4F3EE] rounded-full overflow-hidden border border-[#E5E4DE]">
              <div
                className="h-full bg-gradient-to-r from-[#09090B] via-[#EA580C] to-[#D4F636] rounded-full"
                style={{ width: `${((CHALLENGE_CONFIG.totalSeats - CHALLENGE_CONFIG.seatsLeft) / CHALLENGE_CONFIG.totalSeats) * 100}%` }}
              />
            </div>
          </div>

          {/* Big Action Button */}
          <div className="p-6 sm:p-8 pt-2">
            <button
              onClick={onEnroll}
              className="btn-tactile w-full py-4 text-[15px] font-bold flex items-center justify-center gap-2 group shadow-card cursor-pointer"
            >
              <span>Enroll in the {CHALLENGE_CONFIG.durationDays}-Day Challenge — {CHALLENGE_CONFIG.priceINR}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#D4F636]" />
            </button>
            <div className="mt-2 text-center font-mono text-[10px] text-[#A1A1AA]">
              Press <kbd className="px-1.5 py-0.5 rounded bg-[#F4F3EE] border border-[#E5E4DE] text-[#09090B] font-bold">E</kbd> anywhere to open checkout
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
