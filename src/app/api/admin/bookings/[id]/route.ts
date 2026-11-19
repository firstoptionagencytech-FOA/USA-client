import { NextRequest, NextResponse } from 'next/server';
import { updateBookingStatus } from '@/lib/storage';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, cancellation_reason } = body;

    const updated = await updateBookingStatus(id, status, cancellation_reason);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Booking not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
