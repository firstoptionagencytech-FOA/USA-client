'use client';

import React from 'react';
import {
  MessageSquareOff,
  HelpCircle,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ShieldAlert,
  Users
} from 'lucide-react';

interface ProblemSectionProps {
  onOpenBooking: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking }) => {
  const problems = [
    {
      id: 'switching',
      quote: '“They see competitors’ ads every week.”',
      subtitle: 'SWITCHING RISK',
      title: 'Invisible in Their Everyday Workflow',
      badge: 'Switching Risk',
      accentGlow: 'from-rose-500/20 to-transparent',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
      description:
        'Your clients are constantly targeted by competing IT companies promising lower rates and flashier tools. When you only exist as an invisible email thread, switching to someone else feels effortless.',
      snippetLabel: 'Competitor Ads Target Clients',
      snippetStatus: 'App Prevents Churn',
      icon: MessageSquareOff,
    },
    {
      id: 'loyalty',
      quote: '“Cheaper shops pull them away.”',
      subtitle: 'ZERO RETENTION HOOK',
      title: 'Commodity Price Comparison',
      badge: 'Zero Loyalty',
      accentGlow: 'from-amber-500/20 to-transparent',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
      description:
        'Without a loyalty program or service credits, clients shop around purely on hourly price. Give them points for every paid invoice, exactly like Starbucks, so leaving you means forfeiting real money.',
      snippetLabel: 'Starbucks-Style Points',
      snippetStatus: 'Clients Locked In',
      icon: HelpCircle,
    },
    {
      id: 'direct-reach',
      quote: '“Your emails sit unread.”',
      subtitle: 'NO DIRECT REACH',
      title: 'Lost in Cluttered Inboxes',
      badge: 'Unread Emails',
      accentGlow: 'from-[#d2f56d]/25 to-transparent',
      badgeClass: 'bg-[#edf3e3] text-[#274c3b] border-[#dce3d4]',
      description:
        'Quotes, scopes, and status updates get buried under hundreds of daily spam emails. With your own branded app on their phone, push notifications show up directly on their lock screen like DoorDash.',
      snippetLabel: 'Lock-Screen Push Alerts',
      snippetStatus: '1-Tap Quote Sign-Off',
      icon: Layers,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden" id="gap">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-[#edf3e3] rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#274c3b]" />
            <span>The Customer Experience Gap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Your Competitors Are Fighting for Attention. Give Clients a Reason to Remember You.
          </h2>
          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            When service communication is buried in emails and phone tag, competitors have an opening. Give your clients a modern, branded experience they can see and remember.
          </p>
        </div>

        {/* 3 Rich Visual Problem Cards - Matching the Gradient Card Aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={onOpenBooking}
                className="group cursor-pointer bg-white rounded-3xl p-7 sm:p-8 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.2)] hover:-translate-y-2 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Subtle Ambient Corner Glow */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.accentGlow} rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`} />

                <div>
                  {/* Top Bar: 3D Vector Icon Badge & Micro Pill */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#11201b] via-[#182c26] to-[#274c3b] p-3 text-[#d2f56d] border border-[#d2f56d]/30 shadow-md group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 stroke-[2.2] group-hover:animate-pulse" />
                    </div>

                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Quote Hook */}
                  <div className="text-sm font-bold text-[#182c26] mb-1 italic">
                    {item.quote}
                  </div>

                  {/* Subtitle / Kicker */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-2">
                    {item.subtitle}
                  </div>

                  {/* Main Title */}
                  <h3 className="text-lg font-black text-[#182c26] tracking-tight leading-snug mb-3 group-hover:text-[#274c3b] transition-colors font-display">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Embedded Live UI Snippet (Dark Pine Glass) */}
                <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
                  <div className="bg-[#11201b] rounded-xl p-3 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3] truncate max-w-[150px]">
                      {item.snippetLabel}
                    </span>
                    <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                      {item.snippetStatus}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-[#182c26] hover:text-[#274c3b] transition-colors group cursor-pointer"
          >
            <span className="underline decoration-[#d2f56d] decoration-2 underline-offset-4">
              See how JIT Helpdesk solves all 3 retention challenges — Book a Demo
            </span>
            <ArrowRight className="w-4 h-4 text-[#274c3b] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
