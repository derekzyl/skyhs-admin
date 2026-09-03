'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_ACTIVE_CALLS } from '@/data/mockAdminData';

export default function AdminCommandConsolePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'cardiology' | 'endocrinology' | 'general'>('all');

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* ── TOP OPERATIONAL MASTHEAD ────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
            <span>GLOBAL WEBRTC TELEHEALTH MESH • OPERATIONAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Telehealth Operations Command Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time multi-stream clinical supervision, doctor queue latencies, and continuous wrist sensor feeds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/consultants"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-bold text-sky-400 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>Review 2 Applicants</span>
          </Link>
          <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-base">dns</span>
            <span>Cluster US-West-1 (14ms)</span>
          </div>
        </div>
      </div>

      {/* ── REAL-TIME PLATFORM KPIS ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Live Encounters Now</span>
            <span className="material-symbols-outlined text-emerald-400">video_camera_front</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white">42 Active</div>
          <div className="text-[11px] text-emerald-400 font-mono">0 dropped packets</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Average Queue Wait</span>
            <span className="material-symbols-outlined text-sky-400">timer</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-sky-400">2.4 min</div>
          <div className="text-[11px] text-slate-400 font-mono">Target: &lt; 5.0 min</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Specialists On Duty</span>
            <span className="material-symbols-outlined text-purple-400">stethoscope</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white">128 MDs</div>
          <div className="text-[11px] text-slate-400 font-mono">Across 5 Compact States</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Daily Telehealth Gross</span>
            <span className="material-symbols-outlined text-amber-400">payments</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">$34,820</div>
          <div className="text-[11px] text-slate-400 font-mono">248 CPT Encounters</div>
        </div>
      </div>

      {/* ── LIVE ACTIVE VIDEO ENCOUNTERS MULTI-VIEW ──────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 live-pulse" />
              <span>Live Video Stream & Telemetry Supervision</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Supervising encrypted clinician-to-patient WebRTC pipelines with real-time Lead II trace health.
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

        {/* Live Calls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ACTIVE_CALLS.map((call) => (
            <div
              key={call.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl flex flex-col justify-between"
            >
              {/* Stream Preview Header */}
              <div className="relative h-44 bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={
                    call.id === 'call-01'
                      ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80'
                      : call.id === 'call-02'
                      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80'
                      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80'
                  }
                  alt={call.patientName}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60" />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-pulse" />
                    <span>{call.duration}</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-sky-400 border border-sky-900/50">
                    {call.latencyMs}ms RTT
                  </div>
                </div>

                {/* Doctor PiP inside stream card */}
                <div className="absolute bottom-3 right-3 w-14 h-14 rounded-xl overflow-hidden border border-white/40 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80"
                    alt={call.doctorName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-3 left-3">
                  <div className="text-xs font-bold text-white leading-tight">{call.patientName}</div>
                  <div className="text-[10px] text-sky-300 font-mono">{call.cptCode}</div>
                </div>
              </div>

              {/* Stream Telemetry Bar */}
              <div className="p-4 bg-slate-900 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Attending Specialist</span>
                    <span className="font-bold text-white">{call.doctorName}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                    {call.specialty}
                  </span>
                </div>

                {/* Mini ECG Metrics */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[9px] text-slate-500 uppercase">Heart Rate</div>
                    <div className="text-sm font-bold text-rose-400">{call.heartRate} BPM</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[9px] text-slate-500 uppercase">SpO2 Pulse Ox</div>
                    <div className="text-sm font-bold text-sky-400">{call.spo2}%</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-emerald-400 text-sm">lock</span>
                    HL7 FHIR Live
                  </span>
                  <button
                    onClick={() => alert(`Auditing WebRTC logs for ${call.id}... 0 packet drops detected.`)}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300"
                  >
                    Audit Stream →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SPECIALIST REGIONAL COVERAGE & STATE LICENSURE SUMMARY ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400">public</span>
            Regional Specialist Telemetry Distribution (IMLC Compacts)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-base font-bold text-white">42 MDs</div>
              <div className="text-[10px] text-slate-400">California (CA)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-base font-bold text-white">38 MDs</div>
              <div className="text-[10px] text-slate-400">New York (NY)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-base font-bold text-white">28 MDs</div>
              <div className="text-[10px] text-slate-400">Texas (TX)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-base font-bold text-emerald-400">20 MDs</div>
              <div className="text-[10px] text-slate-400">West Africa / LUTH</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Quick Administration Actions</h3>
          </div>
          <div className="space-y-2 text-xs">
            <Link
              href="/consultants"
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-sky-400">verified_user</span>
                <span>Review Pending Clinician Applications (2)</span>
              </div>
              <span className="material-symbols-outlined text-slate-500 text-sm">arrow_forward</span>
            </Link>

            <Link
              href="/payouts"
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-emerald-400">payments</span>
                <span>Batch Approve Friday ACH Payouts ($9,570.00)</span>
              </div>
              <span className="material-symbols-outlined text-slate-500 text-sm">arrow_forward</span>
            </Link>

            <Link
              href="/disputes"
              className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-amber-400">report_problem</span>
                <span>Open Patient Incident Flags (1 New)</span>
              </div>
              <span className="material-symbols-outlined text-slate-500 text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
