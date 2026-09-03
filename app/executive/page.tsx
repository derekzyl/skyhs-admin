'use client';

import React from 'react';
import Link from 'next/link';

export default function ExecutiveHealthCommandPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* ── HEADER ─────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm">shield</span>
            <span>EXECUTIVE POPULATION HEALTH & OPERATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Executive Health Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Macro-level patient risk distribution, hospital network performance, and platform financial health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">video_camera_front</span>
            <span>Live Telehealth Console</span>
          </Link>
        </div>
      </div>

      {/* ── MACRO KPIS ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Enrolled Patient Population</span>
            <span className="material-symbols-outlined text-sky-400">groups</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white">12,480</div>
          <div className="text-[11px] text-emerald-400 font-mono">+12.4% Net New Members</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Hardware Telemetry Links</span>
            <span className="material-symbols-outlined text-emerald-400">watch</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">4,792 Active</div>
          <div className="text-[11px] text-slate-400 font-mono">99.9% Cellular Uptime</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Gross Monthly Telehealth</span>
            <span className="material-symbols-outlined text-purple-400">payments</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white">$482,000</div>
          <div className="text-[11px] text-sky-400 font-mono">15% Net Commission: $72.3k</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Arrhythmias Intervened</span>
            <span className="material-symbols-outlined text-rose-400">ecg_heart</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-400">142 Events</div>
          <div className="text-[11px] text-slate-400 font-mono">100% Specialist Responded</div>
        </div>
      </div>

      {/* ── RISK STRATIFICATION PYRAMID & HOSPITAL PARTNERS ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Population Risk Tiering */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400">stacked_bar_chart</span>
            Patient Population Risk Stratification
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-rose-900/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Critical Tier (Acute Arrhythmia / Severe Hypoxia)
                </span>
                <span className="font-mono text-rose-300 font-bold">2.4% (300 patients)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-rose-500 w-[2.4%]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-amber-900/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Elevated Tier (Stage 2 HTN / Frequent Tachy Spikes)
                </span>
                <span className="font-mono text-amber-300 font-bold">8.1% (1,010 patients)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-amber-500 w-[8.1%]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  Moderate Tier (Post-Viral Fatigue / Borderline SpO2)
                </span>
                <span className="font-mono text-sky-300 font-bold">24.5% (3,058 patients)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-sky-500 w-[24.5%]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Normal Tier (Resting Sinus Rhythm / Well-Managed)
                </span>
                <span className="font-mono text-emerald-300 font-bold">65.0% (8,112 patients)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[65%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Hospital Partners */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400">apartment</span>
            Health System Affiliate Hubs
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">St. Jude Heart & Vascular</span>
                <span className="text-slate-400 text-[11px]">42 Active Cardiologists • Epic FHIR Live</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold">
                ONLINE
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Johns Hopkins Medicine Center</span>
                <span className="text-slate-400 text-[11px]">28 Endocrinologists • Epic FHIR Live</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold">
                ONLINE
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Lagos Univ Teaching Hospital (LUTH)</span>
                <span className="text-slate-400 text-[11px]">22 Internists • Regional Telehealth Lead</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold">
                ONLINE
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Cleveland Clinic Neurological</span>
                <span className="text-slate-400 text-[11px]">18 Neurologists • Cerner Bridge</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold">
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
