'use client';

import React, { useState, useEffect } from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
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
import { Calendar, ArrowRight, ShieldCheck, Headphones, Lock } from 'lucide-react';
import { trackMetaEvent, extractUtmParams } from '@/lib/meta-pixel';
import Link from 'next/link';

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
      if (window.scrollY > 600) {
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
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-100/80 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1E56A0] via-[#0081C9] to-[#5BC0F8] flex items-center justify-center text-white shadow-xs">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-brand-900 tracking-tight block leading-tight font-display">
                JIT HELPDESK
              </span>
              <span className="text-[9px] text-slate-500 font-medium block">
                by Jewar International Technologies
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-semibold text-slate-600 hover:text-brand-900 hidden sm:inline-flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>CRM Login</span>
            </Link>

            <button
              onClick={handleOpenBooking}
              className="cta-glow-btn px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Demo</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section (Recreated from A4 Reference) */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* Customer Problems / Pain Points */}
      <ProblemSection onOpenBooking={handleOpenBooking} />

      {/* Product Walkthrough Demonstration */}
      <ProductDemoSection onOpenBooking={handleOpenBooking} />

      {/* Product Solution Pillars */}
      <SolutionSection onOpenBooking={handleOpenBooking} />

      {/* How It Works (Step 1-5) */}
      <HowItWorksSection onOpenBooking={handleOpenBooking} />

      {/* Business Benefits */}
      <BenefitsSection />

      {/* Transparent Pricing Package */}
      <PricingSection onOpenBooking={handleOpenBooking} />

      {/* Illustrative Business Case */}
      <BusinessCaseSection onOpenBooking={handleOpenBooking} />

      {/* Who It Is For & Personalized Walkthrough Expectations */}
      <WhoItIsForSection onOpenBooking={handleOpenBooking} />

      {/* Approved FAQs */}
      <FaqSection />

      {/* Final Call to Action & Footer */}
      <FinalCtaSection onOpenBooking={handleOpenBooking} />

      {/* Sticky Bottom Floating Bar for Mobile (Task 10) */}
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
