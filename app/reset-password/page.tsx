'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiPost, errorMessage } from '@/lib/api';

export default function AdminPasswordResetPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMinLength = newPassword.length >= 12;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const strongEnough =
    hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }
    if (!strongEnough) {
      setError('Password does not meet security requirements.');
      return;
    }
    setLoading(true);
    try {
      await apiPost(
        '/api/v1/auth/reset-password',
        { email: email.trim(), token: token.trim(), password: newPassword },
        { auth: false }
      );
      setIsSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(errorMessage(err, 'Could not reset password.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 text-white font-sans">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-950">
            <span className="material-symbols-outlined text-2xl">lock_reset</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Reset Administrator Password
          </h1>
          <p className="text-xs text-slate-400">
            Use the reset token from your email, then choose a new password.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-emerald-400">
              check_circle
            </span>
            <h3 className="text-sm font-bold text-white">Password Updated Successfully</h3>
            <p className="text-xs text-slate-300">
              Redirecting to Admin Gateway…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300">
                {error}
              </div>
            )}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Reset token
              </label>
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste token from email"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">New password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Confirm password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
              />
            </div>
            <ul className="text-[10px] text-slate-500 space-y-0.5 font-mono">
              <li className={hasMinLength ? 'text-emerald-400' : ''}>≥ 12 characters</li>
              <li className={hasUpper ? 'text-emerald-400' : ''}>Uppercase</li>
              <li className={hasLower ? 'text-emerald-400' : ''}>Lowercase</li>
              <li className={hasNumber ? 'text-emerald-400' : ''}>Number</li>
              <li className={hasSpecial ? 'text-emerald-400' : ''}>Special character</li>
              <li className={passwordsMatch ? 'text-emerald-400' : ''}>Passwords match</li>
            </ul>
            <button
              type="submit"
              disabled={loading || !strongEnough}
              className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container disabled:opacity-50 text-white text-xs font-bold"
            >
              {loading ? 'Updating…' : 'Update password'}
            </button>
            <div className="text-center">
              <Link href="/login" className="text-sky-400 hover:underline">
                Back to sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
