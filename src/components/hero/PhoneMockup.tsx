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
        <div className="px-3 py-1 rounded-full bg-[#182c26] text-[#d2f56d] text-[10px] font-extrabold shadow-md flex items-center gap-1.5 border border-[#d2f56d]/30 animate-bounce">
          <Sparkles className="w-3 h-3 text-[#d2f56d]" />
          <span>Interactive App (Tap to Test)</span>
        </div>
      </div>

      {/* Phone Hardware Shell - Jewar Obsidian Pine */}
      <div className="relative rounded-[46px] p-[10px] bg-gradient-to-b from-[#182c26] via-[#11201b] to-[#0b1512] shadow-[0_25px_60px_-15px_rgba(24,44,38,0.55),0_0_0_1px_rgba(210,245,109,0.15)] ring-1 ring-black/40">
        
        {/* Outer Bezel & Side Buttons */}
        <div className="absolute -left-[12px] top-[110px] w-[3px] h-[32px] bg-[#274c3b] rounded-l" />
        <div className="absolute -left-[12px] top-[155px] w-[3px] h-[48px] bg-[#274c3b] rounded-l" />
        <div className="absolute -left-[12px] top-[215px] w-[3px] h-[48px] bg-[#274c3b] rounded-l" />
        <div className="absolute -right-[12px] top-[140px] w-[3px] h-[64px] bg-[#274c3b] rounded-r" />

        {/* Screen Display */}
        <div className="relative overflow-hidden rounded-[38px] bg-[#f6f6ef] text-[#182c26] flex flex-col h-[580px] shadow-inner border border-white/40">
          
          {/* Status Bar */}
          <div className="pt-3 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-[#182c26] shrink-0">
            <span>9:41</span>
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-[#182c26] rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-[#182c26]" />
            </div>
          </div>

          {/* Toast Notification Banner */}
          {ticketNotice && (
            <div className="mx-4 mt-1.5 p-2 rounded-xl bg-[#274c3b] text-[#d2f56d] text-[11px] font-extrabold flex items-center justify-between shadow-lg animate-in slide-in-from-top-2 duration-200 z-20 border border-[#d2f56d]/30">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#d2f56d]" />
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
                  src="/brand/jewar_emblem.png"
                  alt="Jewar Logo"
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>
              <span className="font-extrabold text-xs tracking-tight text-[#182c26] font-display">
                JIT Helpdesk
              </span>
            </div>
            
            <button
              onClick={() => handleNewTicket()}
              className="p-1.5 rounded-full hover:bg-[#dce3d4] text-[#182c26] transition-colors"
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
                  <h2 className="text-base font-extrabold text-[#182c26] tracking-tight leading-tight">
                    Welcome Back!
                  </h2>
                  <p className="text-[11px] text-[#61705f] font-medium">Get instant client support, anytime.</p>
                </div>

                {/* New Support Request Primary Interactive Button */}
                <div>
                  <button
                    onClick={handleNewTicket}
                    className="w-full py-2.5 px-4 rounded-full bg-[#182c26] hover:bg-[#274c3b] active:scale-[0.98] text-[#d2f56d] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(24,44,38,0.35)] transition-all cursor-pointer border border-[#d2f56d]/30"
                  >
                    <span>New Support Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Loyalty Rewards & Coins Card (Ad Angle 2: Points like Starbucks) */}
                <div
                  onClick={() => setTicketNotice('450 Loyalty Coins available! ($50 credit applied to next retainer)')}
                  className="p-2.5 rounded-2xl bg-gradient-to-r from-[#182c26] via-[#203a30] to-[#182c26] text-white border border-[#d2f56d]/30 shadow-xs cursor-pointer hover:border-[#d2f56d] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#d2f56d] text-[#182c26] font-black text-xs flex items-center justify-center shadow-xs">
                      🪙
                    </div>
                    <div>
                      <div className="text-[10px] text-[#d2f56d] font-extrabold uppercase tracking-wider">
                        Client Loyalty Coins
                      </div>
                      <div className="text-xs font-black text-white">450 Points Earned</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-[#d2f56d] border border-white/20 shrink-0">
                    $50 Credit
                  </span>
                </div>

                {/* 2x2 Quick Action Interactive Tiles */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Tile 1: My Tickets */}
                  <div
                    onClick={() => setActiveTab('tickets')}
                    className="bg-white rounded-2xl p-2.5 border border-[#dce3d4] shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-[#274c3b] transition-all active:scale-[0.97]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#edf3e3] text-[#274c3b] flex items-center justify-center mb-1">
                      <Ticket className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] font-bold text-[#182c26]">My Tickets</div>
                    <div className="text-[10px] text-[#274c3b] font-bold">{tickets.length} Active</div>
                  </div>

                  {/* Tile 2: Quotes */}
                  <div
                    onClick={() => {
                      setQuoteApproved(!quoteApproved);
                      setTicketNotice(quoteApproved ? 'Quote marked pending' : 'Quote #Q-804 Approved ($1,250)!');
                    }}
                    className="bg-white rounded-2xl p-2.5 border border-[#dce3d4] shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-[#274c3b] transition-all active:scale-[0.97]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#edf3e3] text-[#274c3b] flex items-center justify-center mb-1">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] font-bold text-[#182c26]">Quotes</div>
                    <div className="text-[10px] font-bold text-emerald-700">
                      {quoteApproved ? 'Approved ✓' : '1 Pending'}
                    </div>
                  </div>

                  {/* Tile 3: Payments */}
                  <div
                    onClick={() => setActiveTab('pay')}
                    className="bg-white rounded-2xl p-2.5 border border-[#dce3d4] shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-[#274c3b] transition-all active:scale-[0.97]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#edf3e3] text-[#274c3b] flex items-center justify-center mb-1">
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] font-bold text-[#182c26]">Payments</div>
                    <div className="text-[10px] font-bold text-[#274c3b]">
                      {invoicePaid ? '0 Due' : '1 Due ($450)'}
                    </div>
                  </div>

                  {/* Tile 4: Track Progress */}
                  <div
                    onClick={() => setActiveTab('tickets')}
                    className="bg-white rounded-2xl p-2.5 border border-[#dce3d4] shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-[#274c3b] transition-all active:scale-[0.97]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#edf3e3] text-[#274c3b] flex items-center justify-center mb-1">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] font-bold text-[#182c26]">Track Progress</div>
                    <div className="text-[10px] text-emerald-700 font-bold">Live SLA: 100%</div>
                  </div>
                </div>

                {/* Recent Activity Card */}
                <div className="bg-white rounded-2xl p-3 border border-[#dce3d4] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-[#182c26]">Recent Activity</span>
                    <button onClick={() => setActiveTab('tickets')} className="text-[#274c3b] font-bold hover:underline flex items-center gap-0.5">
                      <span>View All</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {tickets.slice(0, 2).map((t, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveTab('tickets')}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#f6f6ef] hover:bg-[#edf3e3] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                            t.status === 'Resolved' ? 'bg-[#edf3e3] text-[#274c3b]' : 'bg-[#fff3dc] text-[#8c5e13]'
                          }`}>
                            <Check className="w-3 h-3" />
                          </div>
                          <div>
                            <div className="text-[10px] font-extrabold text-[#182c26]">{t.id} · {t.title}</div>
                            <div className="text-[9px] text-[#61705f]">{t.time} · {t.tech}</div>
                          </div>
                        </div>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                          t.status === 'Resolved' ? 'bg-[#edf3e3] text-[#274c3b]' : 'bg-[#fff3dc] text-[#8c5e13]'
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
                  <h3 className="text-sm font-extrabold text-[#182c26]">Support Tickets</h3>
                  <button
                    onClick={handleNewTicket}
                    className="px-2.5 py-1 bg-[#182c26] text-[#d2f56d] rounded-lg text-[10px] font-bold"
                  >
                    + New
                  </button>
                </div>

                <div className="space-y-2">
                  {tickets.map((t, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white border border-[#dce3d4] shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#274c3b]">{t.id}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          t.status === 'Resolved' ? 'bg-[#edf3e3] text-[#274c3b]' : 'bg-[#fff3dc] text-[#8c5e13]'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#182c26]">{t.title}</div>
                      <div className="text-[10px] text-[#61705f]">Tech: {t.tech} · {t.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PAYMENTS VIEW */}
            {activeTab === 'pay' && (
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-[#182c26]">Invoices &amp; Payments</h3>
                
                <div className="p-3.5 rounded-2xl bg-white border border-[#dce3d4] shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#61705f]">Monthly Managed IT</span>
                    <span className="text-xs font-extrabold text-[#182c26]">$450.00</span>
                  </div>
                  
                  <div className="text-[10px] text-[#61705f]">Invoice #INV-2026-11 · Due Nov 25, 2026</div>

                  <button
                    onClick={() => {
                      setInvoicePaid(true);
                      setTicketNotice('Invoice Paid! Receipt #REC-994 sent.');
                    }}
                    disabled={invoicePaid}
                    className={`w-full py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      invoicePaid
                        ? 'bg-[#edf3e3] text-[#274c3b] cursor-default'
                        : 'bg-[#182c26] text-[#d2f56d] hover:bg-[#274c3b]'
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
                <h3 className="text-sm font-extrabold text-[#182c26]">Client Account</h3>
                <div className="p-3 bg-white rounded-2xl border border-[#dce3d4] space-y-2 text-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#dce3d4]">
                    <div className="w-8 h-8 rounded-full bg-[#182c26] text-[#d2f56d] font-bold flex items-center justify-center">
                      AM
                    </div>
                    <div>
                      <div className="font-extrabold text-[#182c26]">Alex Miller</div>
                      <div className="text-[10px] text-[#61705f]">Apex Logistics LLC (Client)</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#61705f] space-y-1">
                    <div><strong>Plan:</strong> Enterprise 24/7 Managed IT</div>
                    <div><strong>Dedicated Tech:</strong> Marcus Sterling</div>
                    <div><strong>SLA Guarantee:</strong> &lt; 15 min response</div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom App Navigation Bar (Clickable tabs) */}
          <div className="pt-2 pb-5 px-4 bg-white/95 backdrop-blur-md border-t border-[#dce3d4] flex items-center justify-around shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeTab === 'home' ? 'text-[#274c3b] font-black' : 'text-[#61705f] hover:text-[#182c26]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[9px]">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeTab === 'tickets' ? 'text-[#274c3b] font-black' : 'text-[#61705f] hover:text-[#182c26]'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span className="text-[9px]">Tickets</span>
            </button>

            <button
              onClick={() => setActiveTab('pay')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeTab === 'pay' ? 'text-[#274c3b] font-black' : 'text-[#61705f] hover:text-[#182c26]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-[9px]">Payments</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeTab === 'profile' ? 'text-[#274c3b] font-black' : 'text-[#61705f] hover:text-[#182c26]'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-[9px]">Profile</span>
            </button>
          </div>

          {/* Home Indicator bar */}
          <div className="w-32 h-1 bg-[#182c26]/60 rounded-full mx-auto mb-2 shrink-0" />
        </div>
      </div>
    </div>
  );
};
