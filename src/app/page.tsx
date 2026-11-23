'use client';

import React, { useState, useEffect } from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
import { DeviceShowcaseSection } from '@/components/sections/DeviceShowcaseSection';
import { PricePerceptionSection } from '@/components/sections/PricePerceptionSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { BusinessCaseSection } from '@/components/sections/BusinessCaseSection';
import { PricingSection } from '@/components/sections/PricingSection';
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

      {/* 5. Complete Solution (Loyalty Rewards #1, Branded Mobile App, Notifications, Web Portal, Admin) */}
      <SolutionSection onOpenBooking={handleOpenBooking} />

      {/* 6. Retention Business Case (Keeping Just 1 Client Covers the $2,800/yr Fee) */}
      <BusinessCaseSection onOpenBooking={handleOpenBooking} />

      {/* 7. Transparent Pricing Package ($400 setup + $200/mo flat) */}
      <PricingSection onOpenBooking={handleOpenBooking} />

      {/* 8. Approved FAQs (10 Complete Questions & Answers) */}
      <FaqSection />

      {/* 9. Final Call to Action & Footer */}
      <FinalCtaSection onOpenBooking={handleOpenBooking} />

      {/* Sticky Bottom Floating Bar for Mobile */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#dce3d4] p-3 sm:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2">
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-[#182c26] font-display leading-tight">
              JIT Helpdesk Demo
            </span>
            <span className="text-[10px] text-[#274c3b] font-bold">
              $400 setup + $200/mo
            </span>
          </div>

          <button
            onClick={handleOpenBooking}
            className="poster-glow-btn px-5 py-2.5 rounded-full text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Book Free Demo</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d2f56d]" />
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
