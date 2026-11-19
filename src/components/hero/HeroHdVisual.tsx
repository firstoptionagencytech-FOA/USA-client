'use client';

import React from 'react';
import {
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Headphones,
  Ticket,
  CreditCard,
  Zap
} from 'lucide-react';

export const HeroHdVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] sm:max-w-[560px] md:max-w-[620px] mx-auto select-none my-4 sm:my-6 px-2">
      
      {/* Ambient background glow behind visual (transparent background, subtle glow) */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-700/15 via-rose-500/20 to-brand-900/15 blur-3xl rounded-full -z-10 pointer-events-none transform -translate-y-4" />

      {/* Main Dual Presentation (No outer boxed frame - completely transparent composition) */}
      <div className="relative flex items-center justify-center">
        
        {/* Laptop / Portal Screen Preview (Slanted perspective behind phone) */}
        <div className="relative w-[85%] sm:w-[88%] transform translate-x-4 sm:translate-x-6 -translate-y-2 rounded-2xl bg-gradient-to-b from-[#1E1D24] to-[#121117] p-2 sm:p-2.5 shadow-[0_25px_60px_-15px_rgba(30,10,20,0.35),0_0_0_1px_rgba(255,255,255,0.1)]">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-1.5 px-2 border-b border-white/10">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-300 font-medium">
              portal.yourbrand.com
            </div>
            <span className="text-[8px] font-bold text-pink-300 uppercase tracking-wider bg-brand-800/60 px-1.5 py-0.5 rounded">
              MSP Portal
            </span>
          </div>

          {/* Screen Content Preview */}
          <div className="bg-[#FAF8F9] rounded-xl p-2.5 sm:p-3 text-slate-800 flex gap-2 sm:gap-3">
            {/* Mini Sidebar */}
            <div className="w-16 sm:w-20 bg-[#4A0018] rounded-lg p-1.5 flex flex-col justify-between shrink-0 text-white">
              <div className="space-y-1">
                <div className="flex items-center gap-1 px-1 py-0.5 rounded bg-brand-700 text-[8px] font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>Dashboard</span>
                </div>
                <div className="text-[8px] text-slate-300 px-1 py-0.5">Tickets (24)</div>
                <div className="text-[8px] text-slate-300 px-1 py-0.5">Quotes (8)</div>
                <div className="text-[8px] text-slate-300 px-1 py-0.5">Payments</div>
              </div>
              <div className="text-[7px] text-pink-200/60 font-mono">v2.4 US</div>
            </div>

            {/* Mini Dashboard Metrics */}
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-3 gap-1.5">
                <div className="bg-white p-1.5 rounded-lg border border-pink-100 shadow-2xs">
                  <div className="text-[8px] text-slate-400 font-bold">Tickets</div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 leading-none">24</div>
                </div>
                <div className="bg-white p-1.5 rounded-lg border border-purple-100 shadow-2xs">
                  <div className="text-[8px] text-purple-600 font-bold">Resolved</div>
                  <div className="text-xs sm:text-sm font-black text-purple-700 leading-none">18</div>
                </div>
                <div className="bg-white p-1.5 rounded-lg border border-emerald-100 shadow-2xs">
                  <div className="text-[8px] text-emerald-600 font-bold">In Progress</div>
                  <div className="text-xs sm:text-sm font-black text-emerald-700 leading-none">6</div>
                </div>
              </div>

              {/* Mini Curve Graph */}
              <div className="bg-white p-2 rounded-lg border border-slate-200/70 shadow-2xs flex items-center justify-between">
                <div>
                  <div className="text-[8px] font-bold text-slate-700">Support SLA Velocity</div>
                  <div className="text-[10px] font-black text-brand-700 flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" />
                    +24% Volume
                  </div>
                </div>
                <div className="h-6 w-20">
                  <svg className="w-full h-full" viewBox="0 0 80 24">
                    <path
                      d="M 5 20 Q 25 10, 45 15 T 75 4"
                      fill="none"
                      stroke="#8B0032"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Foreground Smartphone (Slightly tilted over laptop, crisp transparent shadow) */}
        <div className="absolute -left-1 sm:left-4 -bottom-3 sm:-bottom-4 w-[160px] sm:w-[195px] md:w-[215px] z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <div className="rounded-[32px] sm:rounded-[38px] p-2 bg-gradient-to-b from-[#2B2A30] to-[#121116] shadow-[0_20px_50px_rgba(20,5,15,0.45),0_0_0_1px_rgba(255,255,255,0.18)]">
            
            {/* Phone Screen */}
            <div className="overflow-hidden rounded-[26px] sm:rounded-[30px] bg-[#FAF8F9] p-2.5 sm:p-3 flex flex-col justify-between h-[280px] sm:h-[320px] text-slate-800 border border-white/40 shadow-inner">
              
              {/* Top Notch & Island */}
              <div className="flex items-center justify-between pb-1.5">
                <span className="text-[8px] font-bold text-slate-800">9:41</span>
                <div className="w-14 h-3 bg-black rounded-full" />
                <div className="flex gap-1 text-[8px] font-bold text-slate-700">5G</div>
              </div>

              {/* App Brand Header */}
              <div className="flex items-center gap-1.5 py-1">
                <div className="w-5 h-5 rounded-full bg-brand-700 text-white flex items-center justify-center shadow-xs">
                  <Headphones className="w-3 h-3" />
                </div>
                <span className="text-[10px] font-extrabold text-brand-900 tracking-tight">JIT Helpdesk</span>
              </div>

              {/* Welcome & Button */}
              <div className="my-1">
                <div className="text-[11px] sm:text-xs font-black text-slate-900 leading-tight">Welcome Back!</div>
                <div className="text-[8px] text-slate-500 mb-1.5">Instant client support</div>
                <div className="w-full py-1.5 px-2 rounded-full bg-brand-700 text-white font-bold text-[9px] text-center shadow-xs">
                  New Support Request →
                </div>
              </div>

              {/* 2x2 Mini Tiles */}
              <div className="grid grid-cols-2 gap-1.5 my-1">
                <div className="bg-white p-1.5 rounded-xl border border-pink-100 text-center shadow-2xs">
                  <Ticket className="w-3 h-3 text-purple-600 mx-auto mb-0.5" />
                  <div className="text-[8px] font-bold text-slate-800">My Tickets</div>
                  <div className="text-[7px] text-slate-400">2 Active</div>
                </div>
                <div className="bg-white p-1.5 rounded-xl border border-pink-100 text-center shadow-2xs">
                  <CreditCard className="w-3 h-3 text-brand-700 mx-auto mb-0.5" />
                  <div className="text-[8px] font-bold text-slate-800">Payments</div>
                  <div className="text-[7px] text-amber-600 font-semibold">1 Due</div>
                </div>
              </div>

              {/* Recent Activity Mini Item */}
              <div className="bg-white p-1.5 rounded-xl border border-pink-100 flex items-center gap-1.5 shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[8px] font-bold text-slate-800 truncate">Ticket #1024</div>
                  <div className="text-[7px] text-slate-400 truncate">Software Update · 2h ago</div>
                </div>
              </div>

              {/* Mini Bottom Nav */}
              <div className="pt-1.5 border-t border-slate-100 flex justify-around text-slate-400 text-[8px]">
                <span className="text-brand-700 font-bold">Home</span>
                <span>Tickets</span>
                <span>Pay</span>
                <span>Profile</span>
              </div>

            </div>
          </div>
        </div>

        {/* Floating 3D Glowing Shield (Transparent background, high definition) */}
        <div className="absolute -bottom-2 sm:-bottom-3 right-4 sm:right-10 z-20 animate-bounce-subtle">
          <div className="p-2 sm:p-2.5 rounded-2xl glass-shield shadow-[0_12px_30px_rgba(230,0,80,0.35)] flex items-center gap-1.5 text-white">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" />
            <div className="pr-1 text-left hidden sm:block">
              <div className="text-[9px] font-black leading-none">100% Branded</div>
              <div className="text-[8px] text-pink-200">Your Logo & Domain</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
