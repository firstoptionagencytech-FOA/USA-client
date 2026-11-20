import { SurveyAnswers } from "@/types";

export interface QualificationResult {
  isQualified: boolean;
  score: number;
  reasons: string[];
  disqualificationReason?: string;
}

/**
 * Lead Qualification Evaluator
 * As per commercial requirement: ALL inbound prospective IT support businesses
 * and MSPs are automatically qualified to book their personalized walkthrough demo.
 */
export function evaluateQualification(
  answers: SurveyAnswers,
  mode: '5_questions' | '3_questions' = '5_questions'
): QualificationResult {
  return {
    isQualified: true,
    score: 100,
    reasons: ['Qualified for personalized demo walkthrough.'],
  };
}
