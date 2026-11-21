import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/calendar';
import { getSettings } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date'); // YYYY-MM-DD
    const timezone = searchParams.get('timezone') || 'America/New_York';
    const fresh = searchParams.get('fresh') === 'true';

    if (!date) {
      return NextResponse.json({ success: false, error: 'Date parameter is required.' }, { status: 400 });
    }

    const [settings, slots] = await Promise.all([
      getSettings(),
      getAvailableSlots({ date, prospectTimezone: timezone }, fresh),
    ]);

    return NextResponse.json({
      success: true,
      date,
      timezone,
      businessTimezone: settings.business_timezone,
      workingHours: {
        start: settings.working_hours_start,
        end: settings.working_hours_end,
      },
      slots,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (err: any) {
    console.error('Availability API error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
