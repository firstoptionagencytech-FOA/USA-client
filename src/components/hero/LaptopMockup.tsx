'use client';

import React from 'react';
import {
  LayoutDashboard,
  Ticket,
  FileText,
  CreditCard,
  Users,
  Settings,
  BarChart3,
  CheckCircle2,
  Clock,
  TrendingUp,
  Headphones,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const LaptopMockup: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-[580px] lg:max-w-[620px] select-none">
      
      {/* Laptop Screen Bezel */}
      <div className="relative rounded-t-[18px] sm:rounded-t-[22px] bg-[#1a191f] p-2.5 sm:p-3 shadow-[0_30px_70px_-20px_rgba(20,5,15,0.45)] border-t border-x border-slate-700/50">
        
        {/* Webcam / Notch hint */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-800 ring-1 ring-slate-700/50" />

        {/* Inner Screen Surface */}
        <div className="relative overflow-hidden rounded-t-[12px] sm:rounded-t-[14px] bg-[#FAF8F9] flex h-[330px] sm:h-[370px] border border-slate-200 text-slate-800">
          
          {/* Admin Sidebar */}
          <div className="w-[125px] sm:w-[145px] bg-[#420015] text-slate-200 flex flex-col justify-between py-3 px-2 sm:px-3 shrink-0">
            <div>
              {/* Brand Header with Official Jewar Logo */}
              <div className="flex items-center gap-1.5 mb-5 px-1 pt-1">
                <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                  <img
                    src="/brand/jewar_emblem.png"
                    alt="Jewar Logo"
                    className="w-full h-full object-contain drop-shadow-xs"
                  />
                </div>
                <div className="text-[11px] font-black tracking-tight text-white leading-tight font-display">
                  JIT Helpdesk
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1 text-[10px] sm:text-[11px] font-medium">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-brand-700 text-white font-semibold shadow-sm">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Tickets</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Quotes</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Payments</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors">
                  <Users className="w-3.5 h-3.5" />
                  <span>Clients</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors">
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Reports</span>
                </div>
              </nav>
            </div>

            {/* Bottom branding tag */}
            <div className="px-2 pt-2 border-t border-white/10 text-[9px] text-pink-200/60 font-mono">
              v2.4 MSP US
            </div>
          </div>

          {/* Main Dashboard Canvas */}
          <div className="flex-1 flex flex-col p-3 sm:p-4 overflow-hidden bg-slate-50/60">
            
            {/* Topbar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight">
                Dashboard
              </h3>
              
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white border border-slate-200/80 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-brand-700 text-white font-bold text-[9px] flex items-center justify-center">
                  JD
                </div>
                <span className="text-[10px] font-semibold text-slate-700 hidden sm:inline">John Doe</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* Metric KPI Cards (3 Cards) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 my-2.5">
              
              {/* Total Tickets */}
              <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-pink-100 shadow-xs flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-pink-100 text-brand-700 flex items-center justify-center shrink-0">
                  <Ticket className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-none">24</div>
                  <div className="text-[9px] text-slate-500 font-medium truncate">Total Tickets</div>
                </div>
              </div>

              {/* Resolved */}
              <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-purple-100 shadow-xs flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-none">18</div>
                  <div className="text-[9px] text-slate-500 font-medium truncate">Resolved</div>
                </div>
              </div>

              {/* In Progress */}
              <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-emerald-100 shadow-xs flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-none">6</div>
                  <div className="text-[9px] text-slate-500 font-medium truncate">In Progress</div>
                </div>
              </div>

            </div>

            {/* Support Overview Graph + Service Status Gauge */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0">
              
              {/* Curve Chart (Spans 2 cols) */}
              <div className="col-span-2 bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-800">Support Overview</span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200/50">
                    <TrendingUp className="w-2.5 h-2.5" />
                    +24% <span className="hidden sm:inline font-normal text-[8px] text-emerald-600">This Month</span>
                  </span>
                </div>

                {/* SVG Line Chart */}
                <div className="h-24 sm:h-28 w-full relative pt-1">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 240 80">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B0032" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8B0032" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid horizontal lines */}
                    <line x1="0" y1="20" x2="240" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="240" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="240" y2="75" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Area under curve */}
                    <path
                      d="M 10 65 Q 40 45, 70 55 T 130 35 T 180 20 T 230 15 L 230 75 L 10 75 Z"
                      fill="url(#chartGradient)"
                    />
                    {/* Line stroke */}
                    <path
                      d="M 10 65 Q 40 45, 70 55 T 130 35 T 180 20 T 230 15"
                      fill="none"
                      stroke="#8B0032"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Data Points */}
                    <circle cx="10" cy="65" r="2.5" fill="#8B0032" />
                    <circle cx="70" cy="55" r="2.5" fill="#8B0032" />
                    <circle cx="130" cy="35" r="2.5" fill="#8B0032" />
                    <circle cx="180" cy="20" r="2.5" fill="#8B0032" />
                    <circle cx="230" cy="15" r="3.5" fill="#E60050" stroke="#fff" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* X-axis months */}
                <div className="flex justify-between text-[8px] text-slate-400 font-medium px-1">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              {/* Service Status Gauge Donut (1 col) */}
              <div className="col-span-1 bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-xs flex flex-col items-center justify-between text-center">
                <span className="text-[10px] font-bold text-slate-800">Service Status</span>
                
                {/* Donut Gauge */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 my-auto flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-brand-700"
                      strokeDasharray="92, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">92%</span>
                  </div>
                </div>

                <span className="text-[8px] sm:text-[9px] text-slate-500 font-semibold leading-tight">
                  Client Satisfaction
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Laptop Base / Keyboard Deck */}
      <div className="relative mx-auto h-[12px] sm:h-[14px] bg-gradient-to-b from-[#2d2c33] to-[#1a191f] rounded-b-[16px] sm:rounded-b-[20px] shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex items-center justify-center">
        {/* Thumb Opening Notch */}
        <div className="w-16 h-[3px] bg-slate-600 rounded-b-md" />
      </div>

      {/* Foreground Floating 3D Glowing Glass Security Shield */}
      <div className="absolute -bottom-4 right-1 sm:-right-4 z-20 flex items-center justify-center animate-bounce-subtle">
        <div className="relative p-2.5 sm:p-3 rounded-2xl glass-shield shadow-[0_15px_35px_rgba(230,0,80,0.4)] flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]" />
        </div>
      </div>

    </div>
  );
};
