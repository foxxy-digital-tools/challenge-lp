import React from 'react';
import { CRAcademyBrandBadge } from './common/BrandBadge';
import { CHALLENGE_CONFIG } from '../config';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E5E4DE] bg-white py-12 px-6 sm:px-10 lg:px-12">
      <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <CRAcademyBrandBadge />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-mono text-[10px] text-[#71717A]">
          <span>DURATION: {CHALLENGE_CONFIG.durationDays} DAYS</span>
          <span>FORMAT: WHATSAPP IMPLEMENTATION</span>
          <span>OUTPUT: 2 PUBLISHED TEST CYCLES</span>
        </div>

        <div className="font-mono text-[10px] text-[#A1A1AA]">
          © 2026 Coach Ravikant Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
