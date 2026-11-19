# JIT Helpdesk: Deployment & Admin Setup Guide

## 1. Overview
JIT Helpdesk is a complete, production-ready web application built for **Jewar International Technologies**, targeting US IT support businesses and Managed Service Providers (MSPs).

The architecture features:
* **Pixel-Accurate Hero Section:** Faithfully recreated from the supplied A4 reference portrait design.
* **Responsive Multi-Viewport Experience:** Seamlessly adapts across 320px, 375px, 414px, 430px, tablet, and desktop viewports.
* **Complete Landing Page Sections (1-11):** Customer problems, interactive software demonstration walkthrough, product solution, 5-step customer journey, commercial benefits, transparent pricing ($400 setup + $200/mo), illustrative business value case study ($2,800 vs $3,000 contribution), qualification criteria, approved FAQs, and final CTA.
* **Lead Capture & Qualification Survey:** 5-step qualification engine with configurable 5-question or 3-question mode in admin settings.
* **Google Calendar Live FreeBusy Availability:** Real-time scheduling engine preventing double bookings across US business hours.
* **CRM Lead Management Dashboard:** Real-time metrics, search/filtering, qualification audit trails, status progression, internal notes, and calendar view.
* **Meta Conversion Tracking:** Standard and custom browser events (`PageView`, `SurveyStart`, `Lead`, `QualifiedLead`, `Schedule`).

---

## 2. Google Calendar API & OAuth Setup (Single Admin Calendar)

To connect your Google Calendar account for live availability and meeting creation:

1. **Google Cloud Console:**
   * Go to [Google Cloud Console](https://console.cloud.google.com).
   * Create a new project named `JIT Helpdesk Calendar`.
   * Under **APIs & Services**, enable the **Google Calendar API**.
2. **OAuth Consent Screen:**
   * Select **External** or **Internal** user type.
   * Add app name: `JIT Helpdesk`.
   * Add scopes: `https://www.googleapis.com/auth/calendar.events` and `https://www.googleapis.com/auth/calendar.freebusy`.
3. **OAuth 2.0 Credentials:**
   * Go to **Credentials** → **Create Credentials** → **OAuth client ID**.
   * Application type: **Web application**.
   * Authorized redirect URIs:
     * Local: `http://localhost:3000/api/auth/google/callback`
     * Production: `https://your-domain.vercel.app/api/auth/google/callback`
   * Copy `Client ID` and `Client Secret`.
4. **Obtain Refresh Token:**
   * Run the OAuth authorization URL in your browser using your admin Google account.
   * Save the obtained `GOOGLE_REFRESH_TOKEN` securely server-side.
   * Add to `.env`:
     ```env
     GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com
     GOOGLE_CLIENT_SECRET=your_secret
     GOOGLE_REFRESH_TOKEN=your_refresh_token
     GOOGLE_CALENDAR_ID=primary
     ```

---

## 3. Supabase PostgreSQL Database Setup

1. Create a project at [Supabase.com](https://supabase.com).
2. Go to **SQL Editor** and execute the migration file located at:
   `supabase/migrations/20261120000000_init_jit_helpdesk.sql`
3. Retrieve your project URL and Service Role Key from **Settings** → **API**.
4. Add to your `.env` or Vercel Environment Variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
*(Note: JIT Helpdesk includes an automatic dual-mode local storage adapter that runs out of the box in local environments even prior to entering Supabase keys!)*

---

## 4. Meta Pixel & Conversions API Tracking

Add your Meta Pixel ID to `.env`:
```env
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
```

Events automatically fired:
* `PageView`: Fired when visitor loads the landing page.
* `SurveyStart`: Fired when visitor submits contact details and advances to survey.
* `Lead`: Fired on contact form submission.
* `QualifiedLead`: Fired when answers score above qualification threshold.
* `Schedule`: Fired on successful Google Calendar meeting confirmation.

---

## 5. Vercel Production Deployment

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Production JIT Helpdesk Web App"
   ```
2. In [Vercel Dashboard](https://vercel.com):
   * Click **Add New Project** → Import your repository.
   * Framework Preset: **Next.js**.
   * Add all environment variables from `.env.example`.
   * Click **Deploy**.
