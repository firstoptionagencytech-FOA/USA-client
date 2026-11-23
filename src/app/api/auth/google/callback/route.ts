import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getSettings, updateSettings } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error || !code) {
      console.warn('OAuth denied or missing code:', error);
      return NextResponse.redirect(new URL('/admin?tab=settings&error=access_denied', req.url));
    }

    const settings = await getSettings();
    const clientId = (process.env.GOOGLE_CLIENT_ID || (settings as any).google_client_id || '').trim();
    const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || (settings as any).google_client_secret || '').trim();

    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'jewarinternational.vercel.app';
    const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
    const protocol = req.headers.get('x-forwarded-proto') || (isLocalhost ? 'http' : 'https');
    
    // Automatically match the current environment
    let redirectUri = `${protocol}://${host}/api/auth/google/callback`;
    if (process.env.GOOGLE_REDIRECT_URI) {
      const configured = process.env.GOOGLE_REDIRECT_URI.trim();
      if (isLocalhost && (configured.includes('localhost') || configured.includes('127.0.0.1'))) {
        redirectUri = configured;
      } else if (!isLocalhost && !configured.includes('localhost') && !configured.includes('127.0.0.1')) {
        redirectUri = configured;
      }
    }

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(new URL('/admin?tab=settings&error=missing_credentials', req.url));
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    // Fetch user profile email
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    let calendarEmail = 'primary';
    try {
      const userInfo = await oauth2.userinfo.get();
      if (userInfo.data.email) {
        calendarEmail = userInfo.data.email;
      }
    } catch (e) {
      console.warn('Could not fetch user email, using primary:', e);
    }

    // Save tokens and update settings
    await updateSettings({
      google_calendar_connected: true,
      google_calendar_id: calendarEmail,
      ...(tokens.refresh_token ? { google_refresh_token: tokens.refresh_token } : {}),
      ...(tokens.access_token ? { google_access_token: tokens.access_token } : {}),
    } as any);

    return NextResponse.redirect(new URL('/admin?tab=settings&calendar=connected', req.url));
  } catch (err: any) {
    console.error('OAuth Callback exchange error:', err);
    return NextResponse.redirect(new URL(`/admin?tab=settings&error=${encodeURIComponent(err.message || 'token_exchange_failed')}`, req.url));
  }
}
