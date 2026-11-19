'use client';

import React from 'react';
import { PhoneMockup } from './PhoneMockup';
import { LaptopMockup } from './LaptopMockup';
import { FeaturePills } from './FeaturePills';
import { Calendar, ArrowRight, CheckCircle2, Info, Users, Headphones } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FCF7FA] via-[#FAF3F6] to-[#F5ECF0] pt-6 sm:pt-8 pb-0 text-slate-900">
      
      {/* Background Decor 1: Organic Wavy Maroon Ribbons on Top-Left */}
      <div className="absolute top-0 left-0 w-[240px] sm:w-[380px] h-[220px] sm:h-[320px] pointer-events-none select-none overflow-hidden z-0 opacity-90">
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

      {/* Background Decor 2: Dot Grids on Top-Right & Bottom-Left */}
      <div className="absolute top-8 right-6 sm:right-12 w-28 h-28 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-48 left-4 w-24 h-24 bg-dots opacity-35 pointer-events-none hidden md:block" />

      {/* Header Container: Logo + Wordmark */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2.5">
            {/* Blue & Cyan Headset Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#1E56A0] via-[#0081C9] to-[#5BC0F8] flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Headphones className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-brand-900 font-display">
              JIT HELPDESK
            </h1>
          </div>

          {/* Sub-tag with divider lines */}
          <div className="flex items-center gap-3 mt-1 text-[11px] sm:text-xs text-slate-500 font-medium">
            <span className="w-8 sm:w-14 h-[1px] bg-slate-300/80" />
            <span>by Jewar International Technologies</span>
            <span className="w-8 sm:w-14 h-[1px] bg-slate-300/80" />
          </div>
        </div>

        {/* Audience Kicker Pill */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FAF0F4] border border-[#F3D2DF] text-brand-800 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-5 sm:mb-6 shadow-xs">
          FOR IT SUPPORT BUSINESSES & GROWING MSPS
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.12] max-w-4xl font-display mb-4 sm:mb-5">
          Your Clients Shouldn&apos;t Have to Chase You for{' '}
          <span className="text-brand-700 inline-block">
            IT Support Updates.
          </span>
        </h2>

        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl sm:max-w-3xl mb-8 sm:mb-10">
          Give your IT business its own branded mobile app and customer web portal—so clients can request help, approve quotes, make payments, and track progress, all under your business name.
        </p>

      </div>

      {/* Main Dual Device Presentation Stage */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Device showcase with phone on left and laptop on right */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 pt-2 pb-4">
          
          {/* Left: iPhone Mockup */}
          <div className="z-10 lg:-mr-8 transform lg:hover:scale-[1.01] transition-transform duration-300">
            <PhoneMockup />
          </div>

          {/* Right: Laptop Mockup */}
          <div className="w-full max-w-[560px] lg:max-w-[620px] transform lg:hover:scale-[1.01] transition-transform duration-300">
            <LaptopMockup />
          </div>

          {/* Floating Vertical Feature Badges on Far Right (Desktop & Tablet) */}
          <div className="hidden xl:flex flex-col gap-2.5 absolute right-0 top-1/2 -translate-y-1/2 z-20">
            {[
              'Branded App',
              'Client Portal',
              'Smart Dashboard',
              'Secure & Reliable',
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-pink-200/80 shadow-card-soft text-xs font-bold text-slate-800"
              >
                <div className="w-4 h-4 rounded-full bg-brand-700 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>

        </div>

        {/* 5 Feature Cards Row */}
        <FeaturePills onSelect={onOpenBooking} />

        {/* Primary CTA Area */}
        <div className="flex flex-col items-center text-center mt-4 mb-10">
          
          {/* Big Glowing Maroon CTA Button */}
          <button
            onClick={onOpenBooking}
            className="cta-glow-btn group px-8 sm:px-10 py-4 sm:py-4.5 rounded-full text-white font-extrabold text-base sm:text-lg flex items-center gap-3 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span>Book Your Free Personalized Demo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Pricing Details Below CTA */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 text-slate-800 font-bold">
            <span className="w-10 sm:w-16 h-[1.5px] bg-slate-300" />
            
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-800 text-white text-xs sm:text-sm font-bold shadow-xs">
                $400 One-Time Setup
              </span>
              <span className="text-slate-400 font-light">+</span>
              <span className="px-3 py-1 rounded-full bg-brand-800 text-white text-xs sm:text-sm font-bold shadow-xs">
                $200 / Month
              </span>
            </div>

            <span className="w-10 sm:w-16 h-[1.5px] bg-slate-300" />
          </div>

          {/* Micro-copy Note */}
          <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500 font-medium">
            <Info className="w-3.5 h-3.5 text-brand-700" />
            <span>See the customer experience and owner dashboard in action. No obligation.</span>
          </div>

        </div>

      </div>

      {/* Bottom Ribbon Wave: Matching A4 Footer Ribbon */}
      <div className="relative w-full bg-gradient-to-r from-[#4A0016] via-[#6B0024] to-[#4A0016] text-white py-4 px-4 shadow-inner">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold tracking-wide text-center">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-pink-300">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span>Your Brand. Your Customers. One Connected Support Experience.</span>
        </div>
      </div>

    </section>
  );
};
