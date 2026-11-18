import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Target, Check } from 'lucide-react';
import { CHALLENGE_CONFIG, PHASES_DATA } from '../config';

const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

export const CurriculumSection: React.FC = () => {
  const [lens, setLens] = useState<0 | 1>(0);

  return (
    <section id="curriculum" className="relative py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="px-6 sm:px-10 lg:px-12 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-[#A1A1AA] tracking-[0.08em] uppercase font-semibold">
            [CURRICULUM ARCHITECTURE // 02]
          </span>
          <span className="w-1 h-1 rounded-full bg-[#059669]" />
          <span className="font-mono text-[10px] text-[#059669] tracking-[0.05em] uppercase font-semibold">
            STEP-BY-STEP IMPLEMENTATION ROADMAP
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5E4DE]">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#09090B] leading-[1.15]">
              {CHALLENGE_CONFIG.durationDays} Days. 11 Milestones.{' '}
              <span className="font-serif italic font-normal text-[#EA580C]">
                Two Real Publishing Loops.
              </span>
            </h2>
            <p className="mt-2 text-[14px] text-[#52525B] max-w-[620px]">
              Every participant follows the exact same structured daily missions on WhatsApp. Toggle the Goal Lens below to see how the framework adapts seamlessly whether you want audience reach or paying clients.
            </p>
          </div>

          {/* Goal Lens Interactive Switcher */}
          <div className="shrink-0 flex flex-col items-start lg:items-end gap-2">
            <span className="font-mono text-[10px] text-[#71717A] uppercase font-semibold tracking-wider">
              SELECT YOUR GOAL LENS:
            </span>
            <div className="p-1 rounded-xl bg-[#F4F3EE] border border-[#E5E4DE] shadow-xs flex items-center relative">
              <button
                onClick={() => setLens(0)}
                className={cn(
                  'relative z-10 px-4 py-2 rounded-lg text-[12px] font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer',
                  lens === 0 
                    ? 'bg-white text-[#09090B] shadow-xs border border-[#E5E4DE]' 
                    : 'text-[#71717A] hover:text-[#09090B]'
                )}
              >
                <TrendingUp size={14} className={lens === 0 ? 'text-[#059669]' : 'text-[#A1A1AA]'} />
                <span>Creator / Audience Growth</span>
              </button>

              <button
                onClick={() => setLens(1)}
                className={cn(
                  'relative z-10 px-4 py-2 rounded-lg text-[12px] font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer',
                  lens === 1 
                    ? 'bg-white text-[#09090B] shadow-xs border border-[#E5E4DE]' 
                    : 'text-[#71717A] hover:text-[#09090B]'
                )}
              >
                <Target size={14} className={lens === 1 ? 'text-[#EA580C]' : 'text-[#A1A1AA]'} />
                <span>Founder / Client Inquiries</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Rich Visual Phase Cards */}
      <div className="px-6 sm:px-10 lg:px-12 grid grid-cols-1 gap-6">
        {PHASES_DATA.map((phase) => {
          const Icon = phase.icon;
          const currentLensData = lens === 0 ? phase.lensA : phase.lensB;

          return (
            <div
              key={phase.num}
              className="rounded-2xl border border-[#E5E4DE] bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <div className="p-6 sm:p-7 border-b border-[#F4F3EE] bg-gradient-to-r from-white via-white to-[#FAF9F6]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono text-[11px] font-extrabold shadow-xs border shrink-0"
                      style={{ 
                        backgroundColor: phase.colorTheme.accent, 
                        borderColor: phase.colorTheme.accent,
                        color: '#FFFFFF' 
                      }}
                    >
                      <Icon size={15} />
                      <span className="leading-none mt-0.5">{phase.num}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[10px] font-bold tracking-[0.06em] uppercase text-[#71717A]">
                          {phase.days}
                        </span>
                        <span className="text-[#D4D4D0]">•</span>
                        <span className="font-mono text-[10px] font-bold tracking-[0.06em] text-[#09090B]">
                          {phase.milestones}
                        </span>
                      </div>
                      <h3 className="text-[19px] sm:text-[21px] font-extrabold tracking-tight text-[#09090B]">
                        Phase {phase.num}: {phase.title}
                      </h3>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-lg bg-[#F4F3EE] border border-[#E5E4DE] text-[#09090B] shadow-2xs hidden sm:inline-block">
                      {phase.assetType}
                    </span>
                    <span className={cn('font-mono text-[10px] font-bold px-3 py-1 rounded-full border', phase.colorTheme.tagBg, phase.colorTheme.border)}>
                      45 MINS/DAY
                    </span>
                  </div>
                </div>

                <p className="text-[14px] text-[#52525B] leading-[1.65] max-w-[850px]">
                  {phase.mission}
                </p>
              </div>

              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white">
                <div>
                  <span className="font-mono text-[10px] text-[#71717A] uppercase font-bold tracking-wider block mb-2">
                    WHAT YOU SUBMIT IN THE WHATSAPP COHORT:
                  </span>
                  <div className="p-4 rounded-xl bg-[#F4F3EE] border border-[#E5E4DE] flex items-start gap-3 h-[calc(100%-24px)]">
                    <div className="w-6 h-6 rounded-lg bg-[#09090B] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-[#D4F636]" />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] font-bold text-[#09090B]">
                        {phase.deliverable}
                      </div>
                      <div className="text-[12px] text-[#52525B] mt-1 leading-relaxed">
                        Reviewed by Coach Ravikant with structured peer verification checkpoints.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Goal Lens Box */}
                <div>
                  <span className="font-mono text-[10px] text-[#71717A] uppercase font-bold tracking-wider block mb-2">
                    ADAPTED FOR YOUR GOAL:
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lens}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'p-4 rounded-xl border flex flex-col justify-between h-[calc(100%-24px)]',
                        lens === 0 
                          ? 'bg-[#F0FDF4] border-[#A7F3D0]' 
                          : 'bg-[#FFF7ED] border-[#FDBA74]'
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className={cn(
                            'font-mono text-[10px] font-bold tracking-wider',
                            lens === 0 ? 'text-[#065F46]' : 'text-[#9A3412]'
                          )}>
                            → {currentLensData.badge}
                          </span>
                          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/80 font-semibold text-[#52525B]">
                            CUSTOM FOCUS
                          </span>
                        </div>
                        <p className="text-[12px] sm:text-[13px] text-[#09090B] leading-[1.5] mb-2 font-medium">
                          {currentLensData.focus}
                        </p>
                      </div>
                      <div className={cn(
                        'text-[11px] font-mono font-semibold pt-2 border-t mt-auto',
                        lens === 0 ? 'border-[#A7F3D0]/60 text-[#047857]' : 'border-[#FDBA74]/60 text-[#C2410C]'
                      )}>
                        {currentLensData.metric}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
