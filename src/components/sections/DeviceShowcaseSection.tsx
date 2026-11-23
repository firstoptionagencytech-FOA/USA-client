'use client';

import React from 'react';
import { PhoneMockup } from '../hero/PhoneMockup';
import { LaptopMockup } from '../hero/LaptopMockup';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface DeviceShowcaseSectionProps {
  onOpenBooking: () => void;
}

export const DeviceShowcaseSection: React.FC<DeviceShowcaseSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-[#e7ece0] via-[#f6f6ef] to-[#ffffff] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#d2f56d]/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#274c3b]" />
            <span>Product Showcase</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-3">
            Your Brand. On Their Phone. In Their Everyday Workflow.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#61705f] leading-relaxed">
            Imagine your customers opening an app with your business name and logo—not another software company&apos;s identity. From submitting a service request to checking rewards, your customers have a familiar place to connect with your business.
          </p>
        </div>

        {/* Dual Device Display: Phone on Left, Divider Line in Center, Laptop on Right */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 pt-2 pb-6">
          
          {/* Left: Phone Mockup */}
          <div className="z-10 transform lg:hover:scale-[1.01] transition-transform duration-300">
            <PhoneMockup />
          </div>

          {/* Elegant Connected Divider Line Between Mobile and Laptop */}
          <div className="hidden lg:flex flex-col items-center justify-center px-4 self-stretch z-10 select-none min-h-[420px]">
            <div className="w-[1.5px] flex-1 bg-gradient-to-b from-transparent via-[#dce3d4] to-[#274c3b]" />
            
            <div className="my-4 px-3 py-1 rounded-full bg-[#182c26] border border-[#d2f56d]/30 text-[#d2f56d] text-[10px] font-extrabold shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d2f56d] live-indicator" />
              <span>CONNECTED</span>
            </div>
            
            <div className="w-[1.5px] flex-1 bg-gradient-to-b from-[#274c3b] via-[#dce3d4] to-transparent" />
          </div>

          {/* Mobile Divider Line (Horizontal) */}
          <div className="lg:hidden flex items-center justify-center w-full my-3 z-10">
            <div className="h-[1.5px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#274c3b]" />
            <div className="mx-3 px-3 py-1 rounded-full bg-[#182c26] border border-[#d2f56d]/30 text-[#d2f56d] text-[10px] font-extrabold shadow-xs">
              One Connected System
            </div>
            <div className="h-[1.5px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#274c3b]" />
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
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#dce3d4] shadow-card-soft text-xs font-bold text-[#182c26] hover:border-[#274c3b] transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-[#274c3b] text-[#d2f56d] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Call to action below showcase */}
        <div className="text-center mt-8">
          <button
            onClick={onOpenBooking}
            className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-2.5 cursor-pointer bg-gradient-to-r from-[#182c26] via-[#274c3b] to-[#11201b] hover:from-[#203e30] hover:via-[#2f5a46] hover:to-[#182c26] border border-[#d2f56d] shadow-[0_10px_28px_rgba(24,44,38,0.4)] active:scale-[0.98] transition-all duration-200 group"
          >
            <span>Explore The Workspace Live — Book Demo</span>
            <ArrowRight className="w-4 h-4 text-[#d2f56d] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
