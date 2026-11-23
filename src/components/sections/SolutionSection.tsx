'use client';

import React from 'react';
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
  Ticket
} from 'lucide-react';

interface SolutionSectionProps {
  onOpenBooking: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      
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

        {/* 5 Pillar Grid with Rich Interactive Visuals & Card Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1: Loyalty & Referral Engine (Moved to #1 for Ad alignment) */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  Starbucks-Style Points
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                1. Loyalty Rewards and Referral Engine
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Your clients collect points at Starbucks. Now they can collect them with you. Every paid invoice awards service credits, and automated referral links turn happy clients into your best sales reps.
              </p>

              {/* Visual Credits Wallet Snippet */}
              <div className="my-3 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#182c26]">
                  <span>Client Service Credits</span>
                  <span className="text-[#274c3b] font-black">$200.00 Balance</span>
                </div>
                <div className="text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Referral Code: REF-884</span>
                  <span className="text-emerald-700 font-bold">450 Points Earned</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Automated referral credits &amp; customer lock-in</span>
            </div>
          </div>

          {/* Pillar 2: Branded Customer Mobile App */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  Lock-Screen Direct Reach
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                2. Your Branded Customer Mobile App
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Show up on your clients&apos; lock screens just like DoorDash and Amazon. Give them 1-tap support tickets, instant push notifications, and fast quote approvals right from their iPhone or Android.
              </p>

              {/* Visual Interactive App Snippet */}
              <div className="my-3 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#182c26] text-[#d2f56d] flex items-center justify-center font-black text-[10px]">
                      IT
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold text-[#182c26]">Your Business App</div>
                      <div className="text-[9px] text-[#61705f]">Client Self-Service</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="py-1.5 px-3 rounded-xl bg-[#edf3e3] text-[#274c3b] text-[10px] font-bold text-center">
                  + New Support Request in 1-Tap
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>iOS &amp; Android with your logo &amp; brand colors</span>
            </div>
          </div>

          {/* Pillar 3: Branded Customer Web Portal */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  Custom Domain
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                3. Your Branded Customer Web Portal
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Let clients access their tickets, hardware inventory, pending approvals, invoices, and service credits directly from any browser under your domain name.
              </p>

              {/* Visual Custom Domain Snippet */}
              <div className="my-3 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs space-y-2">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-mono text-[#182c26]">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span className="truncate">support.youritbusiness.com</span>
                </div>
                <div className="flex items-center justify-between text-[10px] px-1 font-bold text-[#61705f]">
                  <span>Hardware Records</span>
                  <span className="text-[#274c3b]">42 Endpoints Protected</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Hosted on your custom domain with SSL</span>
            </div>
          </div>

          {/* Pillar 4: Owner Admin Dashboard */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <LayoutDashboard className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  Command Center
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                4. Your Owner Admin Dashboard
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Keep real-time command over customer requests, technician assignment, pricing, delivery timelines, and business health from one intuitive console.
              </p>

              {/* Visual Metric Counter Snippet */}
              <div className="my-3 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs grid grid-cols-3 gap-1.5 text-center">
                <div className="p-1.5 rounded-xl bg-[#edf3e3]">
                  <div className="text-xs font-black text-[#182c26]">24</div>
                  <div className="text-[8px] font-bold text-[#274c3b]">Tickets</div>
                </div>
                <div className="p-1.5 rounded-xl bg-emerald-50">
                  <div className="text-xs font-black text-emerald-800">18</div>
                  <div className="text-[8px] font-bold text-emerald-700">Resolved</div>
                </div>
                <div className="p-1.5 rounded-xl bg-amber-50">
                  <div className="text-xs font-black text-amber-800">100%</div>
                  <div className="text-[8px] font-bold text-amber-700">SLA Met</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full visibility over queues, SLA times &amp; revenue</span>
            </div>
          </div>

          {/* Pillar 5: Unlimited Support Agents */}
          <div className="group bg-[#f6f6ef] rounded-3xl p-6 sm:p-8 border border-[#dce3d4] hover:border-[#274c3b] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <Users2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#dce3d4] text-[#274c3b]">
                  0 Per-Seat Fees
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-[#182c26] mb-2 tracking-tight group-hover:text-[#274c3b] transition-colors">
                5. Unlimited Support Agents
              </h3>
              
              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Give your entire support team access without software bills that inflate for every technician or dispatcher you hire. Scale without penalty.
              </p>

              {/* Visual Team Avatars Snippet */}
              <div className="my-3 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  {['MS', 'JD', 'AM', 'ST'].map((initial, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-[#182c26] text-[#d2f56d] text-[9px] font-black flex items-center justify-center border-2 border-white shadow-2xs"
                    >
                      {initial}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full bg-[#edf3e3] text-[#274c3b] text-[8px] font-bold flex items-center justify-center border-2 border-white">
                    +All
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-[#274c3b] bg-[#edf3e3] px-2 py-0.5 rounded-full">
                  Flat $200/mo Always
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] flex items-center gap-2 text-xs font-bold text-[#182c26]">
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
                className="poster-glow-btn w-full py-3.5 px-6 rounded-full text-white font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group-hover:scale-[1.02]"
              >
                <span>Book Your Free Live Demo</span>
                <ArrowRight className="w-4 h-4 text-[#d2f56d]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
