'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ContactCaptureStep } from './ContactCaptureStep';
import { SurveyStep } from './SurveyStep';
import { DisqualifiedStep } from './DisqualifiedStep';
import { CalendarBookingStep } from './CalendarBookingStep';
import { ConfirmationStep } from './ConfirmationStep';
import { Booking, SurveyAnswers } from '@/types';
import { prefetchUpcomingWeekdays } from '@/lib/slotsClientCache';

interface FunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  surveyMode?: '5_questions' | '3_questions';
}

type FunnelStage = 'contact' | 'survey' | 'disqualified' | 'calendar' | 'confirmation';

export const FunnelModal: React.FC<FunnelModalProps> = ({
  isOpen,
  onClose,
  surveyMode = '5_questions',
}) => {
  const [stage, setStage] = useState<FunnelStage>('contact');
  const [leadId, setLeadId] = useState<string>('');
  const [disqualificationReason, setDisqualificationReason] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Non-blocking Background Prefetching (Option 2):
  // When modal opens (Step 1 Contact & Step 2 Survey), quietly prefetch next 5 business days
  // in idle background thread so user experiences ZERO UI lag, and Step 3 Calendar loads in 0ms!
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    try {
      const detectedTz = 'America/New_York'; // Default US Eastern Time for US Landing Page
      const datesToPrefetch: string[] = [];
      const curr = new Date();
      curr.setDate(curr.getDate() + 1);

      while (datesToPrefetch.length < 5) {
        const day = curr.getDay();
        if (day !== 0 && day !== 6) {
          const yyyy = curr.getFullYear();
          const mm = String(curr.getMonth() + 1).padStart(2, '0');
          const dd = String(curr.getDate()).padStart(2, '0');
          datesToPrefetch.push(`${yyyy}-${mm}-${dd}`);
        }
        curr.setDate(curr.getDate() + 1);
      }

      prefetchUpcomingWeekdays(datesToPrefetch, detectedTz);
    } catch (err) {
      // silent
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setStage('contact');
    setLeadId('');
    setDisqualificationReason('');
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      
      {/* Modal Card with Mobile Safe Max Height & Smooth Scroll */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[95dvh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Funnel Stage Container */}
        <div className="overflow-y-auto flex-1 w-full overscroll-contain">
          {stage === 'contact' && (
            <ContactCaptureStep
              onSuccess={(id) => {
                setLeadId(id);
                setStage('survey');
              }}
            />
          )}

          {stage === 'survey' && (
            <SurveyStep
              leadId={leadId}
              surveyMode={surveyMode}
              onBack={() => setStage('contact')}
              onCompleted={(isQualified, answers, reason) => {
                if (isQualified) {
                  setStage('calendar');
                } else {
                  setDisqualificationReason(reason || '');
                  setStage('disqualified');
                }
              }}
            />
          )}

          {stage === 'disqualified' && (
            <DisqualifiedStep
              reason={disqualificationReason}
              onClose={handleResetAndClose}
            />
          )}

          {stage === 'calendar' && (
            <CalendarBookingStep
              leadId={leadId}
              onBack={() => setStage('survey')}
              onSuccess={(booking) => {
                setConfirmedBooking(booking);
                setStage('confirmation');
              }}
            />
          )}

          {stage === 'confirmation' && confirmedBooking && (
            <ConfirmationStep
              booking={confirmedBooking}
              onClose={handleResetAndClose}
            />
          )}
        </div>

      </div>
    </div>
  );
};
