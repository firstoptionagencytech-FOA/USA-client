'use client';

import React from 'react';
import { HeroHdVisual } from './HeroHdVisual';
import { Calendar, ArrowRight, Info, Users, Headphones, ShieldCheck, Check } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FCF7FA] via-[#FAF3F6] to-[#F5ECF0] pt-6 sm:pt-10 pb-0 text-slate-900">
      
      {/* Background Decor: Organic Wavy Maroon Ribbons on Top-Left */}
      <div className="absolute top-0 left-0 w-[200px] sm:w-[340px] h-[180px] sm:h-[280px] pointer-events-none select-none overflow-hidden z-0 opacity-90">
        <svg viewBox="0 0 400 350" fill="none" className="w-full h-full">
          <path
            d="M-50 -50 C120 50, 150 200, 20 280 C-40 310, -70 200, -80 150 Z"
            fill="url(#wineRibbon1)"
          />
          <path
            d="M-80 -20 C80 80, 180 120, 260 50 C290 20, 240 -40, 200 -60 Z"
            fill="url(#wineRibbon2)"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="wineRibbon1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7A0026" />
              <stop offset="60%" stopColor="#8B0032" />
              <stop offset="100%" stopColor="#52001A" />
            </linearGradient>
            <linearGradient id="wineRibbon2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B02B5E" />
              <stop offset="100%" stopColor="#7A0026" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Background Decor: Dot Grids on Top-Right */}
      <div className="absolute top-6 right-4 sm:right-10 w-24 h-24 bg-dots opacity-40 pointer-events-none" />

      {/* Header Container: Logo + Wordmark */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2">
            {/* Blue & Cyan Headset Icon */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#1E56A0] via-[#0081C9] to-[#5BC0F8] flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-brand-900 font-display">
              JIT HELPDESK
            </h1>
          </div>

          {/* Sub-tag with divider lines */}
          <div className="flex items-center gap-2 sm:gap-3 mt-1 text-[10px] sm:text-xs text-slate-500 font-medium">
            <span className="w-6 sm:w-12 h-[1px] bg-slate-300/80" />
            <span>by Jewar International Technologies</span>
            <span className="w-6 sm:w-12 h-[1px] bg-slate-300/80" />
          </div>
        </div>

        {/* Audience Kicker Pill */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FAF0F4] border border-[#F3D2DF] text-brand-800 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-3 sm:mb-4 shadow-xs">
          FOR IT SUPPORT BUSINESSES & GROWING MSPS
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl font-display mb-3 sm:mb-4">
          Your Clients Shouldn&apos;t Have to Chase You for{' '}
          <span className="text-brand-700 inline-block">
            IT Support Updates.
          </span>
        </h2>

        {/* Subheadline / Description */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-xl sm:max-w-2xl mb-4 sm:mb-6">
          Give your IT business its own branded mobile app and customer web portal—so clients can request help, approve quotes, make payments, and track progress, all under your business name.
        </p>

        {/* Without-BG High Definition Product Visual (Directly under Heading & Description) */}
        <HeroHdVisual />

        {/* Primary CTA Button (Right below HD Visual) */}
        <div className="flex flex-col items-center text-center mt-2 mb-8 sm:mb-12 w-full max-w-md">
          <button
            onClick={onOpenBooking}
            className="cta-glow-btn w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-white" />
            </div>
            <span>Book Your Free Personalized Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Pricing Details Below CTA */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3.5 text-slate-800 font-bold">
            <span className="w-8 sm:w-14 h-[1.5px] bg-slate-300" />
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-brand-800 text-white text-[11px] sm:text-xs font-bold shadow-xs">
                $400 One-Time Setup
              </span>
              <span className="text-slate-400 font-light">+</span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-brand-800 text-white text-[11px] sm:text-xs font-bold shadow-xs">
                $200 / Month
              </span>
            </div>

            <span className="w-8 sm:w-14 h-[1.5px] bg-slate-300" />
          </div>

          {/* Micro-copy Note */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] sm:text-xs text-slate-500 font-medium">
            <Info className="w-3.5 h-3.5 text-brand-700 shrink-0" />
            <span>See the customer experience and owner dashboard in action. No obligation.</span>
          </div>
        </div>

      </div>

      {/* Bottom Ribbon Wave: Matching A4 Footer Ribbon */}
      <div className="relative w-full bg-gradient-to-r from-[#4A0016] via-[#6B0024] to-[#4A0016] text-white py-3 sm:py-3.5 px-4 shadow-inner">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wide text-center">
          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-pink-300">
            <Users className="w-3 h-3" />
          </div>
          <span>Your Brand. Your Customers. One Connected Support Experience.</span>
        </div>
      </div>

    </section>
  );
};
