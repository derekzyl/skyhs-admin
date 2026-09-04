'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet, errorMessage } from '@/lib/api';
import { formatNgn } from '@/lib/money';
import type { Consultant, ConsultationSession, DeviceOut } from '@/lib/types';

export default function ExecutiveHealthCommandPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientCount, setPatientCount] = useState(0);
  const [deviceCount, setDeviceCount] = useState(0);
  const [grossFees, setGrossFees] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [pendingConsultants, setPendingConsultants] = useState(0);
  const [approvedConsultants, setApprovedConsultants] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [sessions, consultants, devices, live] = await Promise.all([
          apiGet<ConsultationSession[]>('/api/v1/consultancy/admin/sessions'),
          apiGet<Consultant[]>('/api/v1/consultancy/admin/consultants'),
          apiGet<DeviceOut[]>('/api/v1/health/devices').catch(() => []),
          apiGet<ConsultationSession[]>(
            '/api/v1/consultancy/admin/sessions?live_only=true'
          ).catch(() => []),
        ]);
        if (cancelled) return;
        const patients = new Set((sessions || []).map((s) => s.patient_id));
        setPatientCount(patients.size);
        setDeviceCount((devices || []).filter((d) => d.is_active).length);
        setGrossFees(
          (sessions || [])
            .filter((s) => s.payment_status === 'paid' || s.payment_status === 'manual_confirmed')
            .reduce((sum, s) => sum + (Number(s.fee) || 0), 0)
        );
        setLiveCount((live || []).length);
        setPendingConsultants(
          (consultants || []).filter((c) => c.status === 'pending').length
        );
        setApprovedConsultants(
          (consultants || []).filter((c) => c.status === 'approved').length
        );
      } catch (err) {
        if (!cancelled) setError(errorMessage(err, 'Failed to load executive metrics'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm">shield</span>
            <span>EXECUTIVE OPERATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Executive Health Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Live metrics from consultancy sessions, consultants, and device fleet.
          </p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">forum</span>
          <span>Live Chat Console</span>
        </Link>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Patients with sessions</div>
          <div className="text-3xl font-extrabold font-mono text-white">
            {loading ? '…' : patientCount.toLocaleString()}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Active devices</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {loading ? '…' : deviceCount.toLocaleString()}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Paid consult fees</div>
          <div className="text-3xl font-extrabold font-mono text-white">
            {loading ? '…' : formatNgn(grossFees)}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Live chat sessions</div>
          <div className="text-3xl font-extrabold font-mono text-rose-400">
            {loading ? '…' : liveCount}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Consultant network</h3>
          <p className="text-xs text-slate-400">
            Approved: <span className="text-white font-mono">{approvedConsultants}</span>
          </p>
          <p className="text-xs text-slate-400">
            Pending review:{' '}
            <span className="text-amber-300 font-mono">{pendingConsultants}</span>
          </p>
          <Link href="/consultants" className="text-xs text-sky-400 hover:underline">
            Open consultant roster →
          </Link>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Operations</h3>
          <p className="text-xs text-slate-400">
            Metrics refresh when you open this page. Empty zeros mean no sessions yet.
          </p>
          <Link href="/analytics" className="text-xs text-sky-400 hover:underline">
            Clinical analytics →
          </Link>
        </div>
      </div>
    </div>
  );
}
