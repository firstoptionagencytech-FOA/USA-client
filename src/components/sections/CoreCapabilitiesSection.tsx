'use client';

import React from 'react';
import { Zap, FileCheck2, CreditCard, TrendingUp, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CoreCapabilitiesSectionProps {
  onOpenBooking: () => void;
}

export const CoreCapabilitiesSection: React.FC<CoreCapabilitiesSectionProps> = ({ onOpenBooking }) => {
  const capabilities = [
    {
      id: 'support',
      icon: Zap,
      badge: 'Sub-2 Min Dispatch',
      title: 'Instant Support Requests',
      subtitle: 'Mobile & Web Submission',
      description: 'Clients submit tickets with 1-tap photo uploads and device diagnostics directly from their smartphone or browser.',
      snippetLabel: 'Ticket #4109',
      snippetStatus: 'Assigned · < 2m',
      accentGlow: 'from-[#d2f56d]/20 to-transparent',
    },
    {
      id: 'quotes',
      icon: FileCheck2,
      badge: '1-Click Sign-Off',
      title: 'Approve Quotes Online',
      subtitle: 'Zero Email Ping-Pong',
      description: 'Hardware upgrades, project scopes, and out-of-scope labor approved with immediate digital signatures.',
      snippetLabel: 'Scope #824 · $1,250',
      snippetStatus: 'Approved ✓',
      accentGlow: 'from-[#274c3b]/30 to-transparent',
    },
    {
      id: 'payments',
      icon: CreditCard,
      badge: 'Stripe & Apple Pay',
      title: 'Secure Client Payments',
      subtitle: 'Instant Cash Flow',
      description: 'Integrated checkout allows clients to pay monthly retainers and project invoices in seconds via mobile wallet.',
      snippetLabel: 'Invoice #1048 · $450',
      snippetStatus: 'Settled Instant',
      accentGlow: 'from-[#d2f56d]/20 to-transparent',
    },
    {
      id: 'tracking',
      icon: TrendingUp,
      badge: 'Live SLA Stepper',
      title: 'Real-Time Job Tracking',
      subtitle: 'No "Where Is My Tech?" Calls',
      description: 'Clients watch ticket progression across stages (Triage → Diagnostic → Resolved) with zero phone tag.',
      snippetLabel: 'Tech En Route',
      snippetStatus: 'ETA: 14 mins',
      accentGlow: 'from-[#274c3b]/30 to-transparent',
    },
    {
      id: 'portal',
      icon: Star,
      badge: '100% White-Label',
      title: 'Your Brand, Your Portal',
      subtitle: 'Custom Subdomain & App Store',
      description: 'Your business name, your logo, your colors. Clients see you as an elite infrastructure MSP, not a freelancer.',
      snippetLabel: 'support.yourmsp.com',
      snippetStatus: 'SSL Active',
      accentGlow: 'from-[#d2f56d]/25 to-transparent',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-white via-[#f6f6ef] to-white relative overflow-hidden border-y border-[#dce3d4]/70">
      
      {/* Background Soft Emerald Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#d2f56d]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#182c26] text-[#d2f56d] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border border-[#d2f56d]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#d2f56d]" />
            <span>5 Core Capabilities Delivered Under Your Brand</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Everything Your Clients Need.{' '}
            <span className="text-[#274c3b] inline-block decoration-[#d2f56d] underline decoration-4 underline-offset-4">
              None of the Headaches.
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#61705f] leading-relaxed max-w-2xl mx-auto">
            Give customers an executive-grade support experience while freeing your technicians to focus on billable resolution instead of answering update calls.
          </p>
        </div>

        {/* 5 Cards Responsive Grid: 5 columns on xl, 2-3 cols on tablet, clean stack/carousel on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {capabilities.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={onOpenBooking}
                className="group cursor-pointer bg-white rounded-3xl p-6 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.2)] hover:-translate-y-2 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Subtle Ambient Corner Glow */}
                <div className={`absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br ${item.accentGlow} rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`} />

                <div>
                  {/* Top Bar: 3D Vector Icon Badge & Micro Pill */}
                  <div className="flex items-center justify-between mb-5">
                    {/* High-Tech 3D Glass Badge in Midnight Pine & Lime */}
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#11201b] via-[#182c26] to-[#274c3b] p-3 text-[#d2f56d] border border-[#d2f56d]/30 shadow-md group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 stroke-[2.2] group-hover:animate-pulse" />
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4] group-hover:bg-[#182c26] group-hover:text-[#d2f56d] group-hover:border-[#d2f56d]/40 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  {/* Subtitle / Kicker */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-1">
                    {item.subtitle}
                  </div>

                  {/* Main Title */}
                  <h3 className="text-base sm:text-lg font-black text-[#182c26] tracking-tight leading-snug mb-2.5 group-hover:text-[#274c3b] transition-colors font-display">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#61705f] leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Embedded Live UI Snippet (Dark Pine Glass) */}
                <div className="mt-auto pt-3 border-t border-slate-100">
                  <div className="bg-[#11201b] rounded-xl p-2.5 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3] truncate max-w-[130px]">
                      {item.snippetLabel}
                    </span>
                    <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                      {item.snippetStatus}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Micro-CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-[#182c26] hover:text-[#274c3b] transition-colors group cursor-pointer"
          >
            <span className="underline decoration-[#d2f56d] decoration-2 underline-offset-4">
              See how all 5 capabilities deploy under your company name in 48 hours
            </span>
            <ArrowRight className="w-4 h-4 text-[#274c3b] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
