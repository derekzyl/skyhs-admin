'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { apiGet, errorMessage } from '@/lib/api';
import type { ConsultationSession } from '@/lib/types';

type PatientRow = {
  id: string;
  sessions: number;
  lastAt: string;
  lastConsultant: string;
  lastStatus: string;
};

export default function AdminPatientsPage() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<PatientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const sessions = await apiGet<ConsultationSession[]>(
          '/api/v1/consultancy/admin/sessions'
        );
        const map = new Map<string, PatientRow>();
        for (const s of sessions || []) {
          const existing = map.get(s.patient_id);
          const at = s.scheduled_at;
          if (!existing) {
            map.set(s.patient_id, {
              id: s.patient_id,
              sessions: 1,
              lastAt: at,
              lastConsultant: s.consultant_name || '—',
              lastStatus: s.status,
            });
          } else {
            existing.sessions += 1;
            if (new Date(at) > new Date(existing.lastAt)) {
              existing.lastAt = at;
              existing.lastConsultant = s.consultant_name || '—';
              existing.lastStatus = s.status;
            }
          }
        }
        if (!cancelled) setRows([...map.values()]);
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load patients'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        p.lastConsultant.toLowerCase().includes(q) ||
        p.lastStatus.toLowerCase().includes(q)
    );
  }, [rows, search]);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Patient Member Directory</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Unique patients with consultancy sessions on the platform.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Total patients: <span className="text-white font-bold">{rows.length}</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient id, consultant, or status…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Patient ID</th>
              <th className="py-3 px-4">Sessions</th>
              <th className="py-3 px-4">Last encounter</th>
              <th className="py-3 px-4">Last consultant</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {loading && (
              <tr>
                <td colSpan={5} className="py-8 px-4 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 px-4 text-center text-slate-500">
                  No patients with consultancy sessions yet.
                </td>
              </tr>
            )}
            {!loading &&
              filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-white">{p.id}</td>
                  <td className="py-3.5 px-4 font-mono">{p.sessions}</td>
                  <td className="py-3.5 px-4 font-mono">
                    {new Date(p.lastAt).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">{p.lastConsultant}</td>
                  <td className="py-3.5 px-4 font-mono text-[10px] uppercase">
                    {p.lastStatus}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
