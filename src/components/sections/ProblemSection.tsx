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

        {/* 3 Rich Visual Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Scattered Customer Requests */}
          <div className="group rounded-3xl p-6 sm:p-8 bg-[#f6f6ef] border border-[#dce3d4] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 hover:border-[#274c3b] hover:bg-white transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                {/* 3D Glass Icon Badge in Jewar Pine & Lime */}
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquareOff className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-[#182c26] bg-[#edf3e3] px-3 py-1 rounded-full border border-[#dce3d4]">
                  Unorganized Channels
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#182c26] mb-1 italic">
                “Any update on my request?”
              </h3>
              
              <h4 className="text-sm font-extrabold text-[#274c3b] mb-2">
                Scattered Customer Requests
              </h4>

              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Your customers call or message repeatedly across WhatsApp, personal emails, and texts because they don’t have one central place to check real-time progress.
              </p>

              {/* Visual Interactive UI Snippet */}
              <div className="my-4 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs space-y-2">
                <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50 border border-rose-200/60 text-[10px] text-rose-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    3 Missed Texts + 2 Voicemails
                  </span>
                  <span className="text-rose-600 uppercase text-[9px]">Lost</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#edf3e3] border border-[#dce3d4] text-[10px] text-[#274c3b] font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#274c3b]" />
                    Ticket #1024 Assigned &amp; In Progress
                  </span>
                  <span className="text-[#274c3b] bg-white px-1.5 py-0.5 rounded text-[9px] shadow-2xs">Active</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] group-hover:border-[#274c3b]/30 transition-colors">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                <span>With JIT Helpdesk:</span>
              </div>
              <p className="text-xs text-[#182c26] font-medium leading-normal">
                Give clients a dedicated, branded mobile app and web portal to submit tickets and follow every status change.
              </p>
            </div>
          </div>

          {/* Card 2: Endless Follow-Ups & Lost Quotes */}
          <div className="group rounded-3xl p-6 sm:p-8 bg-[#f6f6ef] border border-[#dce3d4] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 hover:border-[#274c3b] hover:bg-white transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                {/* 3D Glass Icon Badge in Jewar Pine & Lime */}
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <FileCheck2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-[#182c26] bg-[#edf3e3] px-3 py-1 rounded-full border border-[#dce3d4]">
                  Delayed Approvals
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#182c26] mb-1 italic">
                “Did you get my approval?”
              </h3>
              
              <h4 className="text-sm font-extrabold text-[#274c3b] mb-2">
                Endless Follow-Ups &amp; Lost Quotes
              </h4>

              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                Quotes, scopes, revisions, and client approvals get buried across text messages and PDF attachments without a definitive sign-off audit trail.
              </p>

              {/* Visual Interactive UI Snippet */}
              <div className="my-4 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#182c26]">
                  <span>Quote #Q-804: Managed IT Scope</span>
                  <span className="text-[#274c3b] font-black">$1,250</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#182c26] text-[#d2f56d] text-[10px] font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d2f56d]" />
                    Approved by Client in 1-Click
                  </span>
                  <span className="bg-[#274c3b] text-white px-2 py-0.5 rounded text-[9px]">Verified</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] group-hover:border-[#274c3b]/30 transition-colors">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                <span>With JIT Helpdesk:</span>
              </div>
              <p className="text-xs text-[#182c26] font-medium leading-normal">
                Keep quotes, digital approvals, and change requests connected in one seamless client-facing dashboard.
              </p>
            </div>
          </div>

          {/* Card 3: Quotes and Payment Confusion */}
          <div className="group rounded-3xl p-6 sm:p-8 bg-[#f6f6ef] border border-[#dce3d4] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(24,44,38,0.15)] hover:-translate-y-2 hover:border-[#274c3b] hover:bg-white transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                {/* 3D Glass Icon Badge in Jewar Pine & Lime */}
                <div className="w-13 h-13 rounded-2xl bg-[#182c26] text-[#d2f56d] border border-[#d2f56d]/30 shadow-md flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-[#182c26] bg-[#edf3e3] px-3 py-1 rounded-full border border-[#dce3d4]">
                  Administrative Chaos
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#182c26] mb-1 italic">
                “Wait, which job is still pending?”
              </h3>
              
              <h4 className="text-sm font-extrabold text-[#274c3b] mb-2">
                Quotes and Payment Confusion
              </h4>

              <p className="text-xs sm:text-sm text-[#61705f] leading-relaxed mb-4">
                You’re juggling technical support tickets, payment collection, and status updates while trying to grow your business without dropped balls.
              </p>

              {/* Visual Interactive UI Snippet */}
              <div className="my-4 p-3 rounded-2xl bg-white border border-[#dce3d4] shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#182c26]">
                  <span>Monthly Managed IT Invoice</span>
                  <span className="text-[#274c3b] font-black">$450.00</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Apple Pay Succeeded · Receipt Sent
                  </span>
                  <span className="text-emerald-700 bg-white px-1.5 py-0.5 rounded text-[9px] shadow-2xs">0 Due</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dce3d4] group-hover:border-[#274c3b]/30 transition-colors">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                <span>With JIT Helpdesk:</span>
              </div>
              <p className="text-xs text-[#182c26] font-medium leading-normal">
                Bring ticket tracking, approvals, and payment workflows together into one unified experience.
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
