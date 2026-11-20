import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { FAQS_DATA } from '../config';
import { cn } from '../lib/utils';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-12 sm:py-16 md:py-20 bg-[#FAF9F6]">
      <div className="px-4 sm:px-10 lg:px-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
          <span className="font-mono text-[10px] text-[#A1A1AA] tracking-[0.08em] uppercase font-semibold">
            [FREQUENTLY ASKED QUESTIONS // 06]
          </span>
          <span className="w-1 h-1 rounded-full bg-[#EA580C]" />
          <span className="font-mono text-[10px] text-[#059669] font-bold">
            ZERO FLUFF
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B] mb-6 sm:mb-8 leading-snug">
          Answers to common questions before joining.
        </h2>

        <div className="space-y-2.5 sm:space-y-3">
          {FAQS_DATA.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#E5E4DE] bg-white overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-4 sm:p-5 min-h-[52px] flex items-start justify-between gap-3 sm:gap-4 transition-colors cursor-pointer"
                aria-expanded={openIdx === idx}
              >
                <span className="text-[13.5px] sm:text-[15px] font-bold text-[#09090B] flex items-start gap-2.5 sm:gap-3">
                  <span className="font-mono text-[10.5px] sm:text-[11px] font-bold text-[#EA580C] mt-0.5 px-2 py-0.5 rounded bg-[#FFF7ED] shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-snug">{faq.q}</span>
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-[#71717A] mt-1 shrink-0 transition-transform duration-200',
                    openIdx === idx && 'rotate-180 text-[#09090B]'
                  )}
                />
              </button>

              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 sm:px-5 sm:pb-5 pl-11 sm:pl-14 text-[12.5px] sm:text-[13px] text-[#52525B] leading-[1.65]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-[#F4F3EE] border border-[#E5E4DE] flex items-start gap-3 sm:gap-3.5">
          <ShieldCheck size={20} className="text-[#059669] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[13px] text-[#09090B] block mb-0.5">
              Evidence-Based Decision Guarantee
            </span>
            <p className="text-[11.5px] sm:text-[12px] text-[#52525B] leading-relaxed">
              If you follow the 21 daily missions, complete both test cycles, and feel you didn't gain a systematic understanding of your account outliers, message Coach Ravikant for a prompt full refund.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

