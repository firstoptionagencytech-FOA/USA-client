'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeroHdVisual } from './HeroHdVisual';
import { Calendar, ArrowRight, Users, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [headlineAngle, setHeadlineAngle] = useState<'default' | 'fear' | 'loyalty' | 'notify'>('default');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const angleParam = (params.get('angle') || params.get('utm_angle') || params.get('utm_campaign') || '').toLowerCase();
      if (angleParam.includes('fear') || angleParam.includes('switch') || angleParam.includes('competitor')) {
        setHeadlineAngle('fear');
      } else if (angleParam.includes('loyalty') || angleParam.includes('starbucks') || angleParam.includes('points') || angleParam.includes('reward')) {
        setHeadlineAngle('loyalty');
      } else if (angleParam.includes('notify') || angleParam.includes('doordash') || angleParam.includes('lock') || angleParam.includes('screen')) {
        setHeadlineAngle('notify');
      }
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f6ef] via-[#f1f3ea] to-[#e7ece0] pt-6 sm:pt-8 pb-0 text-[#182c26]">
      
      {/* Background Decor: Rich 3D Organic Satin Ribbon in Upper-Left - Jewar Deskora Midnight Pine & Lime */}
      <div className="absolute -top-12 -left-12 w-[180px] sm:w-[280px] h-[170px] sm:h-[260px] pointer-events-none select-none overflow-hidden z-0 opacity-80">
        <svg viewBox="0 0 350 320" fill="none" className="w-full h-full">
          <path
            d="M-30 -30 C120 40, 180 180, 40 260 C-20 290, -70 200, -80 140 Z"
            fill="url(#jewarSatin1)"
          />
          <path
            d="M-50 -10 C90 80, 150 140, 240 70 C270 40, 220 -20, 180 -40 Z"
            fill="url(#jewarSatin2)"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="jewarSatin1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#274c3b" />
              <stop offset="50%" stopColor="#182c26" />
              <stop offset="100%" stopColor="#0b1512" />
            </linearGradient>
            <linearGradient id="jewarSatin2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d2f56d" />
              <stop offset="50%" stopColor="#6d883e" />
              <stop offset="100%" stopColor="#274c3b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Background Decor: Dot Grids on Far Top-Right */}
      <div className="absolute top-4 right-4 sm:right-10 w-24 h-24 bg-dots opacity-50 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Official Brand Header (Headset Agent Emblem + JIT HELPDESK + Byline) */}
        <div className="flex flex-col items-center mb-3 sm:mb-4">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            {/* Official Jewar Emblem */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center drop-shadow-md hover:scale-105 transition-transform duration-300">
              <Image unoptimized
                src="/brand/jewar_emblem.png"
                alt="Jewar International Technologies Emblem"
                width={56}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#182c26] font-display">
              JIT HELPDESK
            </h1>
          </div>

          {/* Subtitle Byline with Thin Elegant Dividers */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1 text-[11px] sm:text-xs text-[#61705f] font-medium">
            <span className="w-8 sm:w-14 h-[1px] bg-[#dce3d4]" />
            <span className="font-bold text-[#274c3b] tracking-wide">by Jewar International Technologies</span>
            <span className="w-8 sm:w-14 h-[1px] bg-[#dce3d4]" />
          </div>
        </div>

        {/* Live Audience Kicker Pill with Pulsing Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#182c26] text-[#d2f56d] text-[10px] sm:text-[11px] font-black tracking-wider uppercase mb-3.5 shadow-sm border border-[#d2f56d]/30">
          <span className="w-2 h-2 rounded-full bg-[#d2f56d] live-indicator" />
          <span>FOR IT SUPPORT BUSINESSES &amp; GROWING MSPS</span>
        </div>

        {/* Main Headline (Ad-Aligned Dynamic UTM) */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold text-[#182c26] tracking-tight leading-[1.15] max-w-3xl font-display mb-3">
          {headlineAngle === 'fear' && (
            <>
              Your clients see other IT companies&apos; ads every week.{' '}
              <span className="text-[#274c3b] inline-block decoration-[#d2f56d] underline decoration-4 underline-offset-4">
                Give them a reason to stay.
              </span>
            </>
          )}
          {headlineAngle === 'loyalty' && (
            <>
              Your clients collect points at Starbucks.{' '}
              <span className="text-[#274c3b] inline-block decoration-[#d2f56d] underline decoration-4 underline-offset-4">
                Now they can collect them with you.
              </span>
            </>
          )}
          {headlineAngle === 'notify' && (
            <>
              Show up on your clients&apos; lock screen,{' '}
              <span className="text-[#274c3b] inline-block decoration-[#d2f56d] underline decoration-4 underline-offset-4">
                just like DoorDash and Amazon.
              </span>
            </>
          )}
          {headlineAngle === 'default' && (
            <>
              The branded app that keeps your IT clients{' '}
              <span className="text-[#274c3b] inline-block decoration-[#d2f56d] underline decoration-4 underline-offset-4">
                coming back to you.
              </span>
            </>
          )}
        </h2>

        {/* Subheadline / Description */}
        <p className="text-xs sm:text-sm md:text-base text-[#61705f] font-normal leading-relaxed max-w-xl sm:max-w-2xl mb-1 sm:mb-2">
          Your own iOS and Android app and web portal, with your name and logo. Loyalty rewards and notifications keep clients with you, not your competitors.
        </p>

        {/* Ultra-Crisp Transparent 3D Showcase Image */}
        <HeroHdVisual />

        {/* Primary CTA Area: Glowing Jewar Deskora Pill Button & Pricing */}
        <div className="flex flex-col items-center text-center mt-3 mb-8 sm:mb-10 w-full max-w-lg">
          
          {/* Glowing Jewar Deskora Capsule Button matching Ad CTA */}
          <button
            onClick={onOpenBooking}
            className="poster-glow-btn w-full sm:w-auto px-8 sm:px-11 py-3.5 sm:py-4 rounded-full text-white font-black text-xs sm:text-sm flex items-center justify-center gap-3 cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-lg bg-[#d2f56d]/20 border border-[#d2f56d]/40 flex items-center justify-center shrink-0 shadow-inner">
              <Calendar className="w-3.5 h-3.5 text-[#d2f56d] stroke-[2.5]" />
            </div>
            <span className="tracking-wide text-white drop-shadow-sm font-extrabold text-[13px] sm:text-[15px]">
              Book a demo. See the app with your logo on it.
            </span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#d2f56d] transition-transform group-hover:translate-x-1" />
          </button>

          {/* Pricing Details Below CTA */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 text-[#182c26] font-bold">
            <span className="w-8 sm:w-16 h-[1.5px] bg-[#dce3d4]" />
            
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full bg-[#182c26] text-[#d2f56d] text-[11px] sm:text-xs font-black tracking-wide shadow-md border border-[#d2f56d]/30">
                $400 One-Time Setup
              </span>
              <span className="text-[#61705f] font-black text-sm">+</span>
              <span className="px-4 py-1.5 rounded-full bg-[#182c26] text-[#d2f56d] text-[11px] sm:text-xs font-black tracking-wide shadow-md border border-[#d2f56d]/30">
                $200 / Month
              </span>
            </div>

            <span className="w-8 sm:w-16 h-[1.5px] bg-[#dce3d4]" />
          </div>

          {/* 3 High-Authority Badges: iOS & Android app, Your logo & domain, No long-term lock-in */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 w-full max-w-md">
            {[
              { label: 'iOS & Android app', desc: 'Native Mobile Apps' },
              { label: 'Your logo & domain', desc: '100% White-Label' },
              { label: 'No long-term lock-in', desc: 'Cancel Anytime' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-2 sm:p-2.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:-translate-y-0.5 transition-all text-center cursor-default group"
              >
                <div className="text-[11px] font-black text-[#182c26] group-hover:text-[#274c3b] transition-colors leading-tight">
                  {item.label}
                </div>
                <div className="text-[9px] text-[#61705f] font-medium mt-0.5">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Micro-copy Info Note with Circular Icon */}
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] sm:text-xs text-[#61705f] font-medium">
            <div className="w-4 h-4 rounded-full bg-[#274c3b] text-[#d2f56d] flex items-center justify-center shrink-0 text-[10px] font-black">
              i
            </div>
            <span>See the customer experience and owner dashboard in action. No obligation.</span>
          </div>
        </div>

      </div>

      {/* Bottom Ribbon Wave Banner */}
      <div className="relative w-full bg-gradient-to-r from-[#11201b] via-[#182c26] to-[#11201b] text-white py-3.5 px-4 shadow-inner border-t border-[#d2f56d]/20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] sm:text-xs font-extrabold tracking-wide text-center">
          <div className="w-6 h-6 rounded-full bg-[#d2f56d]/20 border border-[#d2f56d]/40 flex items-center justify-center text-[#d2f56d] shrink-0">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span className="tracking-wide text-[#edf3e3] font-bold">
            Your Brand. Your Customers. One Connected Support Experience.
          </span>
          <span className="hidden sm:inline-block text-[#d2f56d]/40">·</span>
          <span className="text-[#d2f56d] font-bold">Alexandria, Virginia MSP Delivery</span>
        </div>
      </div>

    </section>
  );
};
