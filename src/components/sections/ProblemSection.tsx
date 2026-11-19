'use client';

import React from 'react';
import { MessageSquareOff, HelpCircle, Layers, ArrowRight } from 'lucide-react';

interface ProblemSectionProps {
  onOpenBooking: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking }) => {
  const problems = [
    {
      quote: '“Any update on my request?”',
      title: 'Scattered Customer Requests',
      problem: 'Your customers call or message repeatedly because they don’t have one central place to check real-time progress.',
      solution: 'Give clients a dedicated, branded mobile app and web portal to submit tickets and follow every status change.',
      icon: MessageSquareOff,
      badge: 'Unorganized Channels',
    },
    {
      quote: '“Did you get my approval?”',
      title: 'Endless Follow-Ups & Lost Quotes',
      problem: 'Quotes, scopes, revisions, and client approvals get buried across text messages, personal emails, and voicemail.',
      solution: 'Keep quotes, digital approvals, and change requests connected in one seamless client-facing dashboard.',
      icon: HelpCircle,
      badge: 'Delayed Approvals',
    },
    {
      quote: '“Wait, which job is still pending?”',
      title: 'Quotes and Payment Confusion',
      problem: 'You’re juggling technical support tickets, payment collection, and status updates while trying to grow your business.',
      solution: 'Bring ticket tracking, approvals, and payment workflows together into one unified experience.',
      icon: Layers,
      badge: 'Administrative Chaos',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            The MSP Customer Experience Gap
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Great IT Support Shouldn&apos;t Feel Disorganized.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            You may be excellent at fixing technical problems. But when customers can&apos;t see what&apos;s happening, even great service can feel frustrating. Sound familiar?
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-6 sm:p-8 bg-[#FCFAFB] border border-pink-100/80 shadow-xs hover:shadow-card-soft hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white text-brand-700 border border-pink-100 shadow-xs flex items-center justify-center">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-bold text-brand-800/80 bg-brand-50 px-3 py-1 rounded-full border border-pink-200/50">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 italic text-brand-900">
                    {card.quote}
                  </h3>
                  
                  <h4 className="text-sm font-extrabold text-slate-800 mb-2">
                    {card.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {card.problem}
                  </p>
                </div>

                <div className="pt-4 border-t border-pink-100/70">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    With JIT Helpdesk:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-normal">
                    {card.solution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transition Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Your technical skills aren&apos;t the problem.
            </h3>
            <p className="text-sm text-pink-100/90 mt-1 max-w-xl">
              Your customer experience needs a better system. That&apos;s where JIT Helpdesk comes in.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="cta-glow-btn px-5 sm:px-6 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
