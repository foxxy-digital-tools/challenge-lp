import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';
import { CHALLENGE_CONFIG, TESTIMONIALS_DATA } from '../config';
import { cn } from '../lib/utils';

interface CoachSectionProps {
  onOpenCheckout: () => void;
}

export const CoachSection: React.FC<CoachSectionProps> = ({ onOpenCheckout }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-sliding carousel every 4.5 seconds with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prev = () => setCurrentIndex(i => (i === 0 ? TESTIMONIALS_DATA.length - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i === TESTIMONIALS_DATA.length - 1 ? 0 : i + 1));

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="coach" className="relative py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="px-6 sm:px-10 lg:px-12 mb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-[#A1A1AA] tracking-[0.08em] uppercase font-semibold">
            [MENTORSHIP & RESULTS // 04]
          </span>
          <span className="w-1 h-1 rounded-full bg-[#EA580C]" />
          <span className="font-mono text-[10px] text-[#EA580C] tracking-[0.05em] uppercase font-semibold">
            LEAD INSTRUCTOR & COMMUNITY
          </span>
        </div>

        {/* Coach Bio Card */}
        <div className="rounded-3xl border border-[#E5E4DE] bg-white p-6 sm:p-10 shadow-card mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Headshot */}
            <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-[#E5E4DE] shadow-md bg-[#09090B] mb-4">
                <img
                  src="/coach_ravikant_headshot.jpg"
                  alt="Coach Ravikant"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to logo if headshot fails
                    (e.target as HTMLImageElement).src = '/logo.jpg';
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-[#09090B]">Coach Ravikant</span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#D4F636] text-[#09090B] font-bold">
                  FOUNDER
                </span>
              </div>
              <span className="text-xs text-[#71717A] font-medium">Founder, CR Academy & Growth Strategist</span>
            </div>

            {/* Bio Details */}
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-[#09090B] tracking-tight">
                Mentoring creators and founders with evidence-based distribution systems.
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                With over a decade of hands-on experience guiding thousands of professionals across India, Coach Ravikant specializes in transforming content from random guesses into high-converting organic distribution engines.
              </p>

              {/* 3 Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E4DE]">
                  <span className="font-mono text-[9px] text-[#A1A1AA] uppercase block">STUDENTS</span>
                  <span className="font-black text-lg text-[#09090B]">10,000+</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E4DE]">
                  <span className="font-mono text-[9px] text-[#A1A1AA] uppercase block">RATING</span>
                  <span className="font-black text-lg text-[#059669]">4.9 / 5.0</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E4DE]">
                  <span className="font-mono text-[9px] text-[#A1A1AA] uppercase block">PRACTICAL</span>
                  <span className="font-black text-lg text-[#EA580C]">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-sliding Testimonials Carousel with Pause on Hover */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="border border-[#E5E4DE] rounded-3xl bg-white p-6 sm:p-10 shadow-ticket relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold text-[#EA580C] uppercase tracking-wider block">
                  VERIFIED COHORT OUTCOMES
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                <span className="font-mono text-[9px] text-[#71717A]"></span>
              </div>
              <h4 className="text-xl font-black text-[#09090B]">Real Results from Real Creators</h4>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-xl border border-[#E5E4DE] bg-[#FAF9F6] hover:bg-white flex items-center justify-center text-[#52525B] hover:text-[#09090B] transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-xl border border-[#E5E4DE] bg-[#FAF9F6] hover:bg-white flex items-center justify-center text-[#52525B] hover:text-[#09090B] transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Testimonial Quote Card with AnimatePresence */}
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E5E4DE] relative"
              >
                <Quote size={32} className="text-[#E5E4DE] absolute top-4 right-4 pointer-events-none" />
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                    {current.result}
                  </span>
                  <span className="font-mono text-[9.5px] font-bold px-2 py-0.5 rounded bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74]">
                    {current.metricBeforeAfter}
                  </span>
                  <span className="font-mono text-[10px] text-[#71717A]">
                    {current.tag}
                  </span>
                </div>

                <h5 className="text-base font-extrabold text-[#09090B] mb-2">
                  "{current.headline}"
                </h5>
                <p className="text-sm text-[#52525B] leading-relaxed mb-4">
                  "{current.quote}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-[#E5E4DE]">
                  <div className="w-8 h-8 rounded-full bg-[#09090B] text-white flex items-center justify-center font-bold text-xs">
                    {current.name[0]}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#09090B] block">{current.name}</span>
                    <span className="text-[11px] text-[#71717A]">{current.role} • {current.company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                  currentIndex === idx ? 'w-6 bg-[#09090B]' : 'w-1.5 bg-[#D4D4D0]'
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Callout using onOpenCheckout */}
          <div className="mt-8 pt-6 border-t border-[#E5E4DE] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-bold text-sm text-[#09090B] block">Ready to join Coach Ravikant in Cohort 01?</span>
              <span className="text-xs text-[#52525B]">21 days of daily guided missions on WhatsApp with direct mentor reviews.</span>
            </div>
            <button
              onClick={onOpenCheckout}
              className="btn-tactile px-5 py-2.5 text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Reserve Your Cohort Seat ({CHALLENGE_CONFIG.priceINR})</span>
              <ArrowRight size={13} className="text-[#D4F636]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachSection;
