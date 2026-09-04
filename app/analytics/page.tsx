'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { apiGet, errorMessage } from '@/lib/api';
import type { ConsultationSession } from '@/lib/types';

export default function AdminAnalyticsPage() {
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGet<ConsultationSession[]>(
          '/api/v1/consultancy/admin/sessions'
        );
        if (!cancelled) setSessions(data || []);
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load analytics'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const total = sessions.length;
    const completed = sessions.filter((s) => s.status === 'completed').length;
    const avgDuration =
      total === 0
        ? 0
        : Math.round(
            sessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) / total
          );
    const bySpecialty = new Map<string, number>();
    for (const s of sessions) {
      const key = s.specialty || 'General';
      bySpecialty.set(key, (bySpecialty.get(key) || 0) + 1);
    }
    const specialtyRows = [...bySpecialty.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    return { total, completed, avgDuration, specialtyRows };
  }, [sessions]);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Clinical Operations Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Aggregated from consultancy sessions (chat encounters).
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Total consultations</div>
          <div className="text-3xl font-extrabold font-mono text-white">
            {loading ? '…' : stats.total}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Completed</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {loading ? '…' : stats.completed}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Avg scheduled duration</div>
          <div className="text-3xl font-extrabold font-mono text-sky-400">
            {loading ? '…' : `${stats.avgDuration} min`}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Specialties seen</div>
          <div className="text-3xl font-extrabold font-mono text-amber-400">
            {loading ? '…' : stats.specialtyRows.length}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Demand by specialty</h3>
        {!loading && stats.specialtyRows.length === 0 && (
          <p className="text-xs text-slate-500">No session data yet.</p>
        )}
        <ul className="space-y-2">
          {stats.specialtyRows.map(([name, count]) => (
            <li
              key={name}
              className="flex items-center justify-between text-xs border-b border-slate-800 pb-2"
            >
              <span className="text-slate-300">{name}</span>
              <span className="font-mono text-white">{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
