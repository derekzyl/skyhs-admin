'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { apiGet, clearAuthTokens, errorMessage, login } from '@/lib/api';

type MePayload = {
  is_platform_admin?: boolean;
  user_type?: string;
  roles?: unknown;
  data?: MePayload;
};

function unwrapMe(raw: unknown): MePayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as MePayload;
  if (obj.data && typeof obj.data === 'object') return obj.data;
  return obj;
}

function isAuthorizedAdmin(me: MePayload | null): boolean {
  if (!me) return false;
  if (me.is_platform_admin === true) return true;
  if (String(me.user_type || '').toLowerCase() === 'admin') return true;
  const roles = Array.isArray(me.roles) ? me.roles.map(String) : [];
  return roles.some((r) => r === 'super_admin' || r === 'admin');
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password);
      const meRaw = await apiGet<unknown>('/api/v1/auth/me');
      const me = unwrapMe(meRaw);
      if (!isAuthorizedAdmin(me)) {
        clearAuthTokens();
        setError('Not authorized for admin console');
        return;
      }
      router.push('/');
    } catch (err) {
      setError(errorMessage(err, 'Login failed. Check your credentials.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 text-white">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto shadow-lg shadow-sky-950 p-2 overflow-hidden">
            <Image
              src="/logo.png"
              alt="Skyline Health Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Skyline Health Operations Command
          </h1>
          <p className="text-xs text-slate-400">
            Institutional Admin Gateway • Multi-Factor Secured
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Administrator Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Master Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-base">vpn_key</span>
            <span>YubiKey FIDO2 or Google Authenticator 2FA enforced upon login.</span>
          </div>

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-lg shadow-sky-950 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Verifying Admin Token...</span>
            ) : (
              <>
                <span>Sign In to Command Console</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800 text-[11px] text-slate-500">
          Skyline Health Technologies, Inc. • High-Security Tier 1 Access
        </div>
      </div>
    </div>
  );
}
