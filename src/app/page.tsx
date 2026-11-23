'use client';

import React, { useState, useEffect } from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
import { DeviceShowcaseSection } from '@/components/sections/DeviceShowcaseSection';
import { PricePerceptionSection } from '@/components/sections/PricePerceptionSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { BusinessCaseSection } from '@/components/sections/BusinessCaseSection';
import { ProductDemoSection } from '@/components/sections/ProductDemoSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { CoreCapabilitiesSection } from '@/components/sections/CoreCapabilitiesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { WhoItIsForSection } from '@/components/sections/WhoItIsForSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { FunnelModal } from '@/components/funnel/FunnelModal';
import { ArrowRight } from 'lucide-react';
import { trackMetaEvent, initMetaPixel } from '@/lib/meta-pixel';

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
        if (data.success && data.settings) {
          if (data.settings.survey_mode) {
            setSurveyMode(data.settings.survey_mode);
          }
          if (data.settings.meta_pixel_id) {
            initMetaPixel(data.settings.meta_pixel_id);
          }
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
    <main className="min-h-screen bg-[#f6f6ef] text-[#182c26] selection:bg-[#274c3b] selection:text-[#d2f56d] relative overflow-x-hidden">
      
      {/* 1. Hero Section (SaaS-Price Tagline + Dynamic UTM Headline + 3D Showcase + CTA + Price Anchor) */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* 2. Device Showcase Section (Phone Mockup with Loyalty Coins + Laptop Admin View) */}
      <DeviceShowcaseSection onOpenBooking={handleOpenBooking} />

      {/* 3. Price-Perception Comparison (Custom Build Agency vs JIT Helpdesk Platform) */}
      <PricePerceptionSection onOpenBooking={handleOpenBooking} />

      {/* 4. Customer Experience Gap (3 Ad Angles: Competitor Ads, Cheaper Shops, Unread Emails) */}
      <ProblemSection onOpenBooking={handleOpenBooking} />

      {/* 5. Complete Solution (Loyalty Rewards #1 with 3D Assets, Mobile App, Notifications, Web Portal, Admin) */}
      <SolutionSection onOpenBooking={handleOpenBooking} />

      {/* 6. Retention Business Case (Keeping Just 1 Client Covers the $2,800/yr Fee) */}
      <BusinessCaseSection onOpenBooking={handleOpenBooking} />

      {/* 7. Product Walkthrough (Interactive 5-Step Customer Journey) */}
      <ProductDemoSection onOpenBooking={handleOpenBooking} />

      {/* 8. Business Benefits (Build a Business Customers Want to Return To — Proven Qualitative Outcomes) */}
      <BenefitsSection />

      {/* 9. Five Core Capabilities (Everything Connected Under Your Brand) */}
      <CoreCapabilitiesSection onOpenBooking={handleOpenBooking} />

      {/* 10. Transparent Pricing Package ($400 setup + $200/mo flat) */}
      <PricingSection onOpenBooking={handleOpenBooking} />

      {/* 11. Audience Qualification & Personalized Walkthrough Expectations */}
      <WhoItIsForSection onOpenBooking={handleOpenBooking} />

      {/* 12. Approved FAQs (10 Complete Questions & Answers) */}
      <FaqSection />

      {/* 13. Final Call to Action & Footer */}
      <FinalCtaSection onOpenBooking={handleOpenBooking} />

      {/* Sticky Bottom Floating Bar for Mobile */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#182c26]/95 backdrop-blur-md border-t border-[#d2f56d]/30 px-4 py-2.5 sm:hidden transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold text-white">JIT Helpdesk</div>
            <div className="text-[9px] text-[#d2f56d] font-black">$400 setup · $200/mo</div>
          </div>
          <button
            onClick={handleOpenBooking}
            className="px-4 py-2 rounded-full bg-[#d2f56d] text-[#182c26] text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
          >
            <span>Book Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Funnel Booking Modal */}
      <FunnelModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        surveyMode={surveyMode}
      />

    </main>
  );
}
