'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, Building, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
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
  const [formError, setFormError] = useState('');

  // Field-specific validation errors
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  }>({});

  // Validation Engine
  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    // 1. Full Name: at least 2 chars, letters allowed
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      errors.name = 'Full name is required.';
    } else if (trimmedName.length < 2) {
      errors.name = 'Please enter at least 2 characters.';
    }

    // 2. Email: standard valid email check (accepts Gmail, Yahoo, Outlook, custom domain, etc.)
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    // 3. Phone: raw numbers with optional + (e.g. +91..., +1..., or plain digits)
    const digits = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (digits.length < 7) {
      errors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    // 4. Company Name: required
    const trimmedCompany = companyName.trim();
    if (!trimmedCompany) {
      errors.company = 'Company name is required.';
    } else if (trimmedCompany.length < 2) {
      errors.company = 'Please enter at least 2 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) {
      setFormError('Please resolve the highlighted fields below.');
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
          email: email.trim().toLowerCase(),
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
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        company_name: companyName.trim(),
      });
    } catch (err: any) {
      setFormError(err.message || 'Something went wrong. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-7">
      <div className="text-center mb-4 sm:mb-6">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-700 bg-[#edf3e3] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#dce3d4]">
          Step 1 of 3: Contact Details
        </span>
        <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1.5 font-display">
          Schedule Your Free Personalized Demo
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
          Tell us where to send your calendar invite and customized demo workspace link.
        </p>
      </div>

      {formError && (
        <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Full Name */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">
              Full Name <span className="text-rose-500">*</span>
            </label>
            {fieldErrors.name && (
              <span className="text-[11px] font-semibold text-rose-600">{fieldErrors.name}</span>
            )}
          </div>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={fullName}
              onChange={e => {
                setFullName(e.target.value);
                if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: undefined }));
              }}
              placeholder="e.g. David Miller"
              className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border text-base sm:text-sm focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                fieldErrors.name
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500'
                  : 'border-slate-200 focus:ring-2 focus:ring-brand-700 focus:border-brand-700'
              }`}
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">
              Email Address <span className="text-rose-500">*</span>
            </label>
            {fieldErrors.email && (
              <span className="text-[11px] font-semibold text-rose-600">{fieldErrors.email}</span>
            )}
          </div>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
              }}
              placeholder="e.g. alex@gmail.com or david@company.com"
              className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border text-base sm:text-sm focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                fieldErrors.email
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500'
                  : 'border-slate-200 focus:ring-2 focus:ring-brand-700 focus:border-brand-700'
              }`}
            />
          </div>
        </div>

        {/* Direct Phone (Plain numbers with optional + country code) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            {fieldErrors.phone && (
              <span className="text-[11px] font-semibold text-rose-600">{fieldErrors.phone}</span>
            )}
          </div>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={phone}
              onChange={e => {
                setPhone(e.target.value);
                if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: undefined }));
              }}
              placeholder="e.g. 9876543210 or +91 9876543210 or +1 5553456789"
              className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border text-base sm:text-sm focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                fieldErrors.phone
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500'
                  : 'border-slate-200 focus:ring-2 focus:ring-brand-700 focus:border-brand-700'
              }`}
            />
          </div>
        </div>

        {/* Company Name */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-slate-700">
              Business / Company Name <span className="text-rose-500">*</span>
            </label>
            {fieldErrors.company && (
              <span className="text-[11px] font-semibold text-rose-600">{fieldErrors.company}</span>
            )}
          </div>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={companyName}
              onChange={e => {
                setCompanyName(e.target.value);
                if (fieldErrors.company) setFieldErrors(prev => ({ ...prev, company: undefined }));
              }}
              placeholder="e.g. Apex Managed Systems"
              className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border text-base sm:text-sm focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                fieldErrors.company
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500'
                  : 'border-slate-200 focus:ring-2 focus:ring-brand-700 focus:border-brand-700'
              }`}
            />
          </div>
        </div>

        {/* Security and Privacy Assurance */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Strictly confidential. No spam, guaranteed.</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="cta-glow-btn w-full min-h-[46px] sm:min-h-[48px] py-3 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer mt-2.5 shadow-md"
        >
          <span>{loading ? 'Securing Spot...' : 'Continue to Quick Qualification'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
