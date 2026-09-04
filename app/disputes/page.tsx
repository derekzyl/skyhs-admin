'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { apiGet, apiPost, errorMessage } from '@/lib/api';
import type { ConsultationSession } from '@/lib/types';

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<ConsultationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGet<ConsultationSession[]>(
        '/api/v1/consultancy/admin/sessions?disputed_only=true'
      );
      setDisputes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(errorMessage(err, 'Failed to load disputes.'));
      setDisputes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleResolve = async (sessionId: string) => {
    setError(null);
    setSuccess(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/sessions/${sessionId}/resolve-dispute`);
      setSuccess(`Dispute resolved for ${sessionId.slice(0, 8)}…`);
      await load();
    } catch (err) {
      setError(errorMessage(err, 'Resolve failed.'));
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Disputes & Clinical Flag Triage
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Resolve disputed encounters and close incident flags.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          Open: {disputes.filter((d) => d.dispute_status === 'open').length}
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      {success && (
        <p className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-xl px-4 py-3">
          {success}
        </p>
      )}

      {loading ? (
        <p className="text-xs text-slate-500">Loading disputes…</p>
      ) : disputes.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-sm text-slate-400">
          No disputed sessions.
        </div>
      ) : (
        <div className="space-y-4">
          {disputes.map((dsp) => (
            <div
              key={dsp.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2 font-mono flex-wrap">
                  <span className="text-sky-400 font-bold">{dsp.id.slice(0, 12)}…</span>
                  <span className="text-slate-400">
                    {dsp.consultant_name || dsp.consultant_id.slice(0, 8)}
                  </span>
                  <span className="text-slate-500">
                    {new Date(dsp.scheduled_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400">Amount: ${dsp.fee.toFixed(2)}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                      dsp.dispute_status === 'resolved'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {dsp.dispute_status || 'open'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-rose-400 font-bold">Notes: </span>
                    {(dsp as ConsultationSession & { dispute_notes?: string }).dispute_notes ||
                      dsp.chief_complaint ||
                      'No dispute notes on file.'}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400">
                    Patient {dsp.patient_id.slice(0, 10)}… • Status {dsp.status} • Payment{' '}
                    {dsp.payment_status}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-2 justify-end">
                  {dsp.dispute_status !== 'resolved' ? (
                    <button
                      onClick={() => handleResolve(dsp.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                    >
                      Resolve Dispute
                    </button>
                  ) : (
                    <div className="p-2 text-center bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-emerald-400 text-xs font-bold">
                      Incident Closed
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
