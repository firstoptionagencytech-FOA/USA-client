import { NextResponse } from 'next/server';
import { getBookings } from '@/lib/storage';

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to retrieve bookings' }, { status: 500 });
  }
}
