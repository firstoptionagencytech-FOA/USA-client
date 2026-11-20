'use client';

import React, { useState } from 'react';
import {
  Bell,
  ArrowRight,
  Ticket,
  FileText,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Home,
  User,
  Wifi,
  Signal,
  Battery,
  Sparkles,
  Check,
  X,
  Clock,
} from 'lucide-react';

export const PhoneMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'tickets' | 'pay' | 'profile'>('home');
  const [ticketNotice, setTicketNotice] = useState<string | null>(null);
  const [quoteApproved, setQuoteApproved] = useState(false);
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [tickets, setTickets] = useState([
    { id: '#1024', title: 'Software Update', time: '2h ago', status: 'Resolved', tech: 'Marcus S.' },
    { id: '#1021', title: 'VPN Connection Setup', time: '1d ago', status: 'Resolved', tech: 'Marcus S.' },
  ]);

  const handleNewTicket = () => {
    const newId = `#102${tickets.length + 5}`;
    const newTicket = {
      id: newId,
      title: 'Cloud Backup Sync',
      time: 'Just now',
      status: 'In Progress',
      tech: 'L2 Tech Assigned',
    };
    setTickets([newTicket, ...tickets]);
    setTicketNotice(`Ticket ${newId} Created! Tech Assigned.`);
    setTimeout(() => setTicketNotice(null), 3500);
  };

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px] md:w-[316px] shrink-0 select-none">
      
      {/* Floating Interactive Badge */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
        <div className="px-3 py-1 rounded-full bg-[#0F172A] text-white text-[10px] font-extrabold shadow-md flex items-center gap-1.5 border border-blue-400/40 animate-bounce">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span>Interactive App (Tap to Test)</span>
        </div>
      </div>

      {/* Phone Hardware Shell */}
      <div className="relative rounded-[46px] p-[10px] bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.6),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/40">
        
        {/* Outer Bezel & Side Buttons */}
        <div className="absolute -left-[12px] top-[110px] w-[3px] h-[32px] bg-[#334155] rounded-l" />
        <div className="absolute -left-[12px] top-[155px] w-[3px] h-[48px] bg-[#334155] rounded-l" />
        <div className="absolute -left-[12px] top-[215px] w-[3px] h-[48px] bg-[#334155] rounded-l" />
        <div className="absolute -right-[12px] top-[140px] w-[3px] h-[64px] bg-[#334155] rounded-r" />

        {/* Screen Display */}
        <div className="relative overflow-hidden rounded-[38px] bg-[#F8FAFC] text-slate-800 flex flex-col h-[580px] shadow-inner border border-white/40">
          
          {/* Status Bar */}
          <div className="pt-3 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-slate-800 shrink-0">
            <span>9:41</span>
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-slate-800" />
            </div>
          </div>

          {/* Toast Notification Banner */}
          {ticketNotice && (
            <div className="mx-4 mt-1.5 p-2 rounded-xl bg-emerald-600 text-white text-[11px] font-extrabold flex items-center justify-between shadow-lg animate-in slide-in-from-top-2 duration-200 z-20">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{ticketNotice}</span>
              </div>
              <button onClick={() => setTicketNotice(null)} className="opacity-80 hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* App Header with Logo */}
          <div className="px-5 pt-2 pb-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                <img
                  src="/brand/jit_headset_emblem_transparent.png"
                  alt="JIT Helpdesk Logo"
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>
              <span className="font-extrabold text-xs tracking-tight text-slate-900 font-display">
                JIT Helpdesk
              </span>
            </div>
            
            <button
              onClick={() => handleNewTicket()}
              className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-600 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Viewport Content */}
          <div className="px-4 py-1.5 flex-1 overflow-y-auto no-scrollbar">
            
            {/* TAB 1: HOME */}
            {activeTab === 'home' && (
              <div className="space-y-3">
                {/* Welcome banner */}
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                    Welcome Back!
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium">Get instant client support, anytime.</p>
                </div>

                {/* New Support Request Primary Interactive Button */}
                <div>
                  <button
                    onClick={handleNewTicket}
                    className="w-full py-2.5 px-4 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all cursor-pointer"
                  >
                    <span>New Support Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2x2 Quick Action Interactive Tiles */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Tile 1: My Tickets */}
                  <div
                    onClick={() => setActiveTab('tickets')}
                    className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-blue-400 transition-all active:scale-[0.97]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
                      <Ticket className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">My Tickets</div>
                    <div className="text-[10px] text-blue-600 font-bold">{tickets.length} Active</div>
                  </div>

                  {/* Tile 2: Quotes */}
                  <div
                    onClick={() => {
                      setQuoteApproved(!quoteApproved);
                      setTicketNotice(quoteApproved ? 'Quote marked pending' : 'Quote #Q-804 Approved ($1,250)!');
                    }}
                    className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-blue-400 transition-all active:scale-[0.97]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">Quotes</div>
                    <div className="text-[10px] font-bold text-emerald-600">
                      {quoteApproved ? 'Approved ✓' : '1 Pending'}
                    </div>
                  </div>

                  {/* Tile 3: Payments */}
                  <div
                    onClick={() => setActiveTab('pay')}
                    className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-blue-400 transition-all active:scale-[0.97]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">Payments</div>
                    <div className="text-[10px] font-bold text-blue-600">
                      {invoicePaid ? '0 Due' : '1 Due ($450)'}
                    </div>
                  </div>

                  {/* Tile 4: Track Progress */}
                  <div
                    onClick={() => setActiveTab('tickets')}
                    className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-blue-400 transition-all active:scale-[0.97]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-1">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">Track Progress</div>
                    <div className="text-[10px] text-emerald-700 font-bold">Live SLA: 100%</div>
                  </div>
                </div>

                {/* Recent Activity Card */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-slate-900">Recent Activity</span>
                    <button onClick={() => setActiveTab('tickets')} className="text-blue-600 font-bold hover:underline flex items-center gap-0.5">
                      <span>View All</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {tickets.slice(0, 2).map((t, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveTab('tickets')}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                            t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            <Check className="w-3 h-3" />
                          </div>
                          <div>
                            <div className="text-[10px] font-extrabold text-slate-900">{t.id} · {t.title}</div>
                            <div className="text-[9px] text-slate-400">{t.time} · {t.tech}</div>
                          </div>
                        </div>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                          t.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TICKETS VIEW */}
            {activeTab === 'tickets' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">Support Tickets</h3>
                  <button
                    onClick={handleNewTicket}
                    className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold"
                  >
                    + New
                  </button>
                </div>

                <div className="space-y-2">
                  {tickets.map((t, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-blue-900">{t.id}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900">{t.title}</div>
                      <div className="text-[10px] text-slate-500">Tech: {t.tech} · {t.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PAYMENTS VIEW */}
            {activeTab === 'pay' && (
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900">Invoices &amp; Payments</h3>
                
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Monthly Managed IT</span>
                    <span className="text-xs font-extrabold text-slate-900">$450.00</span>
                  </div>
                  
                  <div className="text-[10px] text-slate-500">Invoice #INV-2026-11 · Due Nov 25, 2026</div>

                  <button
                    onClick={() => {
                      setInvoicePaid(true);
                      setTicketNotice('Invoice Paid! Receipt #REC-994 sent.');
                    }}
                    disabled={invoicePaid}
                    className={`w-full py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      invoicePaid
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {invoicePaid ? 'Paid Successfully ✓' : 'Pay with Apple Pay ($450.00)'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: PROFILE VIEW */}
            {activeTab === 'profile' && (
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900">Client Account</h3>
                <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                      AM
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">Alex Miller</div>
                      <div className="text-[10px] text-slate-500">Apex Logistics LLC (Client)</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1">
                    <div><strong>Plan:</strong> Enterprise 24/7 Managed IT</div>
                    <div><strong>Dedicated Tech:</strong> Marcus Sterling</div>
                    <div><strong>SLA Guarantee:</strong> &lt; 15 min response</div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom App Navigation Bar (Clickable tabs) */}
          <div className="pt-2 pb-5 px-4 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-around shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeTab === 'home' ? 'text-blue-600 font-black' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[9px]">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeTab === 'tickets' ? 'text-blue-600 font-black' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span className="text-[9px]">Tickets</span>
            </button>

            <button
              onClick={() => setActiveTab('pay')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeTab === 'pay' ? 'text-blue-600 font-black' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-[9px]">Payments</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeTab === 'profile' ? 'text-blue-600 font-black' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-[9px]">Profile</span>
            </button>
          </div>

          {/* Home Indicator bar */}
          <div className="w-32 h-1 bg-black/60 rounded-full mx-auto mb-2 shrink-0" />
        </div>
      </div>
    </div>
  );
};
