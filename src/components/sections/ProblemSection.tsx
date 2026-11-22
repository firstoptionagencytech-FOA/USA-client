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
  Check,
  FileCheck2,
  CreditCard
} from 'lucide-react';

interface ProblemSectionProps {
  onOpenBooking: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-[#edf3e3] rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#274c3b]" />
            <span>The MSP Customer Experience Gap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182c26] tracking-tight font-display mb-4">
            Great IT Support Shouldn&apos;t Feel Disorganized.
          </h2>
          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            You may be excellent at fixing technical problems. But when customers can&apos;t see what&apos;s happening, even great service can feel frustrating. Sound familiar?
          </p>
        </div>

        {/* 3 Rich Visual Problem Cards - Matched to Ad Angles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Ad 1 - They See Competitors' Ads Every Week (Switching Risk) */}
          <div className="group rounded-3xl p-6 sm:p-8 bg-[#f6f6ef] border border-[#dce3d4] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 hover:border-[#274c3b] hover:bg-white transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquareOff className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  Switching Risk
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#182c26] mb-1 italic">
                “I keep seeing ads for other IT firms.”
              </h3>
              
              <h4 className="text-sm font-extrabold text-[#274c3b] mb-2">
                They See Competitors&apos; Ads Every Week
              </h4>

              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Your clients are constantly targeted on social media and Google by competing MSPs promising faster support and lower rates. When you&apos;re just an invisible email address, switching feels easy.
              </p>

              {/* Visual Interactive UI Snippet */}
              <div className="my-4 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs space-y-2">
                <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50 border border-rose-200/60 text-[10px] text-rose-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    Competitor MSP Sponsored Ad Seen
                  </span>
                  <span className="text-rose-600 uppercase text-[9px]">High Risk</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#edf3e3] border border-[#dce3d4] text-[10px] text-[#274c3b] font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#274c3b] shrink-0" />
                    Your Branded App on Home Screen
                  </span>
                  <span className="text-[#274c3b] bg-white px-1.5 py-0.5 rounded text-[9px] shadow-2xs">Locked In</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] group-hover:border-[#274c3b]/30 transition-colors">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                <span>With JIT Helpdesk:</span>
              </div>
              <p className="text-xs text-[#182c26] font-medium leading-normal">
                Give them your own branded iOS and Android app on their home screen so your business stays top-of-mind every single day.
              </p>
            </div>
          </div>

          {/* Card 2: Ad 2 - Cheaper Shops Pull Them Away (No Loyalty) */}
          <div className="group rounded-3xl p-6 sm:p-8 bg-[#f6f6ef] border border-[#dce3d4] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 hover:border-[#274c3b] hover:bg-white transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <FileCheck2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Commodity Trap
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#182c26] mb-1 italic">
                “Can you match this cheaper rate?”
              </h3>
              
              <h4 className="text-sm font-extrabold text-[#274c3b] mb-2">
                Cheaper Shops Pull Them Away
              </h4>

              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Without a loyalty program, clients treat IT support like a generic commodity. If a discount competitor pitches them 20% lower, you&apos;re forced into a painful race to the bottom.
              </p>

              {/* Visual Interactive UI Snippet */}
              <div className="my-4 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#182c26]">
                  <span>Client Loyalty Coins Balance</span>
                  <span className="text-[#274c3b] font-black">450 Coins ($50 Value)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#182c26] text-[#d2f56d] text-[10px] font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d2f56d] shrink-0" />
                    Points Earned on Retainer
                  </span>
                  <span className="bg-[#274c3b] text-white px-2 py-0.5 rounded text-[9px]">Like Starbucks</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] group-hover:border-[#274c3b]/30 transition-colors">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                <span>With JIT Helpdesk:</span>
              </div>
              <p className="text-xs text-[#182c26] font-medium leading-normal">
                Reward clients with loyalty points and referral credits. Leaving your business means abandoning their earned rewards.
              </p>
            </div>
          </div>

          {/* Card 3: Ad 3 - Your Emails Sit Unread (No Direct Reach) */}
          <div className="group rounded-3xl p-6 sm:p-8 bg-[#f6f6ef] border border-[#dce3d4] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 hover:border-[#274c3b] hover:bg-white transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Zero Lock-Screen Reach
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#182c26] mb-1 italic">
                “I never saw that email update.”
              </h3>
              
              <h4 className="text-sm font-extrabold text-[#274c3b] mb-2">
                Your Emails Sit Unread
              </h4>

              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Critical service updates, urgent security advisories, and quote approvals drown in crowded client inboxes. You spend hours playing phone tag chasing simple responses.
              </p>

              {/* Visual Interactive UI Snippet */}
              <div className="my-4 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#182c26]">
                  <span>Push Notification Sent</span>
                  <span className="text-[#274c3b] font-black">Instant 98% Open</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Lock-Screen Alert Delivered
                  </span>
                  <span className="text-emerald-700 bg-white px-1.5 py-0.5 rounded text-[9px] shadow-2xs">DoorDash Style</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] group-hover:border-[#274c3b]/30 transition-colors">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                <span>With JIT Helpdesk:</span>
              </div>
              <p className="text-xs text-[#182c26] font-medium leading-normal">
                Show up right on your clients&apos; lock screens with real-time push notifications, just like Amazon and DoorDash.
              </p>
            </div>
          </div>

        </div>

        {/* Transition Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#11201b] via-[#182c26] to-[#274c3b] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#d2f56d]/30">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Your technical skills aren&apos;t the problem.
            </h3>
            <p className="text-sm text-[#edf3e3]/90 mt-1 max-w-xl">
              Your customer experience needs a better system. That&apos;s where JIT Helpdesk comes in.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="poster-glow-btn px-6 sm:px-7 py-3 rounded-full text-white font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 cursor-pointer shadow-md hover:shadow-lg transition-all group"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4 text-[#d2f56d] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
