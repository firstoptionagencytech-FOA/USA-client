'use client';

import React, { useState, useEffect } from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
import { DeviceShowcaseSection } from '@/components/sections/DeviceShowcaseSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProductDemoSection } from '@/components/sections/ProductDemoSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { BusinessCaseSection } from '@/components/sections/BusinessCaseSection';
import { WhoItIsForSection } from '@/components/sections/WhoItIsForSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { FunnelModal } from '@/components/funnel/FunnelModal';
import { ArrowRight } from 'lucide-react';
import { trackMetaEvent } from '@/lib/meta-pixel';

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [surveyMode, setSurveyMode] = useState<'5_questions' | '3_questions'>('5_questions');
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Initialize tracking and fetch admin config
  useEffect(() => {
    trackMetaEvent('PageView', {
      page: 'JIT Helpdesk US Landing Page',
    });

    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.success && data.settings?.survey_mode) {
          setSurveyMode(data.settings.survey_mode);
        }
      } catch (e) {
        // use default
      }
    };
    fetchConfig();

    // Show sticky mobile CTA after scrolling past hero
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = () => {
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#FCF8FA] text-slate-900 selection:bg-brand-700 selection:text-white relative">
      
      {/* 1. Hero Section (Header Bar removed as requested; Brand logo is right in hero) */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* 2. Device Showcase Section (Phone & Laptop detailed view moved to second section) */}
      <DeviceShowcaseSection onOpenBooking={handleOpenBooking} />

      {/* 3. Customer Problems / Pain Points */}
      <ProblemSection onOpenBooking={handleOpenBooking} />

      {/* 4. Product Walkthrough Demonstration */}
      <ProductDemoSection onOpenBooking={handleOpenBooking} />

      {/* 5. Product Solution Pillars */}
      <SolutionSection onOpenBooking={handleOpenBooking} />

      {/* 6. How It Works (Step 1-5) */}
      <HowItWorksSection onOpenBooking={handleOpenBooking} />

      {/* 7. Business Benefits */}
      <BenefitsSection />

      {/* 8. Transparent Pricing Package */}
      <PricingSection onOpenBooking={handleOpenBooking} />

      {/* 9. Illustrative Business Case */}
      <BusinessCaseSection onOpenBooking={handleOpenBooking} />

      {/* 10. Who It Is For & Personalized Walkthrough Expectations */}
      <WhoItIsForSection onOpenBooking={handleOpenBooking} />

      {/* 11. Approved FAQs */}
      <FaqSection />

      {/* 12. Final Call to Action & Footer */}
      <FinalCtaSection onOpenBooking={handleOpenBooking} />

      {/* Sticky Bottom Floating Bar for Mobile */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-pink-200/80 p-3 sm:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2">
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-slate-900 font-display leading-tight">
              JIT Helpdesk Demo
            </span>
            <span className="text-[10px] text-brand-700 font-bold">
              $400 setup + $200/mo
            </span>
          </div>

          <button
            onClick={handleOpenBooking}
            className="cta-glow-btn px-5 py-2.5 rounded-full text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Book Free Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Qualification & Booking Funnel Modal */}
      <FunnelModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        surveyMode={surveyMode}
      />

    </main>
  );
}
