'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_ADMIN_CONSULTANTS, AdminConsultant } from '@/data/mockAdminData';

export default function AdminConsultantsPage() {
  const [consultants, setConsultants] = useState<AdminConsultant[]>(MOCK_ADMIN_CONSULTANTS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending_review' | 'suspended'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSpecialty, setInviteSpecialty] = useState('Cardiology');

  const filteredConsultants = consultants.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.npi.includes(searchQuery) ||
      c.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.licenseState.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (id: string) => {
    setConsultants(
      consultants.map((c) =>
        c.id === id ? { ...c, status: 'active', malpracticeVerified: true } : c
      )
    );
  };

  const handleSuspend = (id: string) => {
    setConsultants(
      consultants.map((c) => (c.id === id ? { ...c, status: 'suspended' } : c))
    );
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* ── HEADER ─────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Consultant Network & Credentialing
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supervise physician privileging, IMLC compact licenses, malpractice certificates, and fee structures.
          </p>
        </div>

        <button
          onClick={() => setInviteModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">person_add</span>
          <span>Invite New Specialist</span>
        </button>
      </div>

      {/* ── SEARCH & FILTER TABS ─────────────────────────────────────────────────── */}
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
              placeholder="Search by physician name, NPI, state (e.g. CA, NY) or sub-specialty..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-1.5">
            {[
              { key: 'all', label: 'All' },
              { key: 'active', label: 'Active' },
              { key: 'pending_review', label: 'Pending (2)' },
              { key: 'suspended', label: 'Suspended' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key as any)}
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

      {/* ── CONSULTANTS ROSTER TABLE ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-white">
            Showing {filteredConsultants.length} of {consultants.length} Registered Clinicians
          </span>
          <span className="text-slate-400 font-mono">15% platform commission rate</span>
        </div>

        {/* Mobile View: High-Density Physician Cards */}
        <div className="md:hidden divide-y divide-slate-800">
          {filteredConsultants.map((doc) => (
            <div key={doc.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div>
                    <Link
                      href={`/consultants/${doc.id}`}
                      className="text-sm font-bold text-white hover:text-sky-400"
                    >
                      {doc.name}
                    </Link>
                    <div className="text-xs text-sky-400 font-semibold">{doc.specialty}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{doc.hospital}</div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase shrink-0 ${
                    doc.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : doc.status === 'pending_review'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {doc.status.replace('_', ' ')}
                </span>
              </div>

              {/* NPI & Licensure row */}
              <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">NPI & State</span>
                  <span className="font-mono text-sky-400 font-bold text-[11px]">{doc.npi}</span>
                  <span className="text-slate-400 text-[10px] block">State {doc.licenseState}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Visits / Rating</span>
                  <span className="font-mono text-white font-bold text-[11px]">{doc.totalEncounters} Encounters</span>
                  {doc.rating > 0 && (
                    <span className="text-amber-400 text-[10px] flex items-center gap-0.5">
                      ★ {doc.rating} / 5.0
                    </span>
                  )}
                </div>
              </div>

              {/* Actions row */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <Link
                  href={`/consultants/${doc.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs border border-slate-700"
                >
                  View Dossier
                </Link>
                {doc.status === 'pending_review' && (
                  <button
                    onClick={() => handleApprove(doc.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    Approve
                  </button>
                )}
                {doc.status === 'active' && (
                  <button
                    onClick={() => handleSuspend(doc.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-800 text-xs"
                  >
                    Suspend
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Full Roster Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Physician Details</th>
                <th className="py-3 px-4">NPI & Licensure</th>
                <th className="py-3 px-4">Specialty</th>
                <th className="py-3 px-4">Malpractice</th>
                <th className="py-3 px-4">Encounters</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredConsultants.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.avatarUrl}
                        alt={doc.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <Link
                          href={`/consultants/${doc.id}`}
                          className="font-bold text-white hover:text-sky-400 transition-colors"
                        >
                          {doc.name}
                        </Link>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{doc.hospital}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div className="text-sky-400 font-bold">{doc.npi}</div>
                    <div className="text-[10px] text-slate-400">
                      State {doc.licenseState} • #{doc.licenseNumber}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{doc.specialty}</div>
                    <div className="text-[10px] text-slate-400">{doc.subSpecialty}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    {doc.malpracticeVerified ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-mono text-[10px] font-bold flex items-center gap-1 w-fit">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/50 font-mono text-[10px] font-bold w-fit">
                        Pending COI
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-bold text-white">{doc.totalEncounters} visits</div>
                    {doc.rating > 0 && (
                      <div className="text-[10px] text-amber-400 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">star</span>
                        {doc.rating}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                        doc.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : doc.status === 'pending_review'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {doc.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                    <Link
                      href={`/consultants/${doc.id}`}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold border border-slate-700 transition-colors"
                    >
                      Dossier
                    </Link>
                    {doc.status === 'pending_review' && (
                      <button
                        onClick={() => handleApprove(doc.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    {doc.status === 'active' && (
                      <button
                        onClick={() => handleSuspend(doc.id)}
                        className="px-2 py-1 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-800 transition-colors"
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── INVITE SPECIALIST MODAL ──────────────────────────────────────────────── */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Invite Specialist to Network</h3>
              <button onClick={() => setInviteModalOpen(false)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Physician Email</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. specialist@hospital.org"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Specialty Department</label>
                <select
                  value={inviteSpecialty}
                  onChange={(e) => setInviteSpecialty(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                >
                  <option>Cardiology</option>
                  <option>Endocrinology</option>
                  <option>General Health</option>
                  <option>Neurology</option>
                  <option>Pulmonology</option>
                </select>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                Invitation sends a unique single-use token directing the physician to complete the 4-step CAQH & telemetry privileging wizard.
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setInviteModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Invitation dispatched to ${inviteEmail || 'specialist@hospital.org'}.`);
                  setInviteModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md"
              >
                Send Credentialing Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
