import { NextRequest, NextResponse } from 'next/server';
import { updateLeadStatus } from '@/lib/storage';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, internal_notes } = body;

    const updated = await updateLeadStatus(id, status, internal_notes);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
