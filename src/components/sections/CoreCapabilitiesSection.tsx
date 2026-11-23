'use client';

import React from 'react';
import { Zap, FileCheck2, CreditCard, TrendingUp, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CoreCapabilitiesSectionProps {
  onOpenBooking: () => void;
}

export const CoreCapabilitiesSection: React.FC<CoreCapabilitiesSectionProps> = ({ onOpenBooking }) => {
  const capabilities = [
    {
      id: 'requests',
      icon: Zap,
      badge: 'Self-Service',
      title: 'Customer Requests',
      subtitle: 'Submit & Follow Progress',
      description: 'Let customers submit service requests with photo attachments and follow resolution status in real time.',
      snippetLabel: 'Ticket #4109',
      snippetStatus: 'In Progress · Assigned',
      accentGlow: 'from-[#d2f56d]/35 via-[#274c3b]/20 to-transparent',
    },
    {
      id: 'quotes',
      icon: FileCheck2,
      badge: '1-Click Sign-Off',
      title: 'Quotes & Approvals',
      subtitle: 'Review & Revise Online',
      description: 'Review, revise, and approve service scopes and hardware orders with frictionless digital approvals.',
      snippetLabel: 'Scope #824 · $1,250',
      snippetStatus: 'Approved ✓',
      accentGlow: 'from-[#274c3b]/40 via-[#d2f56d]/20 to-transparent',
    },
    {
      id: 'payments',
      icon: CreditCard,
      badge: 'Integrated Billing',
      title: 'Payments & Credits',
      subtitle: 'Prompt Settlements',
      description: 'Support configured payment workflows via Stripe and allow clients to redeem eligible service credits.',
      snippetLabel: 'Invoice #1048 · $450',
      snippetStatus: 'Settled Instant',
      accentGlow: 'from-[#d2f56d]/35 via-[#274c3b]/20 to-transparent',
    },
    {
      id: 'meetings',
      icon: TrendingUp,
      badge: 'Sync & Records',
      title: 'Meetings & Devices',
      subtitle: 'Organized Scheduling',
      description: 'Keep scheduled service activity, calendar appointments, and customer hardware device records organized.',
      snippetLabel: 'Scheduled Demo',
      snippetStatus: 'Synced to Calendar',
      accentGlow: 'from-[#274c3b]/40 via-[#d2f56d]/20 to-transparent',
    },
    {
      id: 'loyalty',
      icon: Star,
      badge: 'Client Retention',
      title: 'Loyalty & Referrals',
      subtitle: 'Reward Repeat Clients',
      description: 'Manage reward earning rules, referral activity, and related customer benefits that keep clients coming back.',
      snippetLabel: '450 Loyalty Points',
      snippetStatus: 'Active Reward',
      accentGlow: 'from-[#d2f56d]/40 via-[#274c3b]/25 to-transparent',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-white via-[#f6f6ef] to-white relative overflow-hidden border-y border-[#dce3d4]/70" id="capabilities">
      
      {/* Background Soft Emerald Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[#d2f56d]/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#182c26] text-[#d2f56d] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border border-[#d2f56d]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#d2f56d]" />
            <span>Five Core Capabilities</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Everything Your IT Business Needs.{' '}
            <span className="text-[#274c3b] inline-block decoration-[#d2f56d] underline decoration-4 underline-offset-4">
              Connected Under Your Brand.
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#61705f] leading-relaxed max-w-2xl mx-auto">
            Give customers an executive-grade support experience while keeping all service requests, quotes, payments, scheduling, and rewards in one organized system.
          </p>
        </div>

        {/* 5 Cards Responsive Grid with Enhanced Corner Ambient Glow & 3D Vibrant Gradient Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {capabilities.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={onOpenBooking}
                className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.22)] hover:-translate-y-2 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Amplified Corner Ambient Glow (More pronounced & luscious) */}
                <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${item.accentGlow} rounded-full blur-2xl group-hover:scale-130 group-hover:opacity-100 opacity-80 transition-all duration-500 pointer-events-none`} />

                <div>
                  {/* Top Bar: 3D Vibrant Tech Gradient Badge & Micro Pill */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    {/* Vibrant Lime-to-Pine 3D Shield Badge */}
                    <div className="relative w-13 h-13 rounded-2xl bg-gradient-to-br from-[#d2f56d] via-[#274c3b] to-[#182c26] p-0.5 shadow-md border-2 border-white/70 group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300 flex items-center justify-center">
                      <div className="w-full h-full rounded-[14px] flex items-center justify-center bg-gradient-to-br from-transparent to-[#182c26]/30 shadow-inner">
                        <IconComponent className="w-6 h-6 stroke-[2.4] text-[#d2f56d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
                      </div>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4] group-hover:bg-[#182c26] group-hover:text-[#d2f56d] group-hover:border-[#d2f56d]/40 transition-colors shadow-2xs">
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
                <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
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
