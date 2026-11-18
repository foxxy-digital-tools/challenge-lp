import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, X, Menu } from 'lucide-react';
import { CHALLENGE_CONFIG, NAV_ITEMS } from '../config';
import { CRAcademyBrandBadge } from './common/BrandBadge';

const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

interface NavbarProps {
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckout }) => {
  const [activeSection, setActiveSection] = useState('diagnostics');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            return;
          }
        }
      }
      setActiveSection('diagnostics');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white/95 backdrop-blur-md">
      {/* 1. Urgency Top Ticker */}
      <div className="bg-[#09090B] px-3 sm:px-4 py-2 text-xs text-white font-medium border-b border-[#27272A]">
        <div className="max-w-[1160px] mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EA580C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA580C]" />
            </span>
            <span className="font-bold text-[#D4F636] flex items-center gap-1 shrink-0 font-mono text-[11px]">
              <Zap size={13} className="fill-current text-[#D4F636]" />
              OFFER ALERT:
            </span>
            <span className="hidden md:inline text-[#D4D4D8] text-[11px]">
              21-Day Challenge • 45 Mins/Day —
            </span>
            <span className="font-bold text-white text-[11px] truncate">
              Only {CHALLENGE_CONFIG.seatsLeft} of {CHALLENGE_CONFIG.totalSeats} Spots Remaining!
            </span>
          </div>

          <button
            onClick={onOpenCheckout}
            className="shrink-0 text-[11px] font-bold text-[#09090B] bg-[#D4F636] hover:bg-[#C5E929] px-3.5 py-1 rounded-full transition-all flex items-center gap-1 shadow-sm whitespace-nowrap cursor-pointer"
          >
            <span>Claim Seat — {CHALLENGE_CONFIG.priceINR}</span>
            <ArrowRight size={12} className="shrink-0" />
          </button>
        </div>
      </div>

      {/* 2. Main Navigation Bar with Active Underlines */}
      <nav className="border-b border-[#E5E4DE] px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-[1160px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand (Coach Ravikant Academy) */}
          <div className="flex items-center gap-2 shrink-0">
            <CRAcademyBrandBadge />
          </div>

          {/* Center: Navigation Links with Dynamic Active Indicator */}
          <div className="hidden lg:flex items-center gap-7 text-[13px]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    'relative py-2 font-semibold transition-all duration-150',
                    isActive 
                      ? 'text-[#09090B] font-bold' 
                      : 'text-[#52525B] hover:text-[#09090B]'
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA580C] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: Live Scarcity & CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F3EE] border border-[#E5E4DE] font-mono text-[10px] text-[#52525B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
              <span>{CHALLENGE_CONFIG.seatsLeft} Spots Left</span>
            </div>

            <button
              onClick={onOpenCheckout}
              className="btn-tactile px-4 py-2 text-[13px] font-bold flex items-center gap-1.5 group shrink-0 cursor-pointer"
            >
              <span>Reserve Seat</span>
              <span className="hidden xs:inline text-[#D4F636]">— {CHALLENGE_CONFIG.priceINR}</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#52525B] hover:text-[#09090B] hover:bg-[#F4F3EE] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-[#E5E4DE] mt-2 pt-2 pb-3 overflow-hidden"
            >
              <div className="flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors flex items-center justify-between',
                      activeSection === item.id 
                        ? 'bg-[#F4F3EE] text-[#09090B] font-bold' 
                        : 'text-[#52525B] hover:bg-[#FAF9F6]'
                    )}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
