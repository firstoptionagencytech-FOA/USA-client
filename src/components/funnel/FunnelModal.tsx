'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ContactCaptureStep } from './ContactCaptureStep';
import { SurveyStep } from './SurveyStep';
import { DisqualifiedStep } from './DisqualifiedStep';
import { CalendarBookingStep } from './CalendarBookingStep';
import { ConfirmationStep } from './ConfirmationStep';
import { Booking, SurveyAnswers } from '@/types';

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

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setStage('contact');
    setLeadId('');
    setDisqualificationReason('');
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Funnel Stage Render */}
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
  );
};
