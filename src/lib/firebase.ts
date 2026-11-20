import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCGxlQbDYR2floRae-mgNBBkSOZzNAKasM',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'uscleint.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'uscleint',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'uscleint.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '904202866800',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:904202866800:web:561f0702b47534d30264b5',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-YKQL3MJPTP',
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'https://uscleint-default-rtdb.firebaseio.com',
};

// Singleton initialization for Next.js SSR and client
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);

// Master Database Secret for authenticated server-side REST operations
export const FIREBASE_DATABASE_SECRET = process.env.FIREBASE_DATABASE_SECRET || 'OgLqJ3uJSjhvAeGVdbLYibbBzRjWLDdgoxT9shyM';
export const FIREBASE_DATABASE_URL = (process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'https://uscleint-default-rtdb.firebaseio.com').replace(/\/$/, '');

/**
 * Super-Admin REST Fetcher with Database Secret
 * Bypasses all security rules securely on the server side so Next.js API routes
 * can read/write regardless of user session, while protecting the database from public snooping.
 */
export async function rtdbAdminFetch<T>(path: string, options: { method?: string; body?: any } = {}): Promise<T | null> {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const url = `${FIREBASE_DATABASE_URL}/${cleanPath}.json?auth=${FIREBASE_DATABASE_SECRET}`;

  try {
    const res = await fetch(url, {
      method: options.method || 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: 'no-store',
    });

    if (!res.ok) {
      const err = await res.text();
      console.warn(`rtdbAdminFetch ${options.method || 'GET'} ${path} error:`, err);
      return null;
    }

    return (await res.json()) as T;
  } catch (err: any) {
    console.error(`rtdbAdminFetch network error on ${path}:`, err);
    return null;
  }
}
