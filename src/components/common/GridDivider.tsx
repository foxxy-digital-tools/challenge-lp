import React from 'react';

const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

export const Crosshair: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="11" height="11" viewBox="0 0 11 11" fill="none"
    className={cn('text-[#A1A1AA] absolute z-10 pointer-events-none', className)}
    aria-hidden="true"
  >
    <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const SectionDivider: React.FC<{ hatch?: boolean }> = ({ hatch = false }) => (
  <div className="relative w-full overflow-hidden md:overflow-visible">
    <Crosshair className="-top-[5px] -left-[5.5px] hidden md:block" />
    <Crosshair className="-top-[5px] -right-[5.5px] hidden md:block" />
    {hatch ? (
      <div className="w-full h-5 sm:h-6 hatch-pattern border-y border-[#E5E4DE]" />
    ) : (
      <div className="w-full h-px bg-[#E5E4DE]" />
    )}
  </div>
);

