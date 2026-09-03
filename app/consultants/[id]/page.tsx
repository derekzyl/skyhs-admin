'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MOCK_ADMIN_CONSULTANTS } from '@/data/mockAdminData';

export default function ConsultantDetailPage() {
  const params = useParams();
  const docId = (params?.id as string) || 'doc-1';
  const consultant =
    MOCK_ADMIN_CONSULTANTS.find((c) => c.id === docId) || MOCK_ADMIN_CONSULTANTS[0];

  const [status, setStatus] = useState(consultant.status);
  const [fee, setFee] = useState(consultant.consultationFee.toString());

  const handleApprove = () => {
    setStatus('active');
    alert(`Clinician ${consultant.name} has been approved and granted telehealth privileging.`);
  };

  const handleSuspend = () => {
    setStatus('suspended');
    alert(`Clinician ${consultant.name} has been suspended from active patient routing.`);
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
        <span className="text-xs font-mono text-slate-500">ID: {consultant.id}</span>
      </div>

      {/* ── CLINICIAN PROFILE CARD ─────────────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={consultant.avatarUrl}
              alt={consultant.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{consultant.name}</h1>
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
              <div className="text-xs text-sky-400 font-semibold">{consultant.specialty} • {consultant.subSpecialty}</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                NPI: {consultant.npi} • {consultant.hospital}
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

        {/* Credentialing Verification Checklist */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Automated Primary Source Verification
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-400 text-base mt-0.5">check_circle</span>
              <div>
                <span className="font-bold text-white block">NPPES NPI Registry</span>
                <span className="text-slate-400 text-[11px]">Type 1 Individual Active • Expiration: Active</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-400 text-base mt-0.5">check_circle</span>
              <div>
                <span className="font-bold text-white block">State Medical Board ({consultant.licenseState})</span>
                <span className="text-slate-400 text-[11px]">License #{consultant.licenseNumber} • No adverse sanctions</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-400 text-base mt-0.5">check_circle</span>
              <div>
                <span className="font-bold text-white block">OIG / SAM Exclusion List</span>
                <span className="text-slate-400 text-[11px]">Cleared on Oct 20, 2026 • 0 matches found</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-400 text-base mt-0.5">check_circle</span>
              <div>
                <span className="font-bold text-white block">Malpractice Insurance</span>
                <span className="text-slate-400 text-[11px]">Group Telehealth Policy • $1M / $3M aggregate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Card & Commission */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Consultation Rate Card & Split
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Patient Fee / Visit</span>
              <div className="text-lg font-bold text-white mt-1">${fee}.00</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Platform Share (15%)</span>
              <div className="text-lg font-bold text-sky-400 mt-1">
                ${(parseFloat(fee || '0') * 0.15).toFixed(2)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Clinician Payout (85%)</span>
              <div className="text-lg font-bold text-emerald-400 mt-1">
                ${(parseFloat(fee || '0') * 0.85).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
