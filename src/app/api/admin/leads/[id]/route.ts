import { NextRequest, NextResponse } from 'next/server';
import { updateLead, updateLeadStatus } from '@/lib/storage';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, internal_notes, is_deleted, deleted_at } = body;

    const updates: any = {};
    if (status !== undefined) updates.status = status;
    if (internal_notes !== undefined) updates.internal_notes = internal_notes;
    if (is_deleted !== undefined) updates.is_deleted = is_deleted;
    if (deleted_at !== undefined) updates.deleted_at = deleted_at;

    const updated = await updateLead(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Soft delete: keep record intact in deleted section
    const updated = await updateLead(id, {
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    });
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
