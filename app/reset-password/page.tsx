'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPasswordResetPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Security requirements checks
  const hasMinLength = newPassword.length >= 12;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      alert('Passwords do not match.');
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 text-white font-sans">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-950">
            <span className="material-symbols-outlined text-2xl">lock_reset</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Reset Administrator Password
          </h1>
          <p className="text-xs text-slate-400">
            Enter your hardware security token and establish a high-entropy master password.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-emerald-400">
              check_circle
            </span>
            <h3 className="text-sm font-bold text-white">Password Updated Successfully</h3>
            <p className="text-xs text-slate-300">
              Your institutional credentials have been rotated. Redirecting to Admin Gateway...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                2FA Hardware Token / Recovery Code
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                  vpn_key
                </span>
                <input
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="e.g. SKY-SEC-94021"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                New Master Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Confirm Master Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                  lock_clock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Password Policy Checklist */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
              <div className="font-bold text-slate-400 uppercase text-[10px]">
                Institutional Security Requirements:
              </div>
              <div className="grid grid-cols-2 gap-1.5 font-mono">
                <span className={hasMinLength ? 'text-emerald-400' : 'text-slate-500'}>
                  {hasMinLength ? '✓' : '○'} 12+ Characters
                </span>
                <span className={hasUpper ? 'text-emerald-400' : 'text-slate-500'}>
                  {hasUpper ? '✓' : '○'} Uppercase Letter
                </span>
                <span className={hasLower ? 'text-emerald-400' : 'text-slate-500'}>
                  {hasLower ? '✓' : '○'} Lowercase Letter
                </span>
                <span className={hasNumber ? 'text-emerald-400' : 'text-slate-500'}>
                  {hasNumber ? '✓' : '○'} Numeric Digit
                </span>
                <span className={hasSpecial ? 'text-emerald-400' : 'text-slate-500'}>
                  {hasSpecial ? '✓' : '○'} Special Symbol
                </span>
                <span className={passwordsMatch ? 'text-emerald-400' : 'text-slate-500'}>
                  {passwordsMatch ? '✓' : '○'} Passwords Match
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-lg shadow-sky-950 transition-all flex items-center justify-center gap-2"
            >
              <span>Update Administrator Password</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-800 text-xs">
          <Link href="/login" className="text-sky-400 hover:text-sky-300 font-bold">
            ← Return to Admin Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
