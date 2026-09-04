'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiGet, apiPost, errorMessage } from '@/lib/api';
import { formatNgn } from '@/lib/money';
import { Consultant, mapConsultantStatus } from '@/lib/types';

export default function ConsultantDetailPage() {
  const params = useParams();
  const docId = (params?.id as string) || '';
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await apiGet<Consultant[]>('/api/v1/consultancy/admin/consultants');
      const found = (Array.isArray(list) ? list : []).find((c) => c.id === docId) || null;
      if (!found) {
        // Fallback: public consultant detail if admin list misses it
        const one = await apiGet<Consultant>(`/api/v1/consultancy/consultants/${docId}`);
        setConsultant(one);
      } else {
        setConsultant(found);
      }
    } catch (err) {
      setError(errorMessage(err, 'Failed to load consultant.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (docId) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId]);

  const status = consultant ? mapConsultantStatus(consultant.status) : 'pending_review';
  const fee = consultant?.fee ?? 0;

  const handleApprove = async () => {
    if (!consultant) return;
    setActionMsg(null);
    setError(null);
    try {
      const updated = await apiPost<Consultant>(
        `/api/v1/consultancy/admin/consultants/${consultant.id}/approve`
      );
      setConsultant(updated);
      setActionMsg('Clinician approved and granted telehealth privileging.');
    } catch (err) {
      setError(errorMessage(err, 'Approve failed.'));
    }
  };

  const handleSuspend = async () => {
    if (!consultant) return;
    setActionMsg(null);
    setError(null);
    try {
      const updated = await apiPost<Consultant>(
        `/api/v1/consultancy/admin/consultants/${consultant.id}/suspend`
      );
      setConsultant(updated);
      setActionMsg('Clinician suspended from active patient routing.');
    } catch (err) {
      setError(errorMessage(err, 'Suspend failed.'));
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <Link
          href="/consultants"
          className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Consultants Directory</span>
        </Link>
        <span className="text-xs font-mono text-slate-500">ID: {docId}</span>
      </div>

      {error && (
        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      {actionMsg && (
        <p className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-xl px-4 py-3">
          {actionMsg}
        </p>
      )}

      {loading || !consultant ? (
        <p className="text-sm text-slate-500">{loading ? 'Loading…' : 'Consultant not found.'}</p>
      ) : (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <img
                src={consultant.avatar_url || '/images/avatars/dr_chidi_okafor.jpg'}
                alt={consultant.display_name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white">{consultant.display_name}</h1>
                  <span
                    className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                      status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : status === 'pending_review'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs text-sky-400 font-semibold">
                  {consultant.specialty}
                  {consultant.sub_specialty ? ` • ${consultant.sub_specialty}` : ''}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  MDCN: {consultant.npi_number || '—'} • {consultant.hospital || '—'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {status !== 'active' ? (
                <button
                  onClick={handleApprove}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Approve Privileges
                </button>
              ) : (
                <button
                  onClick={handleSuspend}
                  className="px-4 py-2 rounded-xl bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-800 text-xs font-bold transition-colors"
                >
                  Suspend Routing
                </button>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
            <p>{consultant.bio || 'No biography on file.'}</p>
            <p className="text-slate-500 font-mono">
              Rating {consultant.rating_avg} ({consultant.review_count} reviews) • Fee{' '}
              {formatNgn(fee)}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Consultation Rate Card & Split
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase">Patient Fee / Visit</span>
                <div className="text-lg font-bold text-white mt-1">{formatNgn(fee)}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase">Platform Share (15%)</span>
                <div className="text-lg font-bold text-sky-400 mt-1">
                  {formatNgn(fee * 0.15)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase">Clinician Payout (85%)</span>
                <div className="text-lg font-bold text-emerald-400 mt-1">
                  {formatNgn(fee * 0.85)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
