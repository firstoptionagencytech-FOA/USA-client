'use client';

import React from 'react';
import Image from 'next/image';
import { HeroHdVisual } from './HeroHdVisual';
import { Calendar, ArrowRight, Info, Users, Headphones } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FCF7FA] via-[#FAF3F6] to-[#F5ECF0] pt-6 sm:pt-8 pb-0 text-slate-900">
      
      {/* Background Decor: Clean corner wave on far top-left (Does NOT touch or obscure logo) */}
      <div className="absolute -top-10 -left-10 w-[140px] sm:w-[220px] h-[130px] sm:h-[200px] pointer-events-none select-none overflow-hidden z-0 opacity-80">
        <svg viewBox="0 0 300 280" fill="none" className="w-full h-full">
          <path
            d="M-20 -20 C100 30, 140 160, 20 220 C-30 250, -60 160, -70 110 Z"
            fill="url(#wineRibbonCorner)"
          />
          <defs>
            <linearGradient id="wineRibbonCorner" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7A0026" />
              <stop offset="60%" stopColor="#8B0032" />
              <stop offset="100%" stopColor="#52001A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Background Decor: Dot Grids on Far Top-Right */}
      <div className="absolute top-4 right-4 sm:right-10 w-20 h-20 bg-dots opacity-40 pointer-events-none" />

      {/* Main Container: Fully Centered, Clean Spacing */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Official Brand Header (Exact A4 Hierarchy: Headset / Emblem + JIT HELPDESK + Jewar Byline) */}
        <div className="flex flex-col items-center mb-3 sm:mb-4.5">
          <div className="flex items-center justify-center gap-2.5">
            {/* Official Jewar Emblem in Sleek Circular Container */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/90 p-1 border border-brand-200/80 shadow-xs flex items-center justify-center hover:scale-105 transition-transform">
              <Image
                src="/brand/jewar_emblem.png"
                alt="Jewar International Technologies Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#7A0026] font-display">
              JIT HELPDESK
            </h1>
          </div>

          {/* Subtitle Byline with Crisp Symmetrical Dividers */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1 text-[11px] sm:text-xs text-slate-500 font-medium">
            <span className="w-8 sm:w-12 h-[1px] bg-slate-300" />
            <span className="font-bold text-slate-700 tracking-wide">by Jewar International Technologies</span>
            <span className="w-8 sm:w-12 h-[1px] bg-slate-300" />
          </div>
        </div>

        {/* Audience Kicker Pill */}
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#FAF0F4] border border-[#F3D2DF] text-brand-900 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase mb-3 shadow-xs">
          FOR IT SUPPORT BUSINESSES &amp; GROWING MSPS
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl font-display mb-3">
          Your Clients Shouldn&apos;t Have to Chase You for{' '}
          <span className="text-[#8B0032] inline-block">
            IT Support Updates.
          </span>
        </h2>

        {/* Subheadline / Description */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-xl sm:max-w-2xl mb-1 sm:mb-2">
          Give your IT business its own branded mobile app and customer web portal—so clients can request help, approve quotes, make payments, and track progress, all under your business name.
        </p>

        {/* Enlarged, Brighter, High-Definition 3D Visual Graphic */}
        <HeroHdVisual />

        {/* Primary CTA Area: Rich Glowing Ruby Button & Pricing */}
        <div className="flex flex-col items-center text-center mt-2 mb-8 sm:mb-10 w-full max-w-md">
          
          {/* Glossy Rich Glowing Pill Button */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 sm:px-9 py-3 sm:py-3.5 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer bg-gradient-to-r from-[#990036] via-[#B80045] to-[#7A0026] hover:from-[#AA003D] hover:via-[#C8004E] hover:to-[#8B0032] shadow-[0_10px_28px_rgba(153,0,54,0.42)] active:scale-[0.98] border-t border-white/35 transition-all duration-200"
          >
            <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5 text-white" />
            </div>
            <span>Book Your Free Personalized Demo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Pricing Details Below CTA */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3.5 text-slate-800 font-bold">
            <span className="w-6 sm:w-10 h-[1.5px] bg-slate-300" />
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="px-3 py-1 rounded-full bg-[#52001A] text-white text-[10px] sm:text-[11px] font-extrabold shadow-xs">
                $400 One-Time Setup
              </span>
              <span className="text-slate-400 font-bold text-xs">+</span>
              <span className="px-3 py-1 rounded-full bg-[#52001A] text-white text-[10px] sm:text-[11px] font-extrabold shadow-xs">
                $200 / Month
              </span>
            </div>

            <span className="w-6 sm:w-10 h-[1.5px] bg-slate-300" />
          </div>

          {/* Micro-copy Note */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] sm:text-[11px] text-slate-500 font-medium">
            <Info className="w-3.5 h-3.5 text-[#8B0032] shrink-0" />
            <span>See the customer experience and owner dashboard in action. No obligation.</span>
          </div>
        </div>

      </div>

      {/* Bottom Ribbon Wave */}
      <div className="relative w-full bg-gradient-to-r from-[#4A0016] via-[#6B0024] to-[#4A0016] text-white py-2.5 sm:py-3 px-4 shadow-inner">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold tracking-wide text-center">
          <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-pink-300">
            <Users className="w-2.5 h-2.5" />
          </div>
          <span>Your Brand. Your Customers. One Connected Support Experience.</span>
        </div>
      </div>

    </section>
  );
};
