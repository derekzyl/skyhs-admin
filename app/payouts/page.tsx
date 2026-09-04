'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost, errorMessage } from '@/lib/api';
import { formatNgn } from '@/lib/money';
import type { ConsultationSession } from '@/lib/types';

export default function AdminPayoutsPage() {
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGet<ConsultationSession[]>('/api/v1/consultancy/admin/sessions');
      setSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(errorMessage(err, 'Failed to load sessions.'));
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const payable = useMemo(
    () =>
      sessions.filter(
        (s) =>
          ['paid', 'manual_confirmed'].includes(s.payment_status) &&
          s.payout_status === 'pending'
      ),
    [sessions]
  );

  const gross = sessions.reduce((sum, s) => sum + (s.fee || 0), 0);
  const pendingGross = payable.reduce((sum, s) => sum + (s.fee || 0), 0);
  const platform = pendingGross * 0.15;
  const net = pendingGross * 0.85;

  const markPaid = async (sessionId: string) => {
    setBusyId(sessionId);
    setError(null);
    setSuccess(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/sessions/${sessionId}/payout`, {
        payout_status: 'paid',
      });
      setSuccess(`Payout marked paid for session ${sessionId.slice(0, 8)}…`);
      await load();
    } catch (err) {
      setError(errorMessage(err, 'Payout update failed.'));
    } finally {
      setBusyId(null);
    }
  };

  const batchDisburse = async () => {
    setError(null);
    setSuccess(null);
    try {
      for (const s of payable) {
        await apiPost(`/api/v1/consultancy/admin/sessions/${s.id}/payout`, {
          payout_status: 'paid',
        });
      }
      setSuccess(`Marked ${payable.length} session payout(s) as paid.`);
      await load();
    } catch (err) {
      setError(errorMessage(err, 'Batch payout failed.'));
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Clinician Payouts & Financial Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mark paid sessions as disbursed. 15% platform commission accounting.
          </p>
        </div>

        <button
          onClick={batchDisburse}
          disabled={payable.length === 0}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-2 ${
            payable.length === 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950'
          }`}
        >
          <span className="material-symbols-outlined text-base">send_money</span>
          <span>
            Disburse Pending ({payable.length}) · {formatNgn(net)}
          </span>
        </button>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">All Sessions Gross</div>
          <div className="text-3xl font-extrabold font-mono text-white">{formatNgn(gross)}</div>
          <div className="text-xs text-slate-400">{sessions.length} sessions</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Platform (15% pending)</div>
          <div className="text-3xl font-extrabold font-mono text-sky-400">
            {formatNgn(platform)}
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Net Pending Disbursement</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {formatNgn(net)}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between text-xs">
          <h3 className="font-bold text-white">Session Payout Ledger</h3>
          <span className="text-slate-400 font-mono">Admin sessions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Session</th>
                <th className="py-3 px-4">Clinician</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Gross</th>
                <th className="py-3 px-4">Net (85%)</th>
                <th className="py-3 px-4">Payout</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No sessions found.
                  </td>
                </tr>
              ) : (
                sessions.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                      {p.id.slice(0, 10)}…
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {p.consultant_name || p.consultant_id.slice(0, 8)}
                    </td>
                    <td className="py-3.5 px-4 font-mono">{p.payment_status}</td>
                    <td className="py-3.5 px-4 font-mono">{formatNgn(p.fee)}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400">
                      {formatNgn(p.fee * 0.85)}
                    </td>
                    <td className="py-3.5 px-4 font-mono uppercase text-[10px]">
                      {p.payout_status}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {p.payout_status === 'pending' &&
                      ['paid', 'manual_confirmed'].includes(p.payment_status) ? (
                        <button
                          onClick={() => markPaid(p.id)}
                          disabled={busyId === p.id}
                          className="text-emerald-400 font-bold disabled:opacity-50"
                        >
                          {busyId === p.id ? '…' : 'Mark Paid'}
                        </button>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
