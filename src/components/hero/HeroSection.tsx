'use client';

import React from 'react';
import Image from 'next/image';
import { HeroHdVisual } from './HeroHdVisual';
import {
  Calendar,
  ArrowRight,
  Info,
  Users,
  Zap,
  FileCheck,
  CreditCard,
  TrendingUp,
  Star
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const featureBoxes = [
    {
      icon: Zap,
      label: 'Instant Support Requests',
    },
    {
      icon: FileCheck,
      label: 'Approve Quotes Online',
    },
    {
      icon: CreditCard,
      label: 'Secure Payments',
    },
    {
      icon: TrendingUp,
      label: 'Real-Time Tracking',
    },
    {
      icon: Star,
      label: 'Your Brand, Your Portal',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FCF7FA] via-[#FAF3F6] to-[#F5ECF0] pt-6 sm:pt-8 pb-0 text-slate-900">
      
      {/* Background Decor: Rich 3D Organic Satin Ribbon in Upper-Left (Matching Poster) */}
      <div className="absolute -top-12 -left-12 w-[180px] sm:w-[280px] h-[170px] sm:h-[260px] pointer-events-none select-none overflow-hidden z-0 opacity-90">
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
              <stop offset="0%" stopColor="#9E0A3E" />
              <stop offset="50%" stopColor="#67001F" />
              <stop offset="100%" stopColor="#380010" />
            </linearGradient>
            <linearGradient id="satinRibbon2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF3377" />
              <stop offset="100%" stopColor="#8B0032" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Background Decor: Dot Grids on Far Top-Right */}
      <div className="absolute top-4 right-4 sm:right-10 w-20 h-20 bg-dots opacity-40 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Official Brand Header (Exact A4 Poster Match: Headset Agent Emblem + JIT HELPDESK + Byline) */}
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
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#6F0D34] font-display">
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

        {/* Audience Kicker Pill (Exact A4 Poster Styling) */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EED9E3] border border-[#DEBDCC] text-[#6F0D34] text-[10px] sm:text-[11px] font-black tracking-wider uppercase mb-3 shadow-2xs">
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

        {/* Ultra-Crisp Transparent 3D Showcase Image */}
        <HeroHdVisual />

        {/* 5 Feature Boxes in ONE SINGLE LINE (Exact A4 Poster Match) */}
        <div className="w-full max-w-4xl mx-auto my-4 sm:my-6 px-1">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 md:gap-3.5">
            {featureBoxes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={onOpenBooking}
                  className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3.5 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex flex-col items-center text-center justify-center min-h-[84px] sm:min-h-[96px]"
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-slate-100 group-hover:bg-brand-50 text-[#8B0032] flex items-center justify-center mb-1 sm:mb-1.5 transition-colors shadow-2xs">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.3]" />
                  </div>
                  <span className="text-[8px] sm:text-[11px] md:text-xs font-black text-slate-800 leading-tight tracking-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary CTA Area: Glowing Neon Ruby Pill Button & Pricing */}
        <div className="flex flex-col items-center text-center mt-1 mb-8 sm:mb-10 w-full max-w-lg">
          
          {/* Glowing Neon Ruby Capsule Button (A4 Exact Match) */}
          <button
            onClick={onOpenBooking}
            className="poster-glow-btn w-full sm:w-auto px-8 sm:px-11 py-3.5 sm:py-4 rounded-full text-white font-black text-xs sm:text-sm flex items-center justify-center gap-3 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-white/25 border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
              <Calendar className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </div>
            <span className="tracking-wide text-white drop-shadow-sm font-extrabold text-[13px] sm:text-[15px]">
              Book Your Free Personalized Demo
            </span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
          </button>

          {/* Pricing Details Below CTA (Exact A4 Pills) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 text-slate-800 font-bold">
            <span className="w-8 sm:w-16 h-[1.5px] bg-[#D4A5B8]" />
            
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full bg-[#5E0229] text-white text-[11px] sm:text-xs font-black tracking-wide shadow-md">
                $400 One-Time Setup
              </span>
              <span className="text-slate-500 font-black text-sm">+</span>
              <span className="px-4 py-1.5 rounded-full bg-[#5E0229] text-white text-[11px] sm:text-xs font-black tracking-wide shadow-md">
                $200 / Month
              </span>
            </div>

            <span className="w-8 sm:w-16 h-[1.5px] bg-[#D4A5B8]" />
          </div>

          {/* Micro-copy Info Note with Circular Icon */}
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] sm:text-xs text-slate-600 font-medium">
            <div className="w-4 h-4 rounded-full bg-[#6F0D34] text-white flex items-center justify-center shrink-0 text-[10px] font-black">
              i
            </div>
            <span>See the customer experience and owner dashboard in action. No obligation.</span>
          </div>
        </div>

      </div>

      {/* Bottom Ribbon Wave Banner (Exact A4 Match with 3-People Gold Icon) */}
      <div className="relative w-full bg-gradient-to-r from-[#3B0014] via-[#5C0020] to-[#3B0014] text-white py-3 sm:py-3.5 px-4 shadow-inner">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-1.5 text-[11px] sm:text-xs font-extrabold tracking-wide text-center">
          {/* Symmetrical 3-People Gold Icon */}
          <div className="w-6 h-6 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700] mb-0.5">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span className="tracking-wide text-pink-100 font-bold">
            Your Brand. Your Customers. One Connected Support Experience.
          </span>
        </div>
      </div>

    </section>
  );
};
