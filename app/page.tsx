'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { apiGet, errorMessage } from '@/lib/api';
import type { ConsultationSession } from '@/lib/types';

export default function AdminCommandConsolePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'cardiology' | 'endocrinology' | 'general'>('all');
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await apiGet<ConsultationSession[]>(
          '/api/v1/consultancy/admin/sessions?live_only=true'
        );
        if (!cancelled) {
          setSessions(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load live sessions.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    const id = setInterval(() => {
      void load();
    }, 8000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return sessions;
    return sessions.filter((s) =>
      (s.specialty || '').toLowerCase().includes(
        activeTab === 'general' ? 'general' : activeTab
      )
    );
  }, [sessions, activeTab]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
            <span>TELEHEALTH OPERATIONS • LIVE SESSIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Telehealth Operations Command Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time supervision of live consultation sessions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/consultants"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-bold text-sky-400 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>Review Applicants</span>
          </Link>
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Live Encounters Now</span>
            <span className="material-symbols-outlined text-emerald-400">video_camera_front</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white">
            {loading ? '…' : sessions.length}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">live_only=true</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Waiting / Live Mix</div>
          <div className="text-3xl font-extrabold font-mono text-sky-400">
            {sessions.filter((s) => s.status === 'waiting').length} wait
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Specialties On Feed</div>
          <div className="text-3xl font-extrabold font-mono text-white">
            {new Set(sessions.map((s) => s.specialty).filter(Boolean)).size}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Live Gross Fees</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            ${sessions.reduce((n, s) => n + (s.fee || 0), 0).toFixed(0)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 live-pulse" />
              <span>Live Session Supervision</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Polling admin sessions with live_only=true every few seconds.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {(['all', 'cardiology', 'endocrinology', 'general'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-primary-container text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading && sessions.length === 0 ? (
          <p className="text-xs text-slate-500 py-8 text-center">Loading live sessions…</p>
        ) : filtered.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-sm text-slate-400">
            No live sessions right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((call) => (
              <div
                key={call.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl flex flex-col"
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                      {call.status}
                    </span>
                    <span className="text-[10px] font-mono text-sky-400">
                      ${call.fee.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      {call.consultant_name || 'Clinician'}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {call.specialty || 'General'} • Patient {call.patient_id.slice(0, 8)}…
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {call.chief_complaint || 'No chief complaint'}
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                    Session {call.id.slice(0, 12)}…
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400">public</span>
            Quick Ops Links
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs font-mono">
            <Link
              href="/consultants"
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-700 text-white"
            >
              Consultants
            </Link>
            <Link
              href="/payouts"
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-700 text-white"
            >
              Payouts
            </Link>
            <Link
              href="/disputes"
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-700 text-white"
            >
              Disputes
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Quick Administration Actions</h3>
          <div className="space-y-2 text-xs">
            <Link
              href="/consultants"
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-sky-400">verified_user</span>
                <span>Review Pending Clinician Applications</span>
              </div>
              <span className="material-symbols-outlined text-slate-500 text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/payouts"
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-emerald-400">payments</span>
                <span>Batch Approve Payouts</span>
              </div>
              <span className="material-symbols-outlined text-slate-500 text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/disputes"
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-amber-400">report_problem</span>
                <span>Open Patient Incident Flags</span>
              </div>
              <span className="material-symbols-outlined text-slate-500 text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
