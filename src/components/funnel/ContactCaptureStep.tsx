'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, Building, ArrowRight, ShieldCheck } from 'lucide-react';
import { extractUtmParams, trackMetaEvent } from '@/lib/meta-pixel';

interface ContactCaptureStepProps {
  onSuccess: (leadId: string, initialData: { full_name: string; email: string; phone: string; company_name: string }) => void;
}

export const ContactCaptureStep: React.FC<ContactCaptureStepProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid business email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid direct phone number.');
      return;
    }

    setLoading(true);

    try {
      const utmParams = extractUtmParams();

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company_name: companyName.trim(),
          utm_params: utmParams,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit contact information.');
      }

      // Track Meta Pixel Lead event
      trackMetaEvent('Lead', {
        content_name: 'Contact Information Captured',
        lead_id: data.lead.id,
      }, data.lead.id);

      // Track SurveyStart
      trackMetaEvent('SurveyStart', {
        lead_id: data.lead.id,
      });

      onSuccess(data.lead.id, {
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company_name: companyName.trim(),
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-[#edf3e3] px-3 py-1 rounded-full border border-[#dce3d4]">
          Step 1 of 3: Contact Details
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-2 font-display">
          Schedule Your Free Personalized Demo
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Tell us where to send your calendar invite and customized demo workspace link.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="e.g. David Miller"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Business Email */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Business Email <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. david@apex-it-services.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Direct Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Phone Number (for SMS confirmation) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="e.g. (555) 345-6789"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Business / Company Name
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="e.g. Apex Managed Systems"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Security and Privacy Assurance */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Your contact info is strictly confidential. Zero spam.</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="cta-glow-btn w-full py-4 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer mt-4"
        >
          <span>{loading ? 'Securing Spot...' : 'Continue to Quick Qualification'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
