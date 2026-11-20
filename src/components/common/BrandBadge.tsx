import React from 'react';

export const CRAcademyBrandBadge: React.FC = () => (
  <div className="inline-flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#E5E4DE] shadow-xs shrink-0 bg-[#09090B]">
      <img 
        src="/logo.jpg" 
        alt="CR Academy Logo" 
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
    </div>
    <div className="flex flex-col leading-none">
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] font-black tracking-tight text-[#09090B]">CR ACADEMY</span>
        <span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-[#D4F636] text-[#09090B] font-bold">
          OFFICIAL
        </span>
      </div>
      <span className="text-[9px] uppercase font-bold tracking-wider text-[#71717A] mt-0.5">
        Coach Ravikant
      </span>
    </div>
  </div>
);

