'use client';

import React, { useState } from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AdminLoginGateProps {
  onAuthenticated: (adminInfo: { email?: string; uid?: string; authType: string }) => void;
}

// Master Admin Identifiers
const AUTHORIZED_UID = 'oyO5zrvrvMPlkXRpv0ow2m5HAbn1';
const MASTER_SECRET = 'OgLqJ3uJSjhvAeGVdbLYibbBzRjWLDdgoxT9shyM';

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ onAuthenticated }) => {
  const [authMode, setAuthMode] = useState<'credentials' | 'access_key'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Firebase Email/Password Sign-In
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both admin email and password.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      const adminInfo = {
        email: user.email || email.trim(),
        uid: user.uid,
        authType: 'firebase_email',
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('deskora_admin_session', JSON.stringify(adminInfo));
      }

      onAuthenticated(adminInfo);
    } catch (err: any) {
      console.error('Firebase Auth Error:', err);
      let errorMsg = 'Failed to sign in. Please verify your credentials.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        errorMsg = 'Invalid email or password. If you haven’t configured email in Firebase Auth yet, use the "Master Access Key" tab.';
      } else if (err.code === 'auth/user-not-found') {
        errorMsg = 'No admin account found with this email. Switch to "Master Access Key" tab to sign in with your UID.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = 'Access temporarily disabled due to multiple failed attempts. Please use your Master Access Key.';
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google 1-Click Sign-In
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const adminInfo = {
        email: user.email || 'google_admin',
        uid: user.uid,
        authType: 'google_oauth',
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('deskora_admin_session', JSON.stringify(adminInfo));
      }

      onAuthenticated(adminInfo);
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google sign-in encountered an issue. Use Master Key below.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Master Key Sign-In (UID or Secret)
  const handleMasterKeySignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const key = accessKey.trim();
    if (!key) {
      setError('Please enter your Admin UID or Master Key.');
      return;
    }

    setLoading(true);

    // Validate against Master UID, Master Secret, or Admin Passcode
    if (
      key === AUTHORIZED_UID ||
      key === MASTER_SECRET ||
      key.toLowerCase() === 'admin2026' ||
      key.toLowerCase() === 'firstoption'
    ) {
      const adminInfo = {
        email: 'admin@firstoptionagency.com',
        uid: AUTHORIZED_UID,
        authType: 'master_key',
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('deskora_admin_session', JSON.stringify(adminInfo));
      }

      onAuthenticated(adminInfo);
    } else {
      setError('Invalid Master Access Key. Enter your Firebase Admin UID or Database Secret.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1b17] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#274c3b]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#d2f56d]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md bg-[#182c26]/90 backdrop-blur-xl border border-[#274c3b] rounded-3xl shadow-2xl p-6 sm:p-8 text-white z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Branding */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#274c3b] to-[#12221d] border border-[#d2f56d]/30 shadow-lg flex items-center justify-center mx-auto mb-3 p-2.5">
            <img
              src="/brand/jewar_emblem.png"
              alt="Deskora Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#274c3b]/60 border border-[#d2f56d]/20 text-[11px] font-bold text-[#d2f56d] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Executive Security Gateway</span>
          </div>

          <h2 className="text-2xl font-black text-white font-display tracking-tight">
            Deskora CRM Admin
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Restricted access portal for authorized administrative personnel.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-start gap-2.5 animate-in shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0b1512] rounded-xl border border-[#274c3b] mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('credentials');
              setError('');
            }}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              authMode === 'credentials'
                ? 'bg-[#274c3b] text-[#d2f56d] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Email &amp; Password
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('access_key');
              setError('');
            }}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              authMode === 'access_key'
                ? 'bg-[#274c3b] text-[#d2f56d] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Master UID / Key
          </button>
        </div>

        {/* Mode 1: Firebase Email & Password */}
        {authMode === 'credentials' ? (
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@deskora.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#0b1512] border border-[#274c3b] focus:border-[#d2f56d] rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#0b1512] border border-[#274c3b] focus:border-[#d2f56d] rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cta-glow-btn py-3 rounded-xl text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#d2f56d]" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#d2f56d]" />
                </>
              )}
            </button>

            {/* Google Sign-in Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#274c3b]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold">
                <span className="bg-[#182c26] px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-[#0b1512] hover:bg-[#12221d] border border-[#274c3b] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign In with Google</span>
            </button>
          </form>
        ) : (
          /* Mode 2: Master UID / Access Key */
          <form onSubmit={handleMasterKeySignIn} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Master Admin UID or Secret Key</span>
                <span className="text-[10px] text-[#d2f56d] font-mono">Verified UID</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Paste your Firebase Admin UID or Database Secret"
                  value={accessKey}
                  onChange={e => setAccessKey(e.target.value)}
                  className="w-full bg-[#0b1512] border border-[#274c3b] focus:border-[#d2f56d] rounded-xl py-2.5 pl-10 pr-3 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Instant access using your authorized UID (<code className="text-[#d2f56d]">oyO5...Abn1</code>) or master secret key.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cta-glow-btn py-3 rounded-xl text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#d2f56d]" />
                  <span>Authorizing Key...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#d2f56d]" />
                  <span>Authenticate Master Session</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-[#274c3b] flex items-center justify-between text-[11px] text-slate-400">
          <Link
            href="/"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>← Back to Landing Page</span>
          </Link>

          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>256-Bit SSL</span>
          </span>
        </div>

      </div>
    </div>
  );
};
