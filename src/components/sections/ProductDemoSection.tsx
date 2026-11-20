'use client';

import React, { useState } from 'react';
import {
  Play,
  CheckCircle,
  FileText,
  CreditCard,
  Laptop,
  Smartphone,
  ArrowRight,
  ShieldAlert,
  Clock,
  Sparkles
} from 'lucide-react';

interface ProductDemoSectionProps {
  onOpenBooking: () => void;
}

export const ProductDemoSection: React.FC<ProductDemoSectionProps> = ({ onOpenBooking }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: '1. Customer Submits Request',
      subtitle: 'Branded Mobile App & Web Portal',
      caption: 'Client opens your branded app, selects their device, describes the issue, and uploads diagnostic screenshots.',
      tag: 'Client App',
      icon: Smartphone,
      preview: {
        header: 'New Service Request',
        device: 'MacBook Pro M2 — Kernel Panic on Wake',
        severity: 'High Priority',
        status: 'Submitted via Mobile App',
        note: 'Customer: "Screen freezes whenever external monitor is plugged in via USB-C."',
      },
    },
    {
      id: 1,
      title: '2. Owner Reviews & Prepares Quote',
      subtitle: 'Owner Admin Dashboard',
      caption: 'Your team triages the request, allocates an technician, sets the timeline, and attaches a fixed-price quote.',
      tag: 'Owner Dashboard',
      icon: Laptop,
      preview: {
        header: 'Ticket #1024 — Quote Generation',
        device: 'Logic Board Diagnostics & Firmware Flash',
        severity: 'Labor: 1.5h · Parts: N/A',
        status: 'Quote Sent: $250.00',
        note: 'Estimated turnaround: 24 Hours. Digital invoice prepared.',
      },
    },
    {
      id: 2,
      title: '3. Customer Approves Online',
      subtitle: 'One-Click Digital Approval',
      caption: 'Client receives instant push notification & email, reviews the itemized scope, and digitally signs approval.',
      tag: 'Digital Approval',
      icon: FileText,
      preview: {
        header: 'Quote #Q-8820 Approved',
        device: 'Authorized by Michael Vance (Director of Ops)',
        severity: 'Terms Accepted: Yes',
        status: 'Approved at 10:14 AM EST',
        note: 'Work authorized to proceed immediately without waiting for callback.',
      },
    },
    {
      id: 3,
      title: '4. Integrated Payment & Service',
      subtitle: 'Secure Payment Flow',
      caption: 'Customer completes payment through your connected gateway. Ticket automatically transitions to "In Progress".',
      tag: 'Connected Payment',
      icon: CreditCard,
      preview: {
        header: 'Payment Received ($250.00)',
        device: 'Stripe / Merchant Gateway Verified',
        severity: 'Receipt #RCP-9021 Issued',
        status: 'Status: In Progress · Bench Tested',
        note: 'Sample transaction shown for demonstration.',
      },
    },
    {
      id: 4,
      title: '5. Real-Time Tracking & Completion',
      subtitle: 'Live Milestone Updates',
      caption: 'Client tracks hardware testing, OS reinstallation, and final bench verification directly in their portal.',
      tag: 'Live Tracking',
      icon: CheckCircle,
      preview: {
        header: 'Ticket #1024 — Resolved & Picked Up',
        device: 'Stress test passed: 100% stable',
        severity: 'Customer Rating: 5/5 Stars',
        status: 'Archived to Customer History',
        note: 'Client satisfaction recorded. Referral prompt unlocked.',
      },
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#F8FAFC] border-y border-slate-200 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Interactive Software Walkthrough</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            See the Complete Support Lifecycle in Action.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Follow a real customer request from mobile submission to quote approval, payment, and final resolution.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-700 text-white shadow-md shadow-brand-900/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-brand-700'}`} />
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">Step {idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Software Walkthrough Stage */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
          
          {/* Top Browser Bar */}
          <div className="bg-slate-900 text-slate-300 px-5 py-3 flex items-center justify-between text-xs border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>
              <span className="font-mono text-[11px] text-slate-400 ml-2 hidden sm:inline">
                https://portal.youritcompany.com/workspace
              </span>
            </div>
            
            <span className="px-2.5 py-0.5 rounded-full bg-brand-800/80 text-blue-300 text-[10px] font-bold tracking-wider uppercase">
              Illustrative Interactive Preview
            </span>
          </div>

          {/* Main Stage Display */}
          <div className="p-6 sm:p-10 bg-gradient-to-br from-[#F8FAFC] to-white min-h-[340px] flex flex-col justify-between">
            
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200/50 text-xs font-bold">
                  {steps[activeStep].tag}
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Stage {activeStep + 1} of 5
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mb-2">
                {steps[activeStep].subtitle}
              </h3>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {steps[activeStep].caption}
              </p>

              {/* Realistic Mockup Ticket Detail Box */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {steps[activeStep].preview.header}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {steps[activeStep].preview.device}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs inline-block w-fit">
                    {steps[activeStep].preview.status}
                  </span>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
                  <span className="font-semibold text-brand-800">
                    {steps[activeStep].preview.severity}
                  </span>
                  <span className="italic text-slate-500">
                    {steps[activeStep].preview.note}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                ← Previous Stage
              </button>

              <button
                onClick={() => setActiveStep(prev => (prev + 1) % steps.length)}
                className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>{activeStep === steps.length - 1 ? 'Replay Walkthrough' : 'Next Stage'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Compliance & Demo Disclaimer */}
          <div className="bg-slate-50 px-6 py-2.5 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-center gap-1.5 text-center">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Interactive walkthrough uses simulated data. Live payment gateways and tenant branding are configured during onboarding.</span>
          </div>

        </div>

        {/* CTA Immediately Below Demo */}
        <div className="text-center mt-10">
          <button
            onClick={onOpenBooking}
            className="cta-glow-btn px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            <span>See How JIT Helpdesk Works — Book a Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
