'use client';

import React from 'react';
import { PhoneMockup } from '../hero/PhoneMockup';
import { LaptopMockup } from '../hero/LaptopMockup';
import { FeaturePills } from '../hero/FeaturePills';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface DeviceShowcaseSectionProps {
  onOpenBooking: () => void;
}

export const DeviceShowcaseSection: React.FC<DeviceShowcaseSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-[#F5ECF0] via-white to-[#FAF6F8] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-700/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Interactive Multi-Platform Showcase</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
            Branded Mobile App &amp; Owner Admin Dashboard.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            Experience the dual interface that powers your IT business: your clients get their own intuitive branded app and web portal, while your team operates through a real-time command dashboard.
          </p>
        </div>

        {/* Dual Device Display: Phone on Left, Divider Line in Center, Laptop on Right */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 pt-2 pb-6">
          
          {/* Left: Phone Mockup */}
          <div className="z-10 transform lg:hover:scale-[1.01] transition-transform duration-300">
            <PhoneMockup />
          </div>

          {/* Elegant Divider Line Between Mobile and Laptop/Tab (Requested by user) */}
          <div className="hidden lg:flex flex-col items-center justify-center px-4 self-stretch z-10 select-none min-h-[420px]">
            <div className="w-[1.5px] flex-1 bg-gradient-to-b from-transparent via-brand-300 to-brand-600" />
            
            <div className="my-4 px-3 py-1 rounded-full bg-white border border-brand-200 text-brand-900 text-[10px] font-extrabold shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-700 animate-pulse" />
              <span>CONNECTED</span>
            </div>
            
            <div className="w-[1.5px] flex-1 bg-gradient-to-b from-brand-600 via-brand-300 to-transparent" />
          </div>

          {/* Mobile Divider Line (Horizontal) */}
          <div className="lg:hidden flex items-center justify-center w-full my-3 z-10">
            <div className="h-[1.5px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-brand-300" />
            <div className="mx-3 px-3 py-1 rounded-full bg-white border border-brand-200 text-brand-800 text-[10px] font-extrabold shadow-xs">
              One Connected System
            </div>
            <div className="h-[1.5px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-brand-300" />
          </div>

          {/* Right: Laptop Mockup */}
          <div className="w-full max-w-[540px] lg:max-w-[580px] transform lg:hover:scale-[1.01] transition-transform duration-300">
            <LaptopMockup />
          </div>

          {/* Floating Vertical Feature Badges (Desktop/Tablet) */}
          <div className="hidden xl:flex flex-col gap-2.5 absolute right-0 top-1/2 -translate-y-1/2 z-20">
            {[
              'Branded App',
              'Client Portal',
              'Smart Dashboard',
              'Secure & Reliable',
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-pink-200/80 shadow-card-soft text-xs font-bold text-slate-800"
              >
                <div className="w-4 h-4 rounded-full bg-brand-700 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>

        </div>

        {/* 5 Feature Pills Row */}
        <FeaturePills onSelect={onOpenBooking} />

        {/* Call to action below showcase */}
        <div className="text-center mt-6">
          <button
            onClick={onOpenBooking}
            className="cta-glow-btn px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore The Workspace Live — Book Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
