import { SurveyAnswers } from "@/types";

export interface QualificationResult {
  isQualified: boolean;
  score: number;
  reasons: string[];
  disqualificationReason?: string;
}

export function evaluateQualification(
  answers: SurveyAnswers,
  mode: '5_questions' | '3_questions' = '5_questions'
): QualificationResult {
  const reasons: string[] = [];
  let score = 0;

  // Rule 1: Paying Customers (Critical gate)
  if (answers.serving_paying_clients === 'Not yet') {
    return {
      isQualified: false,
      score: 0,
      reasons: ['Not yet serving paying clients. Platform is designed for businesses with active customer billing.'],
      disqualificationReason: 'JIT Helpdesk is built for established IT businesses currently serving paying clients. We will send you resources to help you prepare for launch!'
    };
  } else if (answers.serving_paying_clients === 'Yes, regularly') {
    score += 30;
    reasons.push('Regularly serves paying IT clients (+30)');
  } else if (answers.serving_paying_clients === 'Yes, occasionally') {
    score += 15;
    reasons.push('Occasionally serves paying IT clients (+15)');
  }

  // Rule 2: Budget Fit (Critical gate)
  if (answers.budget_fit === 'No') {
    return {
      isQualified: false,
      score: 0,
      reasons: ['Budget ($400 setup + $200/mo) is not acceptable at this time.'],
      disqualificationReason: 'Our platform package ($400 setup + $200/mo) is outside your current target budget. We invite you to review our self-guided materials in the meantime.'
    };
  } else if (answers.budget_fit === 'Yes') {
    score += 30;
    reasons.push('Budget approved ($400 + $200/mo) (+30)');
  } else if (answers.budget_fit === 'Possibly, after a demo') {
    score += 20;
    reasons.push('Budget open contingent on demo value (+20)');
  }

  // Rule 3: Business Type
  if (answers.business_type === 'Internal corporate IT department') {
    return {
      isQualified: false,
      score: 0,
      reasons: ['Internal corporate IT department. Platform is for customer-facing commercial IT providers.'],
      disqualificationReason: 'JIT Helpdesk is an external client-facing portal and branded app built for MSPs and commercial IT service companies, rather than internal enterprise IT desks.'
    };
  } else if (
    answers.business_type === 'IT support / Managed IT services' ||
    answers.business_type === 'Computer repair / Onsite IT services' ||
    answers.business_type === 'Independent IT consultant'
  ) {
    score += 20;
    reasons.push(`Target business type: ${answers.business_type} (+20)`);
  }

  // Rule 4: Decision Maker Role
  if (
    answers.role === 'Owner / Founder' ||
    answers.role === 'Partner / Director'
  ) {
    score += 15;
    reasons.push(`Key decision maker: ${answers.role} (+15)`);
  } else if (answers.role === 'Operations / Support Manager') {
    score += 10;
    reasons.push(`Operational evaluator: ${answers.role} (+10)`);
  }

  // Rule 5: Implementation Timeline (5-question mode only)
  if (mode === '5_questions' && answers.timeline) {
    if (answers.timeline === 'Within 30 days') {
      score += 15;
      reasons.push('Immediate timeline: within 30 days (+15)');
    } else if (answers.timeline === 'Within 1–3 months') {
      score += 10;
      reasons.push('Near-term timeline: 1–3 months (+10)');
    } else {
      score += 5;
      reasons.push('Researching timeline (+5)');
    }
  }

  // A lead is qualified if they cleared the hard disqualifiers and scored >= 45
  const isQualified = score >= 45;

  return {
    isQualified,
    score,
    reasons,
    disqualificationReason: isQualified ? undefined : 'Based on your current stage, a personalized demo may not be the best use of your time right now.'
  };
}
