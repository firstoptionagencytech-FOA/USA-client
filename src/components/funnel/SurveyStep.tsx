'use client';

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { SurveyAnswers } from '@/types';
import { trackMetaEvent } from '@/lib/meta-pixel';

interface SurveyStepProps {
  leadId: string;
  surveyMode?: '5_questions' | '3_questions';
  onCompleted: (isQualified: boolean, answers: SurveyAnswers, disqualificationReason?: string) => void;
  onBack: () => void;
}

export const SurveyStep: React.FC<SurveyStepProps> = ({
  leadId,
  surveyMode = '5_questions',
  onCompleted,
  onBack,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [selectedInCurrentQ, setSelectedInCurrentQ] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 5 Questions from Task Specification
  const questions5 = [
    {
      key: 'business_type',
      question: 'What type of business do you operate?',
      description: 'JIT Helpdesk is purpose-built for commercial IT service providers.',
      options: [
        'IT support / Managed IT services',
        'Computer repair / Onsite IT services',
        'Independent IT consultant',
        'Internal corporate IT department',
        'Other',
      ],
    },
    {
      key: 'role',
      question: 'What is your role within the company?',
      description: 'Helps us tailor your personalized demo walkthrough.',
      options: [
        'Owner / Founder',
        'Partner / Director',
        'Operations / Support Manager',
        'Other',
      ],
    },
    {
      key: 'serving_paying_clients',
      question: 'Do you currently serve paying IT support customers?',
      description: 'Our platform is designed for businesses with active customer ticketing.',
      options: [
        'Yes, regularly',
        'Yes, occasionally',
        'Not yet',
      ],
    },
    {
      key: 'budget_fit',
      question: 'Is $400 setup + $200/month within your budget?',
      description: 'All-inclusive flat package with unlimited technician seats.',
      options: [
        'Yes',
        'Possibly, after a demo',
        'No',
      ],
    },
    {
      key: 'timeline',
      question: 'When are you considering implementation?',
      description: 'Ensures we reserve engineering onboarding capacity for you.',
      options: [
        'Within 30 days',
        'Within 1–3 months',
        'Later / researching',
      ],
    },
  ];

  // 3-Question Alternative Mode
  const questions3 = [
    questions5[0], // business_type
    questions5[2], // serving_paying_clients
    questions5[3], // budget_fit
  ];

  const activeQuestions = surveyMode === '3_questions' ? questions3 : questions5;
  const currentQ = activeQuestions[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / activeQuestions.length) * 100);
  const optionKeys = ['A', 'B', 'C', 'D', 'E'];

  // Instant 1-Click Auto-Advance Handler (No manual continue button needed!)
  const handleOptionClick = async (option: string) => {
    setSelectedInCurrentQ(option);
    setError('');

    const updatedAnswers = {
      ...answers,
      [currentQ.key]: option,
    };
    setAnswers(updatedAnswers);

    // If there are more questions, auto-advance smoothly after 200ms visual confirmation
    if (currentIdx < activeQuestions.length - 1) {
      setTimeout(() => {
        setSelectedInCurrentQ(null);
        setCurrentIdx(prev => prev + 1);
      }, 220);
      return;
    }

    // Final Question: Auto-submit immediately
    setSubmitting(true);
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          answers: updatedAnswers,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit qualification answers.');
      }

      const isQualified = data.qualification.isQualified;

      if (isQualified) {
        trackMetaEvent('QualifiedLead', {
          content_name: 'Qualified IT Service Provider',
          lead_id: leadId,
          score: data.qualification.score,
        });
      }

      onCompleted(isQualified, updatedAnswers, data.qualification.disqualificationReason);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while evaluating your answers.');
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[460px] animate-in fade-in duration-200">
      
      {/* Top Header & Progress */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 text-brand-800">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Question {currentIdx + 1} of {activeQuestions.length}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">{progressPercent}%</span>
        </div>

        {/* Fluid Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-brand-700 to-rose-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Current Question */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mb-1.5 leading-snug">
          {currentQ.question}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-5">
          {currentQ.description}
        </p>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Instant 1-Click Option Selection List */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedInCurrentQ === opt || answers[currentQ.key] === opt;
            const letter = optionKeys[idx] || String(idx + 1);

            return (
              <button
                key={idx}
                type="button"
                disabled={submitting}
                onClick={() => handleOptionClick(opt)}
                className={`group w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-brand-700 bg-brand-50/80 text-brand-900 shadow-sm scale-[1.01]'
                    : 'border-slate-200/90 hover:border-brand-400 hover:bg-slate-50/80 bg-white text-slate-800 hover:scale-[1.005]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Keyboard Badge (A, B, C, D) */}
                  <span
                    className={`w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? 'bg-brand-700 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-800'
                    }`}
                  >
                    {letter}
                  </span>
                  <span>{opt}</span>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'border-brand-700 bg-brand-700 text-white scale-110'
                      : 'border-slate-300 bg-slate-50 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submitting Loading Overlay */}
      {submitting && (
        <div className="py-4 flex items-center justify-center gap-2 text-xs font-bold text-brand-800">
          <Loader2 className="w-4 h-4 animate-spin text-brand-700" />
          <span>Evaluating qualification & loading calendar...</span>
        </div>
      )}

      {/* Bottom Back Button & Micro-guide */}
      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          disabled={submitting}
          onClick={() => {
            if (currentIdx === 0) {
              onBack();
            } else {
              setSelectedInCurrentQ(null);
              setCurrentIdx(prev => prev - 1);
            }
          }}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{currentIdx === 0 ? 'Edit Contact Info' : 'Previous Question'}</span>
        </button>

        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
          1-click auto advances to next step
        </span>
      </div>

    </div>
  );
};
