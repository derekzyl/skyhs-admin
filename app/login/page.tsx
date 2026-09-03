'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('cmo.admin@skylinehealth.org');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 text-white">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-950">
            <span className="material-symbols-outlined text-2xl">shield</span>
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
