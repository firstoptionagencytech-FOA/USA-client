'use client';

import React from 'react';
import {
  Bell,
  ArrowRight,
  Ticket,
  FileText,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
  Home,
  Headphones,
  User,
  Wifi,
  Signal,
  Battery
} from 'lucide-react';

export const PhoneMockup: React.FC = () => {
  return (
    <div className="relative mx-auto w-[270px] sm:w-[290px] md:w-[310px] shrink-0 select-none">
      {/* Phone Hardware Shell */}
      <div className="relative rounded-[46px] p-[10px] bg-gradient-to-b from-[#2c2b30] via-[#1a191d] to-[#0f0e12] shadow-[0_25px_60px_-15px_rgba(30,10,20,0.5),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/40">
        
        {/* Outer Bezel & Side Buttons Hint */}
        <div className="absolute -left-[12px] top-[110px] w-[3px] h-[32px] bg-[#3a3940] rounded-l" />
        <div className="absolute -left-[12px] top-[155px] w-[3px] h-[48px] bg-[#3a3940] rounded-l" />
        <div className="absolute -left-[12px] top-[215px] w-[3px] h-[48px] bg-[#3a3940] rounded-l" />
        <div className="absolute -right-[12px] top-[140px] w-[3px] h-[64px] bg-[#3a3940] rounded-r" />

        {/* Screen Display */}
        <div className="relative overflow-hidden rounded-[38px] bg-[#FBF9FA] text-slate-800 flex flex-col h-[570px] shadow-inner border border-white/20">
          
          {/* Status Bar */}
          <div className="pt-3 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-slate-800">
            <span>9:41</span>
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-slate-800" />
            </div>
          </div>

          {/* App Header */}
          <div className="px-5 pt-2 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-700 flex items-center justify-center text-white shadow-sm">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm tracking-tight text-brand-900">JIT Helpdesk</span>
            </div>
            <button className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-600 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="px-5 py-2 flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Welcome banner */}
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                Welcome Back!
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">Get instant support, anytime.</p>
            </div>

            {/* New Support Request Primary Button */}
            <div className="my-2.5">
              <div className="w-full py-2.5 px-4 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(139,0,50,0.35)] transition-all">
                <span>New Support Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 2x2 Quick Action Tiles */}
            <div className="grid grid-cols-2 gap-2.5 my-1">
              <div className="bg-white rounded-2xl p-3 border border-pink-100/70 shadow-sm flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5">
                  <Ticket className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-slate-800">My Tickets</div>
                <div className="text-[10px] text-slate-400 font-medium">2 Active</div>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-pink-100/70 shadow-sm flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-slate-800">Quotes</div>
                <div className="text-[10px] text-brand-600 font-semibold">1 Pending</div>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-pink-100/70 shadow-sm flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-1.5">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-slate-800">Payments</div>
                <div className="text-[10px] text-amber-600 font-semibold">1 Due</div>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-pink-100/70 shadow-sm flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-slate-800">Track Progress</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Live Updates</div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="my-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1.5 px-0.5">
                <span>Recent Activity</span>
                <span className="text-brand-700 text-[10px] font-bold">View All →</span>
              </div>
              <div className="bg-white rounded-2xl p-2.5 border border-pink-100/70 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-800 leading-tight">Ticket #1024</div>
                    <div className="text-[10px] text-slate-500">Software Update · 2h ago</div>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

          </div>

          {/* Bottom Tab Bar */}
          <div className="bg-white border-t border-slate-100 px-6 py-2.5 flex items-center justify-between text-slate-400">
            <div className="flex flex-col items-center gap-0.5 text-brand-700 font-bold">
              <Home className="w-4 h-4" />
              <span className="text-[9px]">Home</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-600">
              <Ticket className="w-4 h-4" />
              <span className="text-[9px]">Tickets</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-600">
              <CreditCard className="w-4 h-4" />
              <span className="text-[9px]">Payments</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-600">
              <User className="w-4 h-4" />
              <span className="text-[9px]">Profile</span>
            </div>
          </div>

          {/* Home Indicator Bar */}
          <div className="h-4 bg-white flex items-center justify-center pb-1">
            <div className="w-28 h-1 bg-slate-300 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
};
