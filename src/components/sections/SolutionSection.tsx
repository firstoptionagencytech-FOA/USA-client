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
  CreditCard,
  Ticket
} from 'lucide-react';

interface SolutionSectionProps {
  onOpenBooking: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden" id="solution">
      
      {/* Background Decor */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#edf3e3] rounded-full blur-3xl opacity-70 pointer-events-none -z-10" />

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

        {/* 5 Pillar Grid with Rich Transparent 3D Visuals & Graphic-Designer Level Polish */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1: Loyalty & Referral Engine (Moved to #1 for Ad alignment) */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  Starbucks-Style Points
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                1. Loyalty Rewards &amp; Referral Engine
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-3">
                Your clients collect points at Starbucks. Now they can collect them with you. Every paid invoice awards service credits, and automated referral links turn happy clients into repeat accounts.
              </p>

              {/* 3D Transparent Loyalty Coins Showcase */}
              <div className="relative w-full h-32 my-3 rounded-2xl bg-gradient-to-b from-white to-[#edf3e3] border border-[#dce3d4] flex items-center justify-center overflow-hidden p-2">
                <Image
                  src="/brand/3d_loyalty_coins_transparent.png"
                  alt="3D Loyalty Rewards Coins"
                  width={160}
                  height={110}
                  className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Wallet Summary */}
              <div className="p-2.5 rounded-xl bg-white border border-[#dce3d4] text-[11px] font-bold text-[#182c26] flex items-center justify-between">
                <span>Client Credits Wallet</span>
                <span className="text-[#274c3b] font-black">$200.00 Balance</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Automated referral credits &amp; customer lock-in</span>
            </div>
          </div>

          {/* Pillar 2: Branded Customer Mobile App */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  Lock-Screen Direct Reach
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                2. Your Branded Customer Mobile App
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-3">
                Show up on your clients&apos; lock screens just like DoorDash and Amazon. Give them 1-tap support tickets, instant push notifications, and fast quote approvals right on iOS and Android.
              </p>

              {/* 3D Transparent Notification Pill Showcase */}
              <div className="relative w-full h-32 my-3 rounded-2xl bg-gradient-to-b from-white to-[#edf3e3] border border-[#dce3d4] flex items-center justify-center overflow-hidden p-2">
                <Image
                  src="/brand/3d_notification_pill_transparent.png"
                  alt="3D Lock Screen Notification Alert"
                  width={200}
                  height={90}
                  className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Mobile Spec */}
              <div className="p-2.5 rounded-xl bg-white border border-[#dce3d4] text-[11px] font-bold text-[#182c26] flex items-center justify-between">
                <span>iOS &amp; Android Apps</span>
                <span className="text-[#274c3b] font-black">Your Name &amp; Logo</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>iOS &amp; Android with your logo &amp; brand colors</span>
            </div>
          </div>

          {/* Pillar 3: Branded Customer Web Portal */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  Custom Domain
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                3. Your Branded Customer Web Portal
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-3">
                Let clients access their tickets, hardware inventory, pending approvals, invoices, and service credits directly from any desktop browser under your own domain name.
              </p>

              {/* Visual Custom Domain Snippet */}
              <div className="w-full h-32 my-3 rounded-2xl bg-gradient-to-b from-white to-[#edf3e3] border border-[#dce3d4] flex flex-col justify-center p-4 space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#dce3d4] text-xs font-mono text-[#182c26] shadow-2xs">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate">support.youritbusiness.com</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-[#61705f] px-1">
                  <span>Hardware Inventory:</span>
                  <span className="text-[#274c3b] font-black">42 Devices Protected</span>
                </div>
              </div>

              {/* Portal Feature */}
              <div className="p-2.5 rounded-xl bg-white border border-[#dce3d4] text-[11px] font-bold text-[#182c26] flex items-center justify-between">
                <span>Self-Service Portal</span>
                <span className="text-[#274c3b] font-black">Zero Phone Tag</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Hosted on your custom domain with SSL</span>
            </div>
          </div>

          {/* Pillar 4: Owner Admin Dashboard */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300">
                  <LayoutDashboard className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  Command Center
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                4. Your Owner Admin Dashboard
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-3">
                Keep real-time command over customer requests, technician assignment, pricing, delivery timelines, and business health from one intuitive executive console.
              </p>

              {/* 3D Transparent Dashboard Showcase */}
              <div className="relative w-full h-32 my-3 rounded-2xl bg-gradient-to-b from-white to-[#edf3e3] border border-[#dce3d4] flex items-center justify-center overflow-hidden p-2">
                <Image
                  src="/brand/3d_dashboard_preview_transparent.png"
                  alt="3D Owner Admin Console"
                  width={180}
                  height={110}
                  className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Admin Spec */}
              <div className="p-2.5 rounded-xl bg-white border border-[#dce3d4] text-[11px] font-bold text-[#182c26] flex items-center justify-between">
                <span>Real-Time SLA Tracking</span>
                <span className="text-[#274c3b] font-black">Live Visibility</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full visibility over queues, SLA times &amp; revenue</span>
            </div>
          </div>

          {/* Pillar 5: Unlimited Support Agents */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300">
                  <Users2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  0 Per-Seat Fees
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                5. Unlimited Support Agents
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-3">
                Give your entire support team access without software bills that inflate for every technician or dispatcher you hire. Scale without penalty.
              </p>

              {/* Team Avatars Visual Box */}
              <div className="w-full h-32 my-3 rounded-2xl bg-gradient-to-b from-white to-[#edf3e3] border border-[#dce3d4] flex flex-col justify-center items-center p-3 space-y-2">
                <div className="flex items-center -space-x-2">
                  {['MS', 'JD', 'AM', 'ST', 'RW'].map((initial, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-[#182c26] text-[#d2f56d] text-[10px] font-black flex items-center justify-center border-2 border-white shadow-2xs"
                    >
                      {initial}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-[#274c3b] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white shadow-2xs">
                    +All
                  </div>
                </div>
                <span className="text-[11px] font-black text-[#274c3b] bg-white px-3 py-1 rounded-full border border-[#dce3d4] shadow-2xs">
                  Zero Per-Tech Upcharges
                </span>
              </div>

              {/* Seat Metric */}
              <div className="p-2.5 rounded-xl bg-white border border-[#dce3d4] text-[11px] font-bold text-[#182c26] flex items-center justify-between">
                <span>Technician Accounts</span>
                <span className="text-[#274c3b] font-black">Unlimited Included</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No per-seat fees as your technician team expands</span>
            </div>
          </div>

          {/* 6th Card: Custom Package Summary CTA */}
          <div className="bg-gradient-to-br from-[#182c26] via-[#11201b] to-[#274c3b] rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl border border-[#d2f56d]/30 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#d2f56d] text-xs font-bold tracking-wider uppercase mb-4 inline-block border border-[#d2f56d]/20">
                All Included In Package
              </span>
              <h3 className="text-xl sm:text-2xl font-black mb-3 font-display">
                One Setup. Full Solution.
              </h3>
              <p className="text-xs sm:text-sm text-[#edf3e3]/90 leading-relaxed">
                App, portal, owner dashboard, and onboarding consultation are all included in your transparent package. No hidden setup fees or surprise add-ons.
              </p>
            </div>

            <div className="mt-8 relative z-10">
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
