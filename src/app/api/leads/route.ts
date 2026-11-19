import { NextRequest, NextResponse } from 'next/server';
import { getLeads, saveLead } from '@/lib/storage';

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, phone, company_name, utm_params } = body;

    if (!full_name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const lead = await saveLead({
      full_name,
      email,
      phone,
      company_name: company_name || '',
      utm_params: utm_params || {},
      status: 'new',
    });

    return NextResponse.json({ success: true, lead });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
