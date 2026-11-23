import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getSettings } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const settings = await getSettings();
    
    // Check Client ID and Secret from process.env or settings
    const clientId = (process.env.GOOGLE_CLIENT_ID || (settings as any).google_client_id || '').trim();
    const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || (settings as any).google_client_secret || '').trim();

    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'jewarinternational.vercel.app';
    const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
    const protocol = req.headers.get('x-forwarded-proto') || (isLocalhost ? 'http' : 'https');
    
    // Automatically match the current environment
    let redirectUri = `${protocol}://${host}/api/auth/google/callback`;
    if (process.env.GOOGLE_REDIRECT_URI) {
      const configured = process.env.GOOGLE_REDIRECT_URI.trim();
      // Only use env var if it matches the current environment (never send localhost on production)
      if (isLocalhost && (configured.includes('localhost') || configured.includes('127.0.0.1'))) {
        redirectUri = configured;
      } else if (!isLocalhost && !configured.includes('localhost') && !configured.includes('127.0.0.1')) {
        redirectUri = configured;
      }
    }

    if (!clientId || !clientSecret) {
      // Redirect back to admin settings with a friendly prompt to enter credentials
      return NextResponse.redirect(new URL('/admin?tab=settings&error=missing_credentials', req.url));
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    });

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Google OAuth init error:', error);
    return NextResponse.redirect(new URL('/admin?tab=settings&error=oauth_init_failed', req.url));
  }
}
