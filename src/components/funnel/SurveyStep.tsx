'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 5 Questions from Task Specification
  const questions5 = [
    {
      key: 'business_type',
      question: 'What type of business do you operate?',
      description: 'JIT Helpdesk is tailored for client-facing commercial IT service operations.',
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
      description: 'Helps us customize the demo presentation for executive or technical workflows.',
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
      description: 'Our platform is designed for businesses with active customer ticketing & invoicing.',
      options: [
        'Yes, regularly',
        'Yes, occasionally',
        'Not yet',
      ],
    },
    {
      key: 'budget_fit',
      question: 'Is $400 setup + $200/month within your budget?',
      description: 'This is the standard flat package with unlimited technician seats.',
      options: [
        'Yes',
        'Possibly, after a demo',
        'No',
      ],
    },
    {
      key: 'timeline',
      question: 'When are you considering implementation?',
      description: 'Ensures we can allocate onboarding engineering capacity for your launch.',
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

  const handleSelectOption = (option: string) => {
    const updated = {
      ...answers,
      [currentQ.key]: option,
    };
    setAnswers(updated);
  };

  const handleNext = async () => {
    if (!answers[currentQ.key]) {
      setError('Please select an option to continue.');
      return;
    }
    setError('');

    // If more questions exist, proceed to next
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      return;
    }

    // Survey complete: Submit to API and evaluate qualification
    setSubmitting(true);
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          answers,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit qualification answers.');
      }

      const isQualified = data.qualification.isQualified;

      if (isQualified) {
        // Track QualifiedLead event for Meta conversion optimization
        trackMetaEvent('QualifiedLead', {
          content_name: 'Qualified IT Service Provider',
          lead_id: leadId,
          score: data.qualification.score,
        });
      }

      onCompleted(isQualified, answers, data.qualification.disqualificationReason);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while evaluating your answers.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[460px]">
      
      {/* Top Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Question {currentIdx + 1} of {activeQuestions.length}</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-brand-700 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Current Question */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mb-1.5 leading-snug">
          {currentQ.question}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          {currentQ.description}
        </p>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Option Selection List */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = answers[currentQ.key] === opt;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-brand-700 bg-pink-50/60 text-brand-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                }`}
              >
                <span>{opt}</span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'border-brand-700 bg-brand-700 text-white'
                      : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (currentIdx === 0) {
              onBack();
            } else {
              setCurrentIdx(prev => prev - 1);
            }
          }}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={submitting}
          onClick={handleNext}
          className="cta-glow-btn px-6 py-3 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
        >
          <span>
            {submitting
              ? 'Evaluating...'
              : currentIdx === activeQuestions.length - 1
              ? 'View Calendar & Choose Time'
              : 'Continue'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
