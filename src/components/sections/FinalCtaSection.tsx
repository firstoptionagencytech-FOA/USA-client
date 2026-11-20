'use client';

import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Headphones, Lock } from 'lucide-react';
import Link from 'next/link';

interface FinalCtaSectionProps {
  onOpenBooking: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBooking }) => {
  return (
    <footer className="relative bg-gradient-to-b from-[#11201b] via-[#182c26] to-[#0b1512] text-white pt-20 pb-12 px-4 overflow-hidden">
      
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-700/25 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Brand Kicker with Official Jewar Logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 text-[#d2f56d] text-xs font-bold uppercase tracking-wider mb-6">
          <img src="/brand/jewar_emblem.png" alt="Jewar Logo" className="w-4 h-4 object-contain" />
          <span>Jewar International Technologies</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-6 leading-tight">
          Your IT Business Deserves More Than Scattered Messages.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-4">
          Give customers a professional, branded place to work with you. Give your team a clearer way to manage service requests. And give yourself more room to focus on the work that matters.
        </p>

        <p className="text-lg sm:text-xl font-black text-white font-display mb-10 tracking-wide">
          Your Brand. Your Customers. Your Platform.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenBooking}
            className="cta-glow-btn group px-8 sm:px-9 py-3 sm:py-3.5 rounded-full text-white font-bold text-sm flex items-center gap-2.5 cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-white" />
            </div>
            <span>Book Your Free JIT Helpdesk Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <span className="text-xs text-[#edf3e3]/70 font-medium">
            For IT service business owners and decision-makers exploring a branded customer experience.
          </span>
        </div>

        {/* Bottom Legal & Navigation Bar */}
        <div className="pt-10 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#edf3e3]/60 gap-4">
          <div className="flex items-center gap-2">
            <img src="/brand/jewar_emblem.png" alt="Jewar Logo" className="w-4 h-4 object-contain inline shrink-0" />
            <span>© {new Date().getFullYear()} JIT Helpdesk. A product by Jewar International Technologies.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security Safeguards</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-[#d2f56d] hover:text-white font-semibold underline underline-offset-4"
            >
              <Lock className="w-3 h-3" />
              <span>CRM Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
