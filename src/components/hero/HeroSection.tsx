'use client';

import React from 'react';
import Image from 'next/image';
import { HeroHdVisual } from './HeroHdVisual';
import { Calendar, ArrowRight, Users } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] pt-6 sm:pt-8 pb-0 text-slate-900">
      
      {/* Background Decor: Rich 3D Organic Satin Ribbon in Upper-Left - Savage Obsidian & Electric Cobalt */}
      <div className="absolute -top-12 -left-12 w-[180px] sm:w-[280px] h-[170px] sm:h-[260px] pointer-events-none select-none overflow-hidden z-0 opacity-80">
        <svg viewBox="0 0 350 320" fill="none" className="w-full h-full">
          <path
            d="M-30 -30 C120 40, 180 180, 40 260 C-20 290, -70 200, -80 140 Z"
            fill="url(#satinRibbon1)"
          />
          <path
            d="M-50 -10 C90 80, 150 140, 240 70 C270 40, 220 -20, 180 -40 Z"
            fill="url(#satinRibbon2)"
            opacity="0.85"
          />
          <defs>
            <linearGradient id="satinRibbon1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="50%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="satinRibbon2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Background Decor: Dot Grids on Far Top-Right */}
      <div className="absolute top-4 right-4 sm:right-10 w-20 h-20 bg-dots opacity-40 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Official Brand Header (Headset Agent Emblem + JIT HELPDESK + Byline) */}
        <div className="flex flex-col items-center mb-3 sm:mb-4">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            {/* Poster Exact Agent Headset Emblem */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center drop-shadow-sm hover:scale-105 transition-transform">
              <Image
                src="/brand/jit_headset_emblem_transparent.png"
                alt="JIT Helpdesk Logo Emblem"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 font-display">
              JIT HELPDESK
            </h1>
          </div>

          {/* Subtitle Byline with Thin Elegant Dividers */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1 text-[11px] sm:text-xs text-slate-500 font-medium">
            <span className="w-8 sm:w-14 h-[1px] bg-slate-300" />
            <span className="font-bold text-slate-700 tracking-wide">by Jewar International Technologies</span>
            <span className="w-8 sm:w-14 h-[1px] bg-slate-300" />
          </div>
        </div>

        {/* Audience Kicker Pill */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-[10px] sm:text-[11px] font-black tracking-wider uppercase mb-3 shadow-2xs">
          FOR IT SUPPORT BUSINESSES &amp; GROWING MSPS
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl font-display mb-3">
          Your Clients Shouldn&apos;t Have to Chase You for{' '}
          <span className="text-blue-600 inline-block">
            IT Support Updates.
          </span>
        </h2>

        {/* Subheadline / Description */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-xl sm:max-w-2xl mb-1 sm:mb-2">
          Give your IT business its own branded mobile app and customer web portal—so clients can request help, approve quotes, make payments, and track progress, all under your business name.
        </p>

        {/* Ultra-Crisp Transparent 3D Showcase Image */}
        <HeroHdVisual />

        {/* Primary CTA Area: Glowing Electric Cobalt Pill Button & Pricing */}
        <div className="flex flex-col items-center text-center mt-3 mb-8 sm:mb-10 w-full max-w-lg">
          
          {/* Glowing Electric Cobalt Capsule Button */}
          <button
            onClick={onOpenBooking}
            className="poster-glow-btn w-full sm:w-auto px-8 sm:px-11 py-3.5 sm:py-4 rounded-full text-white font-black text-xs sm:text-sm flex items-center justify-center gap-3 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
              <Calendar className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </div>
            <span className="tracking-wide text-white drop-shadow-sm font-extrabold text-[13px] sm:text-[15px]">
              Book Your Free Personalized Demo
            </span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
          </button>

          {/* Pricing Details Below CTA */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 text-slate-800 font-bold">
            <span className="w-8 sm:w-16 h-[1.5px] bg-slate-300" />
            
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full bg-[#0F172A] text-white text-[11px] sm:text-xs font-black tracking-wide shadow-md border border-slate-700">
                $400 One-Time Setup
              </span>
              <span className="text-slate-500 font-black text-sm">+</span>
              <span className="px-4 py-1.5 rounded-full bg-[#0F172A] text-white text-[11px] sm:text-xs font-black tracking-wide shadow-md border border-slate-700">
                $200 / Month
              </span>
            </div>

            <span className="w-8 sm:w-16 h-[1.5px] bg-slate-300" />
          </div>

          {/* Micro-copy Info Note with Circular Icon */}
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] sm:text-xs text-slate-600 font-medium">
            <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-black">
              i
            </div>
            <span>See the customer experience and owner dashboard in action. No obligation.</span>
          </div>
        </div>

      </div>

      {/* Bottom Ribbon Wave Banner */}
      <div className="relative w-full bg-gradient-to-r from-[#0B0F19] via-[#0F172A] to-[#0B0F19] text-white py-3 sm:py-3.5 px-4 shadow-inner">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-1.5 text-[11px] sm:text-xs font-extrabold tracking-wide text-center">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 mb-0.5">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span className="tracking-wide text-slate-200 font-bold">
            Your Brand. Your Customers. One Connected Support Experience.
          </span>
        </div>
      </div>

    </section>
  );
};
