import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Target,
  Compass,
  Search,
  Send,
  Store,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Zap,
  Quote,
  Menu
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CENTRALIZED CONFIGURATION OBJECT (CHALLENGE_CONFIG)
// ─────────────────────────────────────────────────────────────────────────────
const CHALLENGE_CONFIG = {
  durationDays: 21,
  priceINR: "₹999",
  originalPriceINR: "₹4,999",
  savingsPercent: "80%",
  gstLabel: "Incl. 18% GST • One-Time Cohort Pass",
  cohortLabel: "COHORT 01 // WHATSAPP IMPLEMENTATION",
  seatsLeft: 38,
  totalSeats: 200,
  dailyTimeCommitment: "45 Mins/Day",
  whatsappSupportNumber: "+91 9918991805",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────────────────
const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

// ─────────────────────────────────────────────────────────────────────────────
// SVG CROSSHAIR ARCHITECTURAL MARKER
// ─────────────────────────────────────────────────────────────────────────────
const Crosshair = ({ className = '' }: { className?: string }) => (
  <svg
    width="11" height="11" viewBox="0 0 11 11" fill="none"
    className={cn('text-[#A1A1AA] absolute z-10 pointer-events-none', className)}
    aria-hidden="true"
  >
    <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const SectionDivider = ({ hatch = false }: { hatch?: boolean }) => (
  <div className="relative w-full">
    <Crosshair className="-top-[5px] -left-[5.5px]" />
    <Crosshair className="-top-[5px] -right-[5.5px]" />
    {hatch ? (
      <div className="w-full h-6 hatch-pattern border-y border-[#E5E4DE]" />
    ) : (
      <div className="w-full h-px bg-[#E5E4DE]" />
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BRAND BADGE (CR ACADEMY)
// ─────────────────────────────────────────────────────────────────────────────
const CRAcademyBrandBadge = () => (
  <div className="inline-flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#E5E4DE] shadow-xs shrink-0 bg-[#09090B]">
      <img 
        src="/logo.jpg" 
        alt="CR Academy Logo" 
        className="w-full h-full object-cover"
        onError={(e) => {
          // If image fails, show CR text badge
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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 01: ACTIVE NAVBAR WITH SCROLLSPY
// ─────────────────────────────────────────────────────────────────────────────
const navItems = [
  { id: 'diagnostics', label: 'Diagnostics' },
  { id: 'curriculum', label: '4-Phase Roadmap' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'coach', label: 'Coach Ravikant' },
  { id: 'enroll', label: 'Cohort Pass' },
  { id: 'faq', label: 'FAQ' },
];

const Navbar = ({ onOpenCheckout }: { onOpenCheckout: () => void }) => {
  const [activeSection, setActiveSection] = useState('diagnostics');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Scrollspy: Tracks active section as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
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
            className="shrink-0 text-[11px] font-bold text-[#09090B] bg-[#D4F636] hover:bg-[#C5E929] px-3.5 py-1 rounded-full transition-all flex items-center gap-1 shadow-sm whitespace-nowrap"
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
            {navItems.map((item) => {
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
              className="btn-tactile px-4 py-2 text-[13px] font-bold flex items-center gap-1.5 group shrink-0"
            >
              <span>Reserve Seat</span>
              <span className="hidden xs:inline text-[#D4F636]">— {CHALLENGE_CONFIG.priceINR}</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#52525B] hover:text-[#09090B] hover:bg-[#F4F3EE]"
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
                {navItems.map((item) => (
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

// ─────────────────────────────────────────────────────────────────────────────
// HERO RIGHT-SIDE GRAPHIC: COHORT PASS ARTIFACT (Clean single-mode)
// ─────────────────────────────────────────────────────────────────────────────
const HeroOfferVisualizer = ({ onOpenCheckout }: { onOpenCheckout: () => void }) => {
  return (
    <div className="relative w-full">
      {/* Cohort Pass Artifact (Clean, single-mode) */}
      <div className="card-elevated rounded-2xl sm:rounded-3xl border border-orange-100/80 bg-gradient-to-b from-slate-50/50 via-white to-orange-50/30 shadow-ticket p-5 sm:p-6 space-y-4 relative overflow-hidden">
        {/* Top Telemetry Pills */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[11px] sm:text-xs text-[#065F46] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            Verified WhatsApp Community
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#C2410C] text-[11px] sm:text-xs font-black tracking-wide border border-[#FDBA74]">
            Save 80% • ₹999 Launch Rate
          </span>
        </div>

        {/* Hero Centerpiece: The Titanium 21-Day Cohort Pass */}
        <div className="rounded-2xl bg-gradient-to-br from-[#18181B] via-[#09090B] to-[#27272A] text-white p-5 sm:p-6 shadow-xl shadow-zinc-950/20 relative overflow-hidden border border-white/15 transition-transform duration-300 hover:scale-[1.01]">
          {/* Holographic light reflection */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#EA580C]/20 to-[#D4F636]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Pass Header */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#D4F636] text-[#09090B] flex items-center justify-center font-black text-sm shadow-md shrink-0">
                CR
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4F636] font-bold block">
                  OFFICIAL COHORT PASS
                </span>
                <span className="text-xs font-mono text-[#A1A1AA] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-ping" />
                  PASS // CR-ACADEMY-C01-2026
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-[#D4F636] text-[#09090B] font-black text-[10px] uppercase shadow-sm font-mono shrink-0 whitespace-nowrap">
              ₹999 • WORTH ₹4,999
            </span>
          </div>

          {/* Product Title */}
          <h4 className="text-lg sm:text-2xl font-black text-white tracking-tight mb-4">
            21-Day Instagram Pattern & Growth Challenge
          </h4>

          {/* Spec Badges Grid (3 Columns) */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20 text-xs">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-center sm:text-left">
              <span className="text-[#A1A1AA] block text-[9px] uppercase font-mono">Retail:</span>
              <span className="font-bold text-white/70 line-through decoration-[#EA580C] font-mono text-xs sm:text-sm">
                ₹4,999
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-center sm:text-left">
              <span className="text-[#A1A1AA] block text-[9px] uppercase font-mono">Your Price:</span>
              <span className="font-black text-[#D4F636] font-mono text-xs sm:text-sm">
                ₹999
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-center sm:text-left">
              <span className="text-[#A1A1AA] block text-[9px] uppercase font-mono">Commitment:</span>
              <span className="font-bold text-[#34D399] font-mono text-[10px] sm:text-xs flex items-center justify-center sm:justify-start gap-1">
                <Zap size={11} className="shrink-0" />
                <span>45 Mins/Day</span>
              </span>
            </div>
          </div>
        </div>

        {/* Visual Digital Assets (2 Tangible Dossiers) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Dossier 1 */}
          <div className="rounded-2xl p-3.5 sm:p-4 bg-gradient-to-br from-[#1E1B4B] via-[#2E1065] to-[#1E1B4B] text-white border border-indigo-400/30 shadow-md relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8.5px] font-mono uppercase tracking-widest text-indigo-300 font-bold">
                MASTER WORKBOOK
              </span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/40 text-indigo-200 text-[8.5px] font-mono font-bold">
                2026
              </span>
            </div>
            <h5 className="text-xs sm:text-sm font-black text-white leading-tight mb-0.5">
              10-Account Outlier Vault
            </h5>
            <span className="text-[10px] text-indigo-200/80 font-medium block">
              AI Pattern Decoding Matrix
            </span>
          </div>

          {/* Dossier 2 */}
          <div className="rounded-2xl p-3.5 sm:p-4 bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#047857] text-white border border-emerald-400/30 shadow-md relative overflow-hidden group hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8.5px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                WORKBOOK
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/40 text-emerald-200 text-[8.5px] font-mono font-bold">
                2 CYCLES
              </span>
            </div>
            <h5 className="text-xs sm:text-sm font-black text-white leading-tight mb-0.5">
              72h Distribution Log
            </h5>
            <span className="text-[10px] text-emerald-200/80 font-medium block">
              Daily Action Blueprint
            </span>
          </div>
        </div>

        {/* Bottom Visual Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-[#52525B] font-medium text-[11px] sm:text-xs">
            <ShieldCheck size={15} className="text-[#059669] shrink-0" />
            <span>Official Cohort Pass • Direct WhatsApp Cohort Access</span>
          </span>
          <button
            onClick={onOpenCheckout}
            className="text-[#EA580C] font-bold hover:underline flex items-center gap-1 text-xs sm:text-sm cursor-pointer py-1"
          >
            <span>Claim Seat for ₹999</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 02: HERO SECTION (With Clean Editorial Layout & Price Anchor)
// ─────────────────────────────────────────────────────────────────────────────
const HeroSection = ({ onEnroll, onPhases }: { onEnroll: () => void; onPhases: () => void }) => {
  return (
    <section className="relative py-10 sm:py-16 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-dot-pattern">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (55% on desktop) */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          {/* Category & Social Proof Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] sm:text-xs text-[#EA580C] font-semibold">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA580C]" />
            </span>
            <span>Battle-Tested by 5,000+ Creators & Founders</span>
          </div>

          {/* H1 Headline — Clean, punchy lines with Instrument Serif accent */}
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#09090B] tracking-tight leading-[1.12]">
            Stop guessing why your Reels stall. Master the{' '}
            <span className="font-serif italic font-normal text-[#EA580C]">
              repeatable pattern
            </span>{' '}
            system behind outlier growth.
          </h1>

          {/* Subheadline — Direct Value Hook */}
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-lg">
            A structured {CHALLENGE_CONFIG.durationDays}-day implementation cohort for creators, founders, and professionals.
            Diagnose your baseline, decode 10 comparable niche accounts with supplied AI frameworks,
            test original hypotheses, and turn attention into real opportunities.
          </p>

          {/* Minimalist Action Stack: CTA Button + Attached Price Anchor */}
          <div className="pt-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={onEnroll}
                className="w-full sm:w-auto shrink-0 whitespace-nowrap min-h-[48px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl btn-tactile font-extrabold text-sm sm:text-base tracking-tight shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
              >
                <span>Join the {CHALLENGE_CONFIG.durationDays}-Day Challenge — {CHALLENGE_CONFIG.priceINR}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform text-[#D4F636]" />
              </button>

              <div className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-[#F4F3EE] border border-[#E5E4DE] text-xs font-mono">
                <span className="text-[#A1A1AA] line-through">{CHALLENGE_CONFIG.originalPriceINR}</span>
                <span className="text-base font-black text-[#09090B]">{CHALLENGE_CONFIG.priceINR}</span>
                <span className="text-[10px] font-bold text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                  Save {CHALLENGE_CONFIG.savingsPercent}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <button
                onClick={onPhases}
                className="text-xs font-bold text-[#52525B] hover:text-[#09090B] flex items-center gap-1 transition-colors"
              >
                <span>Explore the 4-Phase Roadmap ↓</span>
              </button>
            </div>

            {/* Micro-Trust Row */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-xs text-[#52525B] pt-0.5">
              <span className="inline-flex items-center gap-1 font-semibold text-[#52525B] whitespace-nowrap">
                <Lock size={13} className="text-[#059669] shrink-0" />
                <span>Zero Paid Software Required</span>
              </span>
              <span className="text-[#D4D4D0]">•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#52525B] whitespace-nowrap">
                <Zap size={13} className="text-[#EA580C] shrink-0" />
                <span>Instant WhatsApp Onboarding</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Artifact */}
        <div className="lg:col-span-6">
          <HeroOfferVisualizer onOpenCheckout={onEnroll} />
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 03: THE 3 DIAGNOSTIC SITUATIONS (id="diagnostics")
// ─────────────────────────────────────────────────────────────────────────────
const FlatlineOscilloscope = () => (
  <svg viewBox="0 0 200 90" className="w-full h-24" aria-hidden="true">
    {[20, 45, 70].map(y => (
      <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#E5E4DE" strokeWidth="0.8" />
    ))}
    {[40, 80, 120, 160].map(x => (
      <line key={x} x1={x} y1="0" x2={x} y2="90" stroke="#E5E4DE" strokeWidth="0.8" />
    ))}
    <line x1="0" y1="30" x2="200" y2="30" stroke="#EA580C" strokeWidth="1.2" strokeDasharray="4 3" />
    <rect x="110" y="18" width="85" height="15" rx="3" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="0.8" />
    <text x="115" y="29" fill="#EA580C" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">CEILING: 500 VIEWS</text>
    <path
      d="M 0 55 Q 12 34 24 55 T 48 55 T 72 38 T 96 58 T 120 40 T 144 56 T 168 42 T 192 55 L 200 55"
      fill="none"
      stroke="#71717A"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="168" cy="42" r="3" fill="#EA580C" />
  </svg>
);

const OnceSpikeSVG = () => (
  <svg viewBox="0 0 200 90" className="w-full h-24" aria-hidden="true">
    {[20, 45, 70].map(y => (
      <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#E5E4DE" strokeWidth="0.8" />
    ))}
    {[14, 34, 54, 114, 134, 154, 174].map(x => (
      <rect key={x} x={x} y="55" width="12" height="25" fill="#D4D4D0" rx="2" />
    ))}
    <rect x="80" y="10" width="14" height="70" fill="#EA580C" rx="2" />
    <circle cx="87" cy="6" r="3" fill="#EA580C" />
    <line x1="94" y1="30" x2="140" y2="30" stroke="#EA580C" strokeWidth="1" strokeDasharray="3 2" />
    <circle cx="152" cy="30" r="12" fill="#FAF9F6" stroke="#EA580C" strokeWidth="1.5" />
    <text x="148" y="34" fill="#EA580C" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold">?</text>
    <rect x="55" y="0" width="64" height="12" rx="2" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="0.8" />
    <text x="59" y="9" fill="#EA580C" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">18.4K SPIKE</text>
  </svg>
);

const FunnelLeakSVG = () => (
  <svg viewBox="0 0 200 95" className="w-full h-24" aria-hidden="true">
    <polygon points="30,12 170,12 130,50 70,50" fill="#ECFDF5" stroke="#E5E4DE" strokeWidth="1.2" />
    <polygon points="70,50 130,50 110,80 90,80" fill="#F4F3EE" stroke="#E5E4DE" strokeWidth="1.2" />
    <path d="M 45 32 L 18 48" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="3 2" />
    <polygon points="18,48 24,42 26,50" fill="#EA580C" />
    <path d="M 155 32 L 182 48" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="3 2" />
    <polygon points="182,48 174,50 176,42" fill="#EA580C" />
    <text x="75" y="26" fill="#059669" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">100K+ VIEWS</text>
    <text x="82" y="66" fill="#71717A" fontSize="7" fontFamily="JetBrains Mono, monospace">FOLLOWS</text>
    <rect x="75" y="82" width="50" height="12" rx="3" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="0.8" />
    <text x="79" y="91" fill="#EA580C" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">0 INQUIRIES</text>
  </svg>
);

const SituationsSection = () => {
  const situations = [
    {
      pill: 'SITUATION A // REACH PLATEAU',
      badgeColor: 'bg-[#FFF7ED] text-[#EA580C] border-[#FDBA74]',
      graphic: <FlatlineOscilloscope />,
      headline: 'I keep posting consistently, but stay stuck at 200–500 views.',
      body: "You try new topics, hooks, and posting times, but effort isn't turning into progress because you lack a structured way to isolate which variables actually trigger distribution signals.",
    },
    {
      pill: 'SITUATION B // THE ONE-HIT MYSTERY',
      badgeColor: 'bg-[#FEF3C7] text-[#D97706] border-[#FCD34D]',
      graphic: <OnceSpikeSVG />,
      headline: 'One Reel exploded once, but I cannot repeat what made it work.',
      body: 'You experienced a sudden spike in views and followers on a past post, yet every Reel after it dropped back to baseline. You had an accidental hit, but no framework to reverse-engineer and re-test the pattern.',
    },
    {
      pill: 'SITUATION C // ATTENTION WITHOUT CONVERSION',
      badgeColor: 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]',
      graphic: <FunnelLeakSVG />,
      headline: 'I have views and followers, but zero paying clients or inquiries.',
      body: "You've built attention, but lack the profile positioning, trust architecture, and intentional calls-to-action that systematically convert casual reel viewers into qualified direct conversations.",
    },
  ];

  return (
    <section id="diagnostics" className="relative py-12 sm:py-16">
      <div className="px-6 sm:px-10 lg:px-12 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-[#A1A1AA] tracking-[0.08em] uppercase font-semibold">
            [DIAGNOSTIC // 01]
          </span>
          <span className="w-1 h-1 rounded-full bg-[#EA580C]" />
          <span className="font-mono text-[10px] text-[#EA580C] tracking-[0.05em] uppercase font-semibold">
            ROOT CAUSE ANALYSIS
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#09090B] leading-[1.15] max-w-[800px]">
          Three common frustrations. One underlying cause:{' '}
          <span className="font-serif italic font-normal text-[#EA580C]">
            publishing without a structured feedback loop.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E4DE] border-y border-[#E5E4DE] bg-white">
        {situations.map((sit, i) => (
          <div
            key={i}
            className="p-6 sm:p-8 flex flex-col justify-between hover:bg-[#FAF9F6] transition-colors"
          >
            <div>
              <div className="mb-4">
                <span className={cn('font-mono text-[9px] font-bold px-2.5 py-1 rounded-full border tracking-[0.05em]', sit.badgeColor)}>
                  {sit.pill}
                </span>
              </div>

              <div className="border border-[#E5E4DE] rounded-xl bg-[#FAF9F6] overflow-hidden p-3 mb-6 shadow-xs">
                {sit.graphic}
              </div>

              <h3 className="text-[17px] font-bold tracking-tight text-[#09090B] leading-[1.3] mb-3">
                {sit.headline}
              </h3>

              <p className="text-[13px] text-[#52525B] leading-[1.65]">
                {sit.body}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F4F3EE] flex items-center justify-between font-mono text-[10px] text-[#A1A1AA]">
              <span>RESOLVED IN</span>
              <span className="font-bold text-[#09090B]">
                {i === 0 ? 'PHASE 01 & 02' : i === 1 ? 'PHASE 02 & 03' : 'PHASE 04'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 04: 4-PHASE CURRICULUM ROADMAP (id="curriculum")
// ─────────────────────────────────────────────────────────────────────────────
const phases = [
  {
    num: '01',
    colorTheme: {
      accent: '#D97706',
      tagBg: 'bg-[#FEF3C7] text-[#D97706]',
      border: 'border-[#FCD34D]',
    },
    days: 'DAYS 01–03',
    milestones: 'MILESTONES M1–M2',
    icon: Compass,
    title: 'Direction & Personal Baseline Audit',
    mission: 'Establish your objective starting point. Audit your past 90 days of Reels, isolate your own top outperformers, and define your non-negotiable target audience persona.',
    deliverable: 'Output M1 & M2: Account Direction Card + Personal Baseline Snapshot',
    lensA: {
      badge: 'CREATOR / AUDIENCE LENS',
      focus: 'Find your highest-retention topics and identify which format kept viewers watching past the 3-second drop-off curve for organic discovery.',
      metric: 'Baseline Metric: Median 3-Second Retention & Follower Conversion Rate'
    },
    lensB: {
      badge: 'FOUNDER / COACH LENS',
      focus: 'Pinpoint which past posts brought your most qualified inbound messages and map content pillars to your ideal client buying journey.',
      metric: 'Baseline Metric: Profile Visit-to-DM Ratio & Qualified Inquiry Velocity'
    }
  },
  {
    num: '02',
    colorTheme: {
      accent: '#4F46E5',
      tagBg: 'bg-[#E0E7FF] text-[#4F46E5]',
      border: 'border-[#C7D2FE]',
    },
    days: 'DAYS 04–08',
    milestones: 'MILESTONES M3–M6',
    icon: Search,
    title: '10-Account Outlier Investigation & AI Pattern Decoding',
    mission: 'Identify ~10 comparable niche accounts, isolate 10–15 true statistical outlier Reels (5x–15x their baseline), assemble verbatim transcripts, and extract testable pattern formulas using our supplied AI prompt frameworks.',
    deliverable: 'Output M3–M6: 10-Account Outlier Vault + Decoded Pattern Matrix',
    lensA: {
      badge: 'CREATOR / AUDIENCE LENS',
      focus: 'Decode visual hook cadences, sound pacing, and share-worthy tension arcs that turn casual scrollers into repeat profile visitors.',
      metric: 'Primary Output: 5 High-Retention Visual Hook Structures for Broad Reach'
    },
    lensB: {
      badge: 'FOUNDER / COACH LENS',
      focus: 'Decode authority-building contrast hooks and case-study frameworks that establish credibility without pitching or sounding salesy.',
      metric: 'Primary Output: 5 Authority-Positioning Pattern Blueprints for Inbound Trust'
    }
  },
  {
    num: '03',
    colorTheme: {
      accent: '#EA580C',
      tagBg: 'bg-[#FFEDD5] text-[#EA580C]',
      border: 'border-[#FDBA74]',
    },
    days: 'DAYS 09–15',
    milestones: 'MILESTONES M7–M9a',
    icon: Send,
    title: 'Original Hypothesis Creation & Test Cycle 01',
    mission: 'Translate decoded patterns into 3–4 original hypotheses in your authentic voice (never copying scripts). Script, film, publish Test Batch 1, and log real 48–72hr Instagram distribution telemetry.',
    deliverable: 'Output M7–M9a: Original Test Reels Published + 72h Distribution Signal Log',
    lensA: {
      badge: 'CREATOR / AUDIENCE LENS',
      focus: 'Test 3 different visual hook tempos. Track watch time, saves, and explore-page distribution percentage over 72 real hours.',
      metric: 'Success Signal: Test Reels beating 90-day baseline median by ≥ 2.5x'
    },
    lensB: {
      badge: 'FOUNDER / COACH LENS',
      focus: 'Test 3 problem-awareness hypotheses. Track profile clicks, link bio taps, and unsolicited DM conversations from target buyers.',
      metric: 'Success Signal: High-intent DM interactions & website click velocity'
    }
  },
  {
    num: '04',
    colorTheme: {
      accent: '#059669',
      tagBg: 'bg-[#D1FAE5] text-[#059669]',
      border: 'border-[#A7F3D0]',
    },
    days: 'DAYS 16–21',
    milestones: 'MILESTONES M9b–M11',
    icon: Store,
    title: 'Opportunity Storefront, Cycle 02 Iteration & Weekly SOP',
    mission: 'Optimize your profile bio, pinned post trust architecture, and next-step CTA. Compare Cycle 1 data against your baseline, iterate a refined Cycle 2 test, and lock in your repeatable weekly content engine.',
    deliverable: 'Output M10–M11: High-Clarity Profile Funnel + Sustainable Weekly Content SOP',
    lensA: {
      badge: 'CREATOR / AUDIENCE LENS',
      focus: 'Turn your profile into a high-converting follower magnet with pinned introductory series, clear bio value proposition, and community prompts.',
      metric: 'Graduation Asset: Weekly 3-Reel Batching SOP + Community Growth Engine'
    },
    lensB: {
      badge: 'FOUNDER / COACH LENS',
      focus: 'Transform your Instagram profile into a frictionless Opportunity Storefront with a high-trust pinned lead asset and clear DM entry point.',
      metric: 'Graduation Asset: Repeatable Client-Acquisition Content SOP (45 Mins/Day)'
    }
  },
];

const CurriculumSection = () => {
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
                  'relative z-10 px-4 py-2 rounded-lg text-[12px] font-bold transition-all duration-200 flex items-center gap-1.5',
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
                  'relative z-10 px-4 py-2 rounded-lg text-[12px] font-bold transition-all duration-200 flex items-center gap-1.5',
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
        {phases.map((phase) => {
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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 05: COMPARISON LEDGER (id="comparison")
// ─────────────────────────────────────────────────────────────────────────────
const ComparisonSection = () => {
  const oldWay = [
    '40+ hours of generic video lectures that collect digital dust',
    '"Just copy viral audio" advice that ruins your credibility',
    'Forced generic sales scripts that alienate creators without an offer',
    'Zero real-world publishing feedback loop or accountability',
    'Solo self-paced binge watching with 4% average completion rates',
    'Certificate of completion with zero tangible assets produced',
  ];

  const newWay = [
    'One 45-minute practical daily output with zero theoretical fluff',
    'Supplied AI/LLM prompt frameworks for mathematical pattern extraction',
    'Unified structure that excels for pure reach or high-ticket client inquiries',
    'Two full live publishing & 72-hour Instagram distribution review cycles',
    'Single active WhatsApp cohort with daily verification checkpoints',
    'Graduation with a verified 10-Account Outlier Vault & Weekly Content SOP',
  ];

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
            {oldWay.map((item, i) => (
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
            {newWay.map((item, i) => (
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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION: COACH RAVIKANT & TESTIMONIALS (id="coach")
// ─────────────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Siddharth Verma",
    role: "Founder & Director",
    company: "GrowthBridge (Gurugram)",
    headline: "From 300 Views to 42,000 Outlier on Day 12",
    quote: "Before this challenge, I posted daily for three months and never crossed 400 views. Coach Ravikant's 10-account investigation isolated the contrast hook formula in our niche. My test Reel reached 42,000 views and closed 2 high-ticket clients.",
    result: "42K Outlier Views",
    tag: "Consulting Founder"
  },
  {
    name: "Pooja Hegde",
    role: "Head of Marketing",
    company: "CloudScale (Bengaluru)",
    headline: "Beat Our 90-Day Account Baseline by 4.8x",
    quote: "The AI Pattern Decoding Matrix cut out 80% of script guesswork. Testing hypotheses in two 72-hour distribution batches gave our team concrete proof of what works. Highest ROI cohort we have taken.",
    result: "4.8x Baseline Growth",
    tag: "Growth Lead"
  },
  {
    name: "Arjun Nair",
    role: "Agency Founder",
    company: "Nair Digital (Mumbai)",
    headline: "4 Qualified Inbound DMs in the First 72 Hours",
    quote: "Most Instagram advice is about generic dancing or viral audio. Coach Ravikant's Opportunity Storefront framework re-architected my bio and pinned posts. Inbound inquiries turned into real discovery calls without paid ads.",
    result: "4 Client Inquiries",
    tag: "Agency Founder"
  },
  {
    name: "Neha Khurana",
    role: "Executive Coach",
    company: "Leadership Impact (Delhi NCR)",
    headline: "The 45-Min Daily Routine Stopped My Burnout",
    quote: "I was spending 3 hours daily recording random reels with zero traction. Following the 45-minute daily mission gave me absolute structure. My average retention jumped from 22% to 68%.",
    result: "68% Retention Rate",
    tag: "Executive Coach"
  },
  {
    name: "Rohan Kulkarni",
    role: "Strategy Consultant",
    company: "Apex Advisory (Pune)",
    headline: "Landed a ₹85,000 Retainer from Reel #07",
    quote: "The contrast hook framework from Phase 02 positioned me as a distinct authority. A prospect who watched my second test cycle booked a call directly from my profile link and signed an ₹85k retainer.",
    result: "₹85k Retainer",
    tag: "Strategy Consultant"
  },
  {
    name: "Ananya Sen",
    role: "Creative Director",
    company: "Zenith Studio (Hyderabad)",
    headline: "10-Account Outlier Vault Is Pure Gold",
    quote: "Having the exact spreadsheet to track outlier ratios completely changed how I look at competitors. It is not copying — it is reverse-engineering proven distribution mechanics.",
    result: "3 Viral Outliers",
    tag: "Creative Director"
  }
];

const CoachSection = ({ onOpenCheckout }: { onOpenCheckout: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-sliding carousel every 4.5 seconds with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prev = () => setCurrentIndex(i => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i === testimonials.length - 1 ? 0 : i + 1));

  const current = testimonials[currentIndex];

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
                className="w-9 h-9 rounded-xl border border-[#E5E4DE] bg-[#FAF9F6] hover:bg-white flex items-center justify-center text-[#52525B] hover:text-[#09090B] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-xl border border-[#E5E4DE] bg-[#FAF9F6] hover:bg-white flex items-center justify-center text-[#52525B] hover:text-[#09090B] transition-colors"
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
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                    {current.result}
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
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-200',
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
              className="btn-tactile px-5 py-2.5 text-xs font-bold flex items-center gap-2 shrink-0"
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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 06: BOARDING PASS CHECKOUT TICKET (id="enroll")
// ─────────────────────────────────────────────────────────────────────────────
const inclusions = [
  { title: `${CHALLENGE_CONFIG.durationDays} Daily Action Briefs`, desc: 'Step-by-step WhatsApp missions (45 mins/day)', tag: 'CORE' },
  { title: 'Single WhatsApp Implementation Cohort', desc: 'Active accountability with Coach Ravikant review', tag: 'COMMUNITY' },
  { title: '10-Account Outlier Research Spreadsheet', desc: 'Pre-formatted mathematical ratio tracking sheet', tag: 'TEMPLATE' },
  { title: 'AI/LLM Pattern Decoding Prompt Pack', desc: 'Custom prompts to reverse-engineer viral scripts', tag: 'TOOLKIT' },
  { title: 'Universal Profile-to-Opportunity Funnel', desc: 'Positioning framework for audience or clients', tag: 'FRAMEWORK' },
  { title: 'Post-Challenge Repeatable Weekly SOP', desc: 'Your permanent weekly 3-Reel production system', tag: 'SYSTEM' },
];

const CheckoutSection = ({ onEnroll }: { onEnroll: () => void }) => {
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
              {inclusions.map((item, idx) => (
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
              className="btn-tactile w-full py-4 text-[15px] font-bold flex items-center justify-center gap-2 group shadow-card"
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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 07: ZERO-FLUFF ACCORDION FAQ (id="faq")
// ─────────────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What if I don't have a product or service to sell yet?",
    a: "The challenge features a unified assignment structure. Every daily research and publishing mission is 100% relevant whether you are aiming for pure follower growth or immediate client acquisition. The Goal Lens in Phase 04 simply directs your profile funnel toward future audience depth or private consultation inquiries.",
  },
  {
    q: "Do I need any paid software, AI subscriptions, or complex tools?",
    a: "No. Everything is completed with free tools: your smartphone, Instagram, a basic spreadsheet, and our provided AI prompt pack (compatible with free ChatGPT, Claude, or Gemini). Zero recurring tool subscriptions required.",
  },
  {
    q: "Why 21 days instead of a weekend workshop?",
    a: "Instagram distribution algorithms physically require 48 to 72 hours of live user telemetry before a post settles into explore and feed distribution. Sourcing 10 accounts, testing Batch 1, analyzing 72h data, and testing an iterated Batch 2 physically requires 21 real calendar days. A weekend workshop can only teach theory.",
  },
  {
    q: "Does this guarantee viral Reels or specific revenue figures?",
    a: "No — and anyone making algorithmic guarantees is lying to you. We provide a repeatable, evidence-based decision framework: how to identify outlier patterns, formulate testable hypotheses, and read signal distribution. Your results depend on your execution, niche consistency, and creative iteration.",
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="px-6 sm:px-10 lg:px-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-[#A1A1AA] tracking-[0.08em] uppercase font-semibold">
            [FREQUENTLY ASKED QUESTIONS // 06]
          </span>
          <span className="w-1 h-1 rounded-full bg-[#EA580C]" />
          <span className="font-mono text-[10px] text-[#059669] font-bold">
            ZERO FLUFF
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B] mb-8">
          Answers to common questions before joining.
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#E5E4DE] bg-white overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-5 flex items-start justify-between gap-4 transition-colors"
                aria-expanded={openIdx === idx}
              >
                <span className="text-[14px] sm:text-[15px] font-bold text-[#09090B] flex items-start gap-3">
                  <span className="font-mono text-[11px] font-bold text-[#EA580C] mt-0.5 px-2 py-0.5 rounded bg-[#FFF7ED] shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{faq.q}</span>
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
                    <p className="px-5 pb-5 pl-14 text-[13px] text-[#52525B] leading-[1.7]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-[#F4F3EE] border border-[#E5E4DE] flex items-start gap-3.5">
          <ShieldCheck size={20} className="text-[#059669] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[13px] text-[#09090B] block mb-0.5">
              Evidence-Based Decision Guarantee
            </span>
            <p className="text-[12px] text-[#52525B] leading-relaxed">
              If you follow the 21 daily missions, complete both test cycles, and feel you didn't gain a systematic understanding of your account outliers, message Coach Ravikant for a prompt full refund.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRATION CHECKOUT MODAL (STRICTLY VIEWPORT-CENTERED!)
// ─────────────────────────────────────────────────────────────────────────────
type GoalType = 'audience' | 'clients' | '';
interface FormState {
  name: string;
  whatsapp: string;
  instagram: string;
  goal: GoalType;
}

const CheckoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [form, setForm] = useState<FormState>({ name: '', whatsapp: '', instagram: '', goal: 'audience' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#09090B]/50 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Centered Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl border border-[#E5E4DE] shadow-modal overflow-hidden my-auto z-10">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E5E4DE] bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4F636] text-[#09090B] flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              CR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold text-[#EA580C] uppercase tracking-wider">
                  {CHALLENGE_CONFIG.cohortLabel}
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-[#D4F636] text-[#09090B] font-bold">
                  {CHALLENGE_CONFIG.priceINR}
                </span>
              </div>
              <h3 className="font-extrabold text-[16px] text-[#09090B] tracking-tight">
                Reserve Your Challenge Seat
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#09090B] hover:bg-white border border-transparent hover:border-[#E5E4DE] transition-all"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase mb-1.5">
                  Your Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-mono text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase">
                    WhatsApp Number (For Cohort Access)
                  </label>
                  <span className="font-mono text-[9px] text-[#059669] font-semibold">DAILY MISSIONS SENT HERE</span>
                </div>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.whatsapp}
                  onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase mb-1.5">
                  Instagram Handle (For Account Audit)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] text-[14px] font-mono">@</span>
                  <input
                    required
                    type="text"
                    placeholder="yourhandle"
                    value={form.instagram}
                    onChange={e => setForm({ ...form, instagram: e.target.value })}
                    className="w-full pl-8 pr-3.5 py-2.5 text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase mb-1.5">
                  Select Your Primary Objective
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, goal: 'audience' })}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all',
                      form.goal === 'audience'
                        ? 'border-[#09090B] bg-[#09090B] text-white shadow-xs'
                        : 'border-[#E5E4DE] bg-[#FAF9F6] text-[#52525B] hover:border-[#09090B]/30'
                    )}
                  >
                    <div className="font-bold text-[12px] flex items-center gap-1.5">
                      <TrendingUp size={13} className={form.goal === 'audience' ? 'text-[#D4F636]' : 'text-[#71717A]'} />
                      Audience Growth
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5 leading-tight">
                      Reach, followers & views
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, goal: 'clients' })}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all',
                      form.goal === 'clients'
                        ? 'border-[#09090B] bg-[#09090B] text-white shadow-xs'
                        : 'border-[#E5E4DE] bg-[#FAF9F6] text-[#52525B] hover:border-[#09090B]/30'
                    )}
                  >
                    <div className="font-bold text-[12px] flex items-center gap-1.5">
                      <Target size={13} className={form.goal === 'clients' ? 'text-[#D4F636]' : 'text-[#71717A]'} />
                      Client Inquiries
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5 leading-tight">
                      DMs, leads & clients
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-tactile w-full py-3.5 text-[14px] font-bold flex items-center justify-center gap-2 group shadow-card"
                >
                  <span>Confirm & Join Cohort 01 — {CHALLENGE_CONFIG.priceINR}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#D4F636]" />
                </button>
                <p className="text-center font-mono text-[9px] text-[#A1A1AA] mt-2">
                  Instant WhatsApp invitation link sent upon verification • {CHALLENGE_CONFIG.gstLabel}
                </p>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-[#059669]" />
              </div>
              <h3 className="text-[20px] font-black tracking-tight text-[#09090B] mb-2">
                Seat Reserved, {form.name.split(' ')[0]}!
              </h3>
              <p className="text-[13px] text-[#52525B] leading-[1.65] mb-5 max-w-[380px] mx-auto">
                Welcome to Cohort 01. We've recorded your Instagram handle (@{form.instagram}) for the baseline diagnostic. Check your WhatsApp ({form.whatsapp}) for your onboarding pass.
              </p>
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E4DE] inline-block font-mono text-[10px] text-[#09090B] font-bold">
                PASS ID: CR-ACADEMY-C01-8492 • 21-DAY ACCESS GRANTED
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const Footer = () => (
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

// ─────────────────────────────────────────────────────────────────────────────
// ROOT ARCHITECTURAL CONTAINER
// ─────────────────────────────────────────────────────────────────────────────
export default function ChallengeLandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        const target = e.target as HTMLElement;
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
        setModalOpen(true);
      }
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const scrollToPhases = () => {
    document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-[#D4F636] selection:text-[#09090B]">
      {/* Sticky Navigation with Active Underlines & ScrollSpy */}
      <Navbar onOpenCheckout={() => setModalOpen(true)} />

      {/* Main Exposed Architectural Container with rails */}
      <main className="max-w-[1160px] mx-auto relative border-l border-r border-[#E5E4DE] bg-white shadow-xs">
        {/* Section 02: Split Hero with Physical VIP Pass Artifact */}
        <HeroSection onEnroll={() => setModalOpen(true)} onPhases={scrollToPhases} />

        <SectionDivider hatch />

        {/* Section 03: The 3 Diagnostic Situations */}
        <SituationsSection />

        <SectionDivider hatch />

        {/* Section 04: 4-Phase Curriculum & Dynamic Goal Lens */}
        <CurriculumSection />

        <SectionDivider hatch />

        {/* Section 05: Side-by-Side Comparison Ledger */}
        <ComparisonSection />

        <SectionDivider hatch />

        {/* Section 06: Coach Ravikant Mentorship & Verified Outcomes */}
        <CoachSection onOpenCheckout={() => setModalOpen(true)} />

        <SectionDivider hatch />

        {/* Section 07: Boarding Pass Checkout Ticket */}
        <CheckoutSection onEnroll={() => setModalOpen(true)} />

        <SectionDivider hatch />

        {/* Section 08: Zero-Fluff FAQ */}
        <FAQSection />

        <div className="relative h-0">
          <Crosshair className="-bottom-[5.5px] -left-[5.5px]" />
          <Crosshair className="-bottom-[5.5px] -right-[5.5px]" />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Viewport-Centered Registration Modal */}
      <CheckoutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
