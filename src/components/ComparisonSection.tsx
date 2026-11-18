import React from 'react';
import { Check, X } from 'lucide-react';
import { OLD_WAY_POINTS, NEW_WAY_POINTS } from '../config';

export const ComparisonSection: React.FC = () => {
  return (
    <section id="comparison" className="relative py-12 sm:py-16">
      <div className="px-6 sm:px-10 lg:px-12 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-[#A1A1AA] tracking-[0.08em] uppercase font-semibold">
            [COMPARISON LEDGER // 03]
          </span>
          <span className="w-1 h-1 rounded-full bg-[#EA580C]" />
          <span className="font-mono text-[10px] text-[#EA580C] tracking-[0.05em] uppercase font-semibold">
            THE ARCHITECTURAL DIFFERENCE
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#09090B] leading-[1.15]">
          Why structured daily implementation beats{' '}
          <span className="font-serif italic font-normal text-[#EA580C]">
            passive video courses.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E4DE] border-y border-[#E5E4DE]">
        <div className="p-8 sm:p-10 bg-[#F4F3EE]">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] font-bold text-[#71717A] tracking-[0.07em] uppercase">
              THE OLD WAY // PASSIVE VIDEO BINGEING
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#E4E4E0] text-[#71717A] font-semibold">
              LOW RETENTION
            </span>
          </div>

          <ul className="space-y-4">
            {OLD_WAY_POINTS.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#E5E4DE] flex items-center justify-center shrink-0">
                  <X size={11} className="text-[#71717A]" />
                </div>
                <span className="text-[13px] text-[#71717A] line-through leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 sm:p-10 bg-white">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] font-bold text-[#059669] tracking-[0.07em] uppercase">
              THIS COHORT // EVIDENCE-BASED IMPLEMENTATION
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#ECFDF5] text-[#059669] font-bold border border-[#A7F3D0]">
              HIGH COMPLETION
            </span>
          </div>

          <ul className="space-y-4">
            {NEW_WAY_POINTS.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
                  <Check size={11} className="text-[#059669]" />
                </div>
                <span className="text-[13px] text-[#09090B] font-semibold leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
