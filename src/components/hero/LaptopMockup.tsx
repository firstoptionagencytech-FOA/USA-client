'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Ticket,
  FileText,
  CreditCard,
  Users,
  ChevronDown,
  Sparkles,
  Check
} from 'lucide-react';

export const LaptopMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tickets' | 'quotes' | 'payments' | 'clients'>('dashboard');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  
  // Animated Counters on Scroll
  const [hasAnimated, setHasAnimated] = useState(false);
  const [totalTickets, setTotalTickets] = useState(0);
  const [resolvedTickets, setResolvedTickets] = useState(0);
  const [inProgressTickets, setInProgressTickets] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [growth, setGrowth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1600; // ms
    const steps = 40;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setTotalTickets(Math.round(24 * ease));
      setResolvedTickets(Math.round(18 * ease));
      setInProgressTickets(Math.round(6 * ease));
      setSatisfaction(Math.round(92 * ease));
      setGrowth(Math.round(24 * ease));

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[580px] lg:max-w-[620px] select-none">
      
      {/* Floating Interactive Badge */}
      <div className="absolute -top-3.5 right-6 z-30">
        <div className="px-3 py-1 rounded-full bg-[#182c26] text-[#d2f56d] text-[10px] font-extrabold shadow-md flex items-center gap-1.5 border border-[#d2f56d]/30">
          <Sparkles className="w-3 h-3 text-[#d2f56d]" />
          <span>Interactive Owner Portal</span>
        </div>
      </div>

      {/* Laptop Screen Outer Bezel - Jewar Pine Obsidian */}
      <div className="relative rounded-t-[18px] sm:rounded-t-[22px] bg-[#182c26] p-2 sm:p-2.5 shadow-[0_30px_70px_-20px_rgba(24,44,38,0.45)] border-t border-x border-[#274c3b]/50">
        
        {/* Webcam dot */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0b1512] ring-1 ring-[#274c3b]" />

        {/* Inner Screen Surface */}
        <div className="relative overflow-hidden rounded-t-[12px] sm:rounded-t-[14px] bg-[#f6f6ef] flex h-[350px] sm:h-[380px] border border-[#dce3d4] text-[#182c26]">
          
          {/* Admin Sidebar - Jewar Deskora Midnight Pine */}
          <div className="w-[125px] sm:w-[140px] bg-[#182c26] text-[#edf3e3] flex flex-col justify-between py-3 px-2 sm:px-2.5 shrink-0 border-r border-[#274c3b]">
            <div>
              {/* Brand Header */}
              <div className="flex items-center gap-1.5 mb-4 px-1 pt-1">
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

              {/* Navigation Items (Interactive tabs) */}
              <nav className="space-y-1 text-[10px] sm:text-[11px] font-medium">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-[#274c3b] text-[#d2f56d] font-extrabold shadow-sm border-l-3 border-[#d2f56d]'
                      : 'text-[#dce3d4] hover:bg-white/10'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab('tickets')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                    activeTab === 'tickets'
                      ? 'bg-[#274c3b] text-[#d2f56d] font-extrabold shadow-sm border-l-3 border-[#d2f56d]'
                      : 'text-[#dce3d4] hover:bg-white/10'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Tickets</span>
                </button>

                <button
                  onClick={() => setActiveTab('quotes')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                    activeTab === 'quotes'
                      ? 'bg-[#274c3b] text-[#d2f56d] font-extrabold shadow-sm border-l-3 border-[#d2f56d]'
                      : 'text-[#dce3d4] hover:bg-white/10'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Quotes</span>
                </button>

                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                    activeTab === 'payments'
                      ? 'bg-[#274c3b] text-[#d2f56d] font-extrabold shadow-sm border-l-3 border-[#d2f56d]'
                      : 'text-[#dce3d4] hover:bg-white/10'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Payments</span>
                </button>

                <button
                  onClick={() => setActiveTab('clients')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                    activeTab === 'clients'
                      ? 'bg-[#274c3b] text-[#d2f56d] font-extrabold shadow-sm border-l-3 border-[#d2f56d]'
                      : 'text-[#dce3d4] hover:bg-white/10'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Clients</span>
                </button>
              </nav>
            </div>

            {/* Bottom branding tag */}
            <div className="px-2 pt-2 border-t border-[#274c3b] text-[9px] text-[#d2f56d]/70 font-mono">
              Deskora Core v2.4
            </div>
          </div>

          {/* Main Dashboard Canvas */}
          <div className="flex-1 flex flex-col p-3 sm:p-3.5 overflow-hidden bg-[#f6f6ef]">
            
            {/* Topbar */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#dce3d4] shrink-0">
              <h3 className="font-extrabold text-xs sm:text-sm text-[#182c26] tracking-tight capitalize">
                {activeTab} Overview
              </h3>
              
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white border border-[#dce3d4] shadow-xs">
                <div className="w-4 h-4 rounded-full bg-[#182c26] text-[#d2f56d] font-bold text-[8px] flex items-center justify-center">
                  JD
                </div>
                <span className="text-[10px] font-bold text-[#182c26]">John Doe</span>
                <ChevronDown className="w-3 h-3 text-[#61705f]" />
              </div>
            </div>

            {/* TAB CONTENT: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="flex-1 flex flex-col justify-between pt-2.5 overflow-hidden">
                
                {/* 3 Metric Summary Cards (Animated Numbers on Scroll) */}
                <div className="grid grid-cols-3 gap-2 shrink-0">
                  <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-[#dce3d4] shadow-2xs">
                    <div className="text-[9px] font-bold text-[#61705f] uppercase tracking-wider">Total Tickets</div>
                    <div className="text-base sm:text-lg font-black text-[#182c26] font-display">
                      {totalTickets}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-[#dce3d4] shadow-2xs">
                    <div className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider">Resolved</div>
                    <div className="text-base sm:text-lg font-black text-emerald-900 font-display">
                      {resolvedTickets}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-[#dce3d4] shadow-2xs">
                    <div className="text-[9px] font-bold text-[#8c5e13] uppercase tracking-wider">In Progress</div>
                    <div className="text-base sm:text-lg font-black text-[#8c5e13] font-display">
                      {inProgressTickets}
                    </div>
                  </div>
                </div>

                {/* Middle Row: Support Overview Graph + Service Status Gauge */}
                <div className="grid grid-cols-12 gap-2 my-2 flex-1 items-stretch">
                  
                  {/* Left: Support Overview Curve (Animated bottom to top) */}
                  <div className="col-span-8 bg-white rounded-xl p-2.5 border border-[#dce3d4] shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-[10px] font-black text-[#182c26]">Support Overview</span>
                      <span className="text-[9px] font-extrabold text-[#274c3b] bg-[#edf3e3] px-1.5 py-0.5 rounded border border-[#dce3d4]">
                        +{growth}% This Month
                      </span>
                    </div>

                    {/* SVG Chart with Smooth Bottom-to-Top Animation */}
                    <div className="relative w-full h-[85px] sm:h-[100px] flex items-end">
                      <svg
                        viewBox="0 0 300 120"
                        className={`w-full h-full overflow-visible transition-all duration-1000 ease-out ${
                          hasAnimated ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                        } origin-bottom`}
                      >
                        <defs>
                          <linearGradient id="chartGradientJewar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#274c3b" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#274c3b" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Background Grid Lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="#f0f3eb" strokeDasharray="3 3" />
                        <line x1="0" y1="60" x2="300" y2="60" stroke="#f0f3eb" strokeDasharray="3 3" />
                        <line x1="0" y1="100" x2="300" y2="100" stroke="#f0f3eb" strokeDasharray="3 3" />

                        {/* Area Fill */}
                        <path
                          d="M0 100 C 40 85, 70 95, 100 70 C 130 50, 160 80, 200 45 C 240 25, 270 40, 300 20 L 300 120 L 0 120 Z"
                          fill="url(#chartGradientJewar)"
                        />

                        {/* Foreground Line */}
                        <path
                          d="M0 100 C 40 85, 70 95, 100 70 C 130 50, 160 80, 200 45 C 240 25, 270 40, 300 20"
                          fill="none"
                          stroke="#274c3b"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />

                        {/* Interactive Data Points */}
                        {[
                          { cx: 50, cy: 90, month: 'Jan', val: '12' },
                          { cx: 100, cy: 70, month: 'Feb', val: '18' },
                          { cx: 150, cy: 75, month: 'Mar', val: '16' },
                          { cx: 200, cy: 45, month: 'Apr', val: '22' },
                          { cx: 250, cy: 30, month: 'May', val: '28' },
                          { cx: 300, cy: 20, month: 'Jun', val: '34' },
                        ].map((pt, i) => (
                          <circle
                            key={i}
                            cx={pt.cx}
                            cy={pt.cy}
                            r={hoveredMonth === pt.month ? 5 : 3.5}
                            fill={hoveredMonth === pt.month ? '#d2f56d' : '#274c3b'}
                            stroke="#182c26"
                            strokeWidth="2"
                            className="cursor-pointer transition-all"
                            onMouseEnter={() => setHoveredMonth(pt.month)}
                            onMouseLeave={() => setHoveredMonth(null)}
                          />
                        ))}
                      </svg>
                    </div>

                    {/* Months bar */}
                    <div className="flex justify-between text-[8px] font-bold text-[#61705f] pt-1 border-t border-[#dce3d4]">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>

                  {/* Right: Service Status Gauge (Animated 0 to 92%) */}
                  <div className="col-span-4 bg-white rounded-xl p-2 sm:p-2.5 border border-[#dce3d4] shadow-2xs flex flex-col items-center justify-between text-center">
                    <span className="text-[10px] font-black text-[#182c26]">Service Status</span>

                    {/* Circular Percentage Ring */}
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center my-1">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#edf3e3]"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#274c3b] transition-all duration-1000 ease-out"
                          strokeDasharray={`${satisfaction}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-xs sm:text-sm font-black text-[#182c26] font-display">
                          {satisfaction}%
                        </span>
                      </div>
                    </div>

                    <div className="text-[8px] font-extrabold text-[#61705f] uppercase tracking-tight">
                      Client Satisfaction
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB CONTENT: TICKETS QUEUE */}
            {activeTab === 'tickets' && (
              <div className="space-y-1.5 pt-2 text-[10px] overflow-y-auto">
                {[
                  { id: '#1024', client: 'Sterling Cloud', subject: 'Firewall Policy Block', prio: 'High', status: 'In Progress' },
                  { id: '#1023', client: 'Acme Corp', subject: 'Outlook Auth Error', prio: 'Normal', status: 'Resolved' },
                  { id: '#1022', client: 'Apex Logistics', subject: 'NAS Sync Failure', prio: 'Critical', status: 'Investigating' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-white border border-[#dce3d4] flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-[#182c26]">{item.id} · {item.subject}</div>
                      <div className="text-[9px] text-[#61705f]">{item.client}</div>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#edf3e3] text-[#274c3b]">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: QUOTES */}
            {activeTab === 'quotes' && (
              <div className="space-y-1.5 pt-2 text-[10px]">
                {[
                  { id: 'Q-804', client: 'Apex Logistics', amount: '$1,250', desc: 'Hardware Firewall Upgrade', status: 'Approved' },
                  { id: 'Q-805', client: 'Sterling Cloud', amount: '$3,400', desc: 'Azure AD Migration', status: 'Sent' },
                ].map((q, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-white border border-[#dce3d4] flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-[#182c26]">{q.id} · {q.desc}</div>
                      <div className="text-[9px] text-[#61705f]">{q.client} · {q.amount}</div>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#edf3e3] text-emerald-800">
                      {q.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="space-y-1.5 pt-2 text-[10px]">
                {[
                  { client: 'Acme Corp', amount: '$850.00', date: 'Nov 18', status: 'Paid via Stripe' },
                  { client: 'Apex Logistics', amount: '$450.00', date: 'Nov 19', status: 'Paid via Apple Pay' },
                  { client: 'Sterling Cloud', amount: '$1,200.00', date: 'Due Nov 25', status: 'Pending' },
                ].map((p, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-white border border-[#dce3d4] flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-[#182c26]">{p.client}</div>
                      <div className="text-[9px] text-[#61705f]">{p.date} · {p.status}</div>
                    </div>
                    <span className="font-extrabold text-[#182c26]">{p.amount}</span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: CLIENTS */}
            {activeTab === 'clients' && (
              <div className="space-y-1.5 pt-2 text-[10px]">
                {[
                  { name: 'Apex Logistics LLC', endpoints: '42 Endpoints', mrr: '$450/mo' },
                  { name: 'Sterling Cloud Systems', endpoints: '98 Endpoints', mrr: '$1,200/mo' },
                  { name: 'Acme Industrial Corp', endpoints: '64 Endpoints', mrr: '$850/mo' },
                ].map((c, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-white border border-[#dce3d4] flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-[#182c26]">{c.name}</div>
                      <div className="text-[9px] text-[#61705f]">{c.endpoints}</div>
                    </div>
                    <span className="font-extrabold text-[#274c3b]">{c.mrr}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Laptop Bottom Base / Keyboard lip */}
      <div className="relative h-3 sm:h-3.5 bg-gradient-to-b from-[#182c26] via-[#11201b] to-[#0b1512] rounded-b-[10px] sm:rounded-b-[14px] shadow-md border-t border-[#d2f56d]/20 flex items-center justify-center">
        <div className="w-16 sm:w-20 h-1 bg-[#d2f56d]/30 rounded-full" />
      </div>

      {/* Glowing 3D Tech Lime & Pine Shield */}
      <div className="absolute -right-3 sm:-right-5 bottom-4 sm:bottom-6 z-20 pointer-events-none select-none">
        <div className="relative w-11 h-12 sm:w-14 sm:h-16 flex items-center justify-center filter drop-shadow-[0_10px_20px_rgba(39,76,59,0.45)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#d2f56d] via-[#274c3b] to-[#182c26] rounded-2xl rotate-45 transform scale-90 border-2 border-white/60 shadow-inner" />
          <Check className="relative w-6 h-6 sm:w-7 sm:h-7 text-[#d2f56d] stroke-[3.5] z-10" />
        </div>
      </div>

    </div>
  );
};
