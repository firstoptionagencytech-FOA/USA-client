'use client';

import React from 'react';
import Image from 'next/image';
import {
  Smartphone,
  Globe,
  LayoutDashboard,
  Users2,
  Gift,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Lock,
  Sparkles,
  TrendingUp,
  CreditCard,
  Bell,
  Coins
} from 'lucide-react';

interface SolutionSectionProps {
  onOpenBooking: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden" id="solution">
      
      {/* Background Soft Emerald Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#d2f56d]/10 rounded-full blur-3xl opacity-70 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf3e3] border border-[#dce3d4] text-[#274c3b] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#274c3b]" />
            <span>Complete Solution: Loyalty First</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182c26] tracking-tight font-display mb-5">
            More Than an IT Support App. A Reason for Customers to Come Back.
          </h2>
          <p className="text-base sm:text-lg text-[#61705f] leading-relaxed">
            Imagine a customer opening an app with your business name and logo. They can request IT support, collect loyalty rewards, review quotes, approve work, make payments, and follow progress—all in one place. Meanwhile, you manage everything from your owner dashboard.
          </p>
          <p className="text-sm font-semibold text-[#274c3b] mt-3">
            No need to build software from scratch. Meet JIT Helpdesk.
          </p>
        </div>

        {/* 5 Pillar Grid - Styled with the EXACT Signature Gradient Card Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1: Loyalty Rewards & Referral Engine */}
          <div className="group cursor-pointer bg-white rounded-3xl p-7 sm:p-8 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.2)] hover:-translate-y-2 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Subtle Ambient Corner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#274c3b]/30 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#11201b] via-[#182c26] to-[#274c3b] p-3 text-[#d2f56d] border border-[#d2f56d]/30 shadow-md group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300 flex items-center justify-center">
                  <Gift className="w-6 h-6 stroke-[2.2] group-hover:animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4] group-hover:bg-[#182c26] group-hover:text-[#d2f56d] group-hover:border-[#d2f56d]/40 transition-colors shadow-2xs">
                  Starbucks-Style Points
                </span>
              </div>
              
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-1">
                CLIENT RETENTION ENGINE
              </div>

              <h3 className="text-lg font-black text-[#182c26] tracking-tight leading-snug mb-2 group-hover:text-[#274c3b] transition-colors font-display">
                Loyalty Rewards &amp; Referral Program
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Your clients collect points at Starbucks. Now they can collect them with you. Every paid invoice awards service credits, and automated referral links turn happy clients into repeat accounts.
              </p>

