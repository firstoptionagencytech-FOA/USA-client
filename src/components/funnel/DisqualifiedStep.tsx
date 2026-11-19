'use client';

import React from 'react';
import { BookOpen, CheckCircle, ExternalLink, X } from 'lucide-react';

interface DisqualifiedStepProps {
  reason?: string;
  onClose: () => void;
}

export const DisqualifiedStep: React.FC<DisqualifiedStepProps> = ({ reason, onClose }) => {
  return (
    <div className="p-6 sm:p-8 text-center">
      
      {/* Icon Badge */}
      <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200/60 flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-7 h-7 stroke-[2]" />
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mb-2">
        Thank You for Your Interest in JIT Helpdesk
      </h3>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
        {reason ||
          'At this time, JIT Helpdesk live onboarding is dedicated exclusively to commercial IT support providers and MSPs with active paying customer bases.'}
      </div>

      <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
        We have saved your details. Our team will send you our complete MSP Product & Customer Experience Architecture Whitepaper so you can explore the concepts at your own pace.
      </p>

      {/* Alternative Self-Service Actions */}
      <div className="space-y-2.5 max-w-xs mx-auto mb-8">
        <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-left font-semibold text-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Architecture Whitepaper (PDF)</span>
          </div>
          <span className="text-[10px] text-brand-700 font-bold">Sent to Email</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-left font-semibold text-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Self-Guided Video Overview</span>
          </div>
          <span className="text-[10px] text-brand-700 font-bold">Available 24/7</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
      >
        Close & Return to Website
      </button>

    </div>
  );
};
