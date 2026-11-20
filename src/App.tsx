import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SituationsSection } from './components/SituationsSection';
import { CurriculumSection } from './components/CurriculumSection';
import { ComparisonSection } from './components/ComparisonSection';
import { CoachSection } from './components/CoachSection';
import { CheckoutSection } from './components/CheckoutSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CheckoutModal } from './components/CheckoutModal';
import { SectionDivider, Crosshair } from './components/common/GridDivider';

export default function App() {
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
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-[#D4F636] selection:text-[#09090B] pb-20 lg:pb-0">
      {/* Sticky Navigation with Active Underlines & ScrollSpy */}
      <Navbar onOpenCheckout={() => setModalOpen(true)} />

      {/* Main Exposed Architectural Container with rails */}
      <main className="w-full max-w-full md:max-w-[1160px] mx-auto relative border-x-0 md:border-l md:border-r border-[#E5E4DE] bg-white shadow-xs overflow-x-clip md:overflow-visible">
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

        <div className="relative h-0 hidden md:block">
          <Crosshair className="-bottom-[5.5px] -left-[5.5px]" />
          <Crosshair className="-bottom-[5.5px] -right-[5.5px]" />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Quick-Action Conversion Bar (Instagram-to-Mobile Best Practice) */}
      <MobileBottomBar onOpenCheckout={() => setModalOpen(true)} />

      {/* Viewport-Centered Registration Modal */}
      <CheckoutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