              {/* 3D Transparent Loyalty Coins Graphic */}
              <div className="relative w-full h-36 my-2 rounded-2xl bg-[#fafbf7] border border-[#dce3d4] flex items-center justify-center overflow-hidden p-2 group-hover:border-[#274c3b] transition-all">
                <Image
                  src="/brand/3d_loyalty_coins_transparent.png"
                  alt="3D Gold and Emerald Loyalty Coins"
                  width={240}
                  height={150}
                  unoptimized
                  className="w-auto h-full max-h-[125px] object-contain drop-shadow-[0_10px_20px_rgba(24,44,38,0.2)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Embedded Live Dark Pine Snippet */}
            <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
              <div className="bg-[#11201b] rounded-xl p-2.5 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3] truncate max-w-[130px]">
                  Client Service Wallet
                </span>
                <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                  $200.00 Active Balance
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Branded Customer Mobile App */}
          <div className="group cursor-pointer bg-white rounded-3xl p-7 sm:p-8 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.2)] hover:-translate-y-2 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Subtle Ambient Corner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#d2f56d]/20 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#11201b] via-[#182c26] to-[#274c3b] p-3 text-[#d2f56d] border border-[#d2f56d]/30 shadow-md group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 stroke-[2.2] group-hover:animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4] group-hover:bg-[#182c26] group-hover:text-[#d2f56d] group-hover:border-[#d2f56d]/40 transition-colors shadow-2xs">
                  Lock-Screen Direct Reach
                </span>
              </div>
              
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-1">
                IOS &amp; ANDROID APPLICATION
              </div>

              <h3 className="text-lg font-black text-[#182c26] tracking-tight leading-snug mb-2 group-hover:text-[#274c3b] transition-colors font-display">
                Your Branded Customer Mobile App
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Show up on your clients&apos; lock screens just like DoorDash and Amazon. Give them 1-tap support tickets, instant push notifications, and fast quote approvals right on iOS and Android.
              </p>

              {/* 3D Transparent Mobile Device Graphic */}
              <div className="relative w-full h-36 my-2 rounded-2xl bg-[#fafbf7] border border-[#dce3d4] flex items-center justify-center overflow-hidden p-2 group-hover:border-[#274c3b] transition-all">
                <Image
                  src="/brand/3d_notification_pill_transparent.png"
                  alt="3D Smartphone with JIT Helpdesk Lock Screen Alert"
                  width={240}
                  height={150}
                  unoptimized
                  className="w-auto h-full max-h-[125px] object-contain drop-shadow-[0_10px_20px_rgba(24,44,38,0.2)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Embedded Live Dark Pine Snippet */}
            <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
              <div className="bg-[#11201b] rounded-xl p-2.5 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3] truncate max-w-[130px]">
                  iOS &amp; Android Apps
                </span>
                <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                  Your Logo Published
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Branded Customer Web Portal */}
          <div className="group cursor-pointer bg-white rounded-3xl p-7 sm:p-8 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.2)] hover:-translate-y-2 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Subtle Ambient Corner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#274c3b]/30 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#11201b] via-[#182c26] to-[#274c3b] p-3 text-[#d2f56d] border border-[#d2f56d]/30 shadow-md group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300 flex items-center justify-center">
                  <Globe className="w-6 h-6 stroke-[2.2] group-hover:animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4] group-hover:bg-[#182c26] group-hover:text-[#d2f56d] group-hover:border-[#d2f56d]/40 transition-colors shadow-2xs">
                  Custom Domain
                </span>
              </div>
              
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-1">
                DESKTOP CLIENT WORKSPACE
              </div>

              <h3 className="text-lg font-black text-[#182c26] tracking-tight leading-snug mb-2 group-hover:text-[#274c3b] transition-colors font-display">
                Your Branded Customer Web Portal
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Let clients access their tickets, hardware inventory, pending approvals, invoices, and service credits directly from any desktop browser under your own domain name.
              </p>

              {/* Web Portal Browser Snippet Box */}
              <div className="relative w-full h-36 my-2 p-3.5 rounded-2xl bg-[#fafbf7] border border-[#dce3d4] flex flex-col justify-center shadow-xs group-hover:border-[#274c3b] transition-all">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-[#182c26]">
                    <Lock className="w-2.5 h-2.5 text-emerald-600" />
                    <span className="truncate max-w-[140px]">support.youritbusiness.com</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] px-1">
                  <span className="font-extrabold text-[#182c26]">42 Endpoints Protected</span>
                  <span className="text-[10px] font-bold text-[#274c3b]">Zero Phone Tag</span>
                </div>
              </div>
            </div>

            {/* Embedded Live Dark Pine Snippet */}
            <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
              <div className="bg-[#11201b] rounded-xl p-2.5 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3] truncate max-w-[130px]">
                  support.yourcompany.com
                </span>
                <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                  SSL Active &amp; Hosted
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 4: Owner Admin Dashboard */}
          <div className="group cursor-pointer bg-white rounded-3xl p-7 sm:p-8 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.2)] hover:-translate-y-2 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Subtle Ambient Corner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#d2f56d]/20 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#11201b] via-[#182c26] to-[#274c3b] p-3 text-[#d2f56d] border border-[#d2f56d]/30 shadow-md group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300 flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 stroke-[2.2] group-hover:animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4] group-hover:bg-[#182c26] group-hover:text-[#d2f56d] group-hover:border-[#d2f56d]/40 transition-colors shadow-2xs">
                  Command Center
                </span>
              </div>
              
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-1">
                CENTRALIZED OPERATIONS
              </div>

              <h3 className="text-lg font-black text-[#182c26] tracking-tight leading-snug mb-2 group-hover:text-[#274c3b] transition-colors font-display">
                Your Owner Admin Dashboard
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Keep real-time command over customer requests, technician assignment, pricing, delivery timelines, and business health from one intuitive executive console.
              </p>

              {/* 3D Transparent Tablet Graphic */}
              <div className="relative w-full h-36 my-2 rounded-2xl bg-[#fafbf7] border border-[#dce3d4] flex items-center justify-center overflow-hidden p-2 group-hover:border-[#274c3b] transition-all">
                <Image
                  src="/brand/3d_dashboard_preview_transparent.png"
                  alt="3D Tablet showing JIT Helpdesk Admin Dashboard"
                  width={240}
                  height={150}
                  unoptimized
                  className="w-auto h-full max-h-[125px] object-contain drop-shadow-[0_10px_20px_rgba(24,44,38,0.2)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Embedded Live Dark Pine Snippet */}
            <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
              <div className="bg-[#11201b] rounded-xl p-2.5 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3] truncate max-w-[130px]">
                  Real-Time SLA Gauge
                </span>
                <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                  99.8% SLA Resolved
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 5: Unlimited Support Agents */}
          <div className="group cursor-pointer bg-white rounded-3xl p-7 sm:p-8 border border-[#dce3d4] shadow-xs hover:border-[#274c3b] hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.2)] hover:-translate-y-2 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Subtle Ambient Corner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#274c3b]/30 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#11201b] via-[#182c26] to-[#274c3b] p-3 text-[#d2f56d] border border-[#d2f56d]/30 shadow-md group-hover:scale-110 group-hover:border-[#d2f56d] transition-all duration-300 flex items-center justify-center">
                  <Users2 className="w-6 h-6 stroke-[2.2] group-hover:animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#edf3e3] text-[#274c3b] border border-[#dce3d4] group-hover:bg-[#182c26] group-hover:text-[#d2f56d] group-hover:border-[#d2f56d]/40 transition-colors shadow-2xs">
                  0 Per-Seat Fees
                </span>
              </div>
              
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#61705f] mb-1">
                TEAM COLLABORATION
              </div>

              <h3 className="text-lg font-black text-[#182c26] tracking-tight leading-snug mb-2 group-hover:text-[#274c3b] transition-colors font-display">
                Unlimited Support Agents
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Give your entire support team access without software bills that inflate for every technician or dispatcher you hire. Scale without penalty.
              </p>

              {/* Team Avatars Visual Box */}
              <div className="relative w-full h-36 my-2 p-3 rounded-2xl bg-[#fafbf7] border border-[#dce3d4] shadow-xs group-hover:border-[#274c3b] transition-all flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center -space-x-3">
                  {['MS', 'JD', 'AM', 'ST', 'RW'].map((initial, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-[#182c26] text-[#d2f56d] text-xs font-black flex items-center justify-center border-2 border-white shadow-md transform hover:-translate-y-1 transition-transform"
                    >
                      {initial}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-[#274c3b] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-md">
                    +All
                  </div>
                </div>
                <span className="text-[11px] font-black text-[#274c3b] bg-white px-3 py-1 rounded-full border border-[#dce3d4] shadow-2xs">
                  Zero Per-Tech Upcharges
                </span>
              </div>
            </div>

            {/* Embedded Live Dark Pine Snippet */}
            <div className="mt-auto pt-3 border-t border-slate-100 relative z-10">
              <div className="bg-[#11201b] rounded-xl p-2.5 border border-[#274c3b] flex items-center justify-between text-[11px] text-white shadow-inner">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#edf3e3] truncate max-w-[130px]">
                  Technician Accounts
                </span>
                <span className="text-[#d2f56d] font-bold text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2f56d] live-indicator" />
                  Unlimited Included
                </span>
              </div>
            </div>
          </div>

          {/* 6th Card: Custom Package Summary CTA */}
          <div className="group cursor-pointer bg-gradient-to-br from-[#11201b] via-[#182c26] to-[#274c3b] rounded-3xl p-7 sm:p-8 text-white shadow-xl border border-[#d2f56d]/30 hover:border-[#d2f56d]/70 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Subtle Ambient Corner Glow */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-[#d2f56d]/30 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-[#d2f56d]/20 text-[#d2f56d] text-xs font-bold tracking-wider uppercase mb-4 inline-block border border-[#d2f56d]/40">
                All Included In Package
              </span>
              <h3 className="text-xl sm:text-2xl font-black mb-3 font-display">
                One Setup. Full Solution.
              </h3>
              <p className="text-xs sm:text-sm text-[#edf3e3]/90 leading-relaxed mb-6">
                App, portal, owner dashboard, and onboarding consultation are all included in your transparent package. No hidden setup fees or surprise add-ons.
              </p>
            </div>

            <div className="mt-auto relative z-10">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 px-6 rounded-full text-[#182c26] font-extrabold text-xs sm:text-sm bg-[#d2f56d] hover:bg-[#bfe853] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group-hover:scale-[1.02]"
              >
                <span>Book Your Free Live Demo</span>
                <ArrowRight className="w-4 h-4 text-[#182c26]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
