import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, saveLead, getSettings } from '@/lib/storage';
import { evaluateQualification } from '@/lib/qualification';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead_id, answers } = body;

    if (!lead_id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required.' }, { status: 400 });
    }

    const lead = await getLeadById(lead_id);
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead record not found.' }, { status: 404 });
    }

    const settings = await getSettings();
    const mode = settings.survey_mode || '5_questions';
    const qualResult = evaluateQualification(answers, mode);

    const updatedLead = await saveLead({
      ...lead,
      survey_answers: { ...lead.survey_answers, ...answers },
      is_qualified: qualResult.isQualified,
      qualification_notes: qualResult.reasons.join(' | '),
      status: qualResult.isQualified ? 'qualified' : 'unqualified',
    });

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      qualification: qualResult,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
