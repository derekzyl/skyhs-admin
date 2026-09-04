'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { apiGet, apiPost, errorMessage } from '@/lib/api';
import { Consultant, mapConsultantStatus } from '@/lib/types';

type UiStatus = 'all' | 'active' | 'pending_review' | 'suspended';

export default function AdminConsultantsPage() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [statusFilter, setStatusFilter] = useState<UiStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter === 'active') params.set('status', 'approved');
      if (statusFilter === 'pending_review') params.set('status', 'pending');
      if (statusFilter === 'suspended') params.set('status', 'suspended');
      const qs = params.toString();
      const data = await apiGet<Consultant[]>(
        `/api/v1/consultancy/admin/consultants${qs ? `?${qs}` : ''}`
      );
      setConsultants(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(errorMessage(err, 'Failed to load consultants.'));
      setConsultants([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredConsultants = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return consultants.filter((c) => {
      const uiStatus = mapConsultantStatus(c.status);
      const matchesStatus = statusFilter === 'all' || uiStatus === statusFilter;
      const matchesSearch =
        !q ||
        c.display_name.toLowerCase().includes(q) ||
        (c.npi_number || '').includes(searchQuery) ||
        c.specialty.toLowerCase().includes(q) ||
        (c.hospital || '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [consultants, searchQuery, statusFilter]);

  const pendingCount = consultants.filter((c) => c.status === 'pending').length;

  const handleApprove = async (id: string) => {
    setActionError(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/consultants/${id}/approve`);
      await load();
    } catch (err) {
      setActionError(errorMessage(err, 'Approve failed.'));
    }
  };

  const handleSuspend = async (id: string) => {
    setActionError(null);
    try {
      await apiPost(`/api/v1/consultancy/admin/consultants/${id}/suspend`);
      await load();
    } catch (err) {
      setActionError(errorMessage(err, 'Suspend failed.'));
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Consultant Network & Credentialing
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supervise physician privileging, applications, and fee structures.
          </p>
        </div>
      </div>

      {(error || actionError) && (
        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-4 py-3">
          {error || actionError}
        </p>
      )}

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by physician name, NPI, hospital or specialty..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-1.5 flex-wrap">
            {(
              [
                { key: 'all', label: 'All' },
                { key: 'active', label: 'Active' },
                { key: 'pending_review', label: `Pending (${pendingCount})` },
                { key: 'suspended', label: 'Suspended' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  statusFilter === tab.key
                    ? 'bg-primary-container text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-white">
            Showing {filteredConsultants.length} of {consultants.length} Registered Clinicians
          </span>
          <span className="text-slate-400 font-mono">15% platform commission rate</span>
        </div>

        {loading ? (
          <p className="p-8 text-center text-xs text-slate-500">Loading consultants…</p>
        ) : filteredConsultants.length === 0 ? (
          <p className="p-8 text-center text-xs text-slate-500">No consultants found.</p>
        ) : (
          <>
            <div className="md:hidden divide-y divide-slate-800">
              {filteredConsultants.map((doc) => {
                const uiStatus = mapConsultantStatus(doc.status);
                return (
                  <div key={doc.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.avatar_url || '/images/avatars/dr_chidi_okafor.jpg'}
                          alt={doc.display_name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <Link
                            href={`/consultants/${doc.id}`}
                            className="font-bold text-white text-sm hover:text-sky-400"
                          >
                            {doc.display_name}
                          </Link>
                          <div className="text-[11px] text-slate-400">
                            {doc.specialty} • NPI {doc.npi_number || '—'}
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase text-sky-400 border border-sky-800">
                        {uiStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {uiStatus !== 'active' && (
                        <button
                          onClick={() => handleApprove(doc.id)}
                          className="flex-1 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                        >
                          Approve
                        </button>
                      )}
                      {uiStatus === 'active' && (
                        <button
                          onClick={() => handleSuspend(doc.id)}
                          className="flex-1 py-2 rounded-lg bg-rose-950 text-rose-400 border border-rose-800 text-xs font-bold"
                        >
                          Suspend
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Clinician</th>
                    <th className="py-3 px-4">Specialty</th>
                    <th className="py-3 px-4">NPI</th>
                    <th className="py-3 px-4">Fee</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredConsultants.map((doc) => {
                    const uiStatus = mapConsultantStatus(doc.status);
                    return (
                      <tr key={doc.id} className="hover:bg-slate-800/40">
                        <td className="py-3.5 px-4">
                          <Link
                            href={`/consultants/${doc.id}`}
                            className="font-bold text-white hover:text-sky-400"
                          >
                            {doc.display_name}
                          </Link>
                          <div className="text-[10px] text-slate-500">{doc.hospital}</div>
                        </td>
                        <td className="py-3.5 px-4">{doc.specialty}</td>
                        <td className="py-3.5 px-4 font-mono">{doc.npi_number || '—'}</td>
                        <td className="py-3.5 px-4 font-mono">${doc.fee.toFixed(2)}</td>
                        <td className="py-3.5 px-4 font-mono uppercase text-[10px]">
                          {uiStatus.replace('_', ' ')}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                          <Link
                            href={`/consultants/${doc.id}`}
                            className="text-sky-400 font-bold hover:text-sky-300"
                          >
                            View
                          </Link>
                          {uiStatus !== 'active' && (
                            <button
                              onClick={() => handleApprove(doc.id)}
                              className="text-emerald-400 font-bold"
                            >
                              Approve
                            </button>
                          )}
                          {uiStatus === 'active' && (
                            <button
                              onClick={() => handleSuspend(doc.id)}
                              className="text-rose-400 font-bold"
                            >
                              Suspend
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
