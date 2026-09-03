'use client';

import React from 'react';

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Clinical Operations & Telemetry Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Population-level telehealth utilization, patient CSAT satisfaction, and WebRTC streaming uptime.
          </p>
        </div>

        <button
          onClick={() => alert('Executive Monthly Clinical Quality PDF report exported.')}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-bold text-sky-400 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>Export Analytics PDF</span>
        </button>
      </div>

      {/* ── KPI TILES ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Total Consultations (MTD)</div>
          <div className="text-3xl font-extrabold font-mono text-white">1,420</div>
          <div className="text-[11px] text-emerald-400 font-mono">+18% vs last month</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Average Visit Duration</div>
          <div className="text-3xl font-extrabold font-mono text-sky-400">18.4 min</div>
          <div className="text-[11px] text-slate-400 font-mono">Target: 15-20 min</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Patient CSAT Rating</div>
          <div className="text-3xl font-extrabold font-mono text-amber-400">4.94 / 5.0</div>
          <div className="text-[11px] text-slate-400 font-mono">98.6% positive feedback</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-400">Telemetry Stream Uptime</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">99.8%</div>
          <div className="text-[11px] text-slate-400 font-mono">&lt; 0.2% WebRTC packet drop</div>
        </div>
      </div>

      {/* ── VOLUME CHART & SPECIALTY DEMAND ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SVG Consultation Volume Graph */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Weekly Telehealth Visit Volume</h3>
              <p className="text-xs text-slate-400 mt-0.5">Encounters completed across all specialties</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Past 6 Weeks</span>
          </div>

          <div className="h-52 w-full bg-slate-950 rounded-xl p-4 border border-slate-800 relative flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 140" preserveAspectRatio="none">
              <defs>
                <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0F4C81" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0F4C81" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,90 Q 60,80 120,60 T 240,75 T 360,40 T 480,25 T 600,15 L 600,140 L 0,140 Z"
                fill="url(#analyticsGrad)"
              />
              <path
                d="M 0,90 Q 60,80 120,60 T 240,75 T 360,40 T 480,25 T 600,15"
                fill="none"
                stroke="#81B9FE"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-2">
            <span>Week 36 (180 visits)</span>
            <span>Week 37 (210 visits)</span>
            <span>Week 38 (240 visits)</span>
            <span>Week 39 (295 visits)</span>
            <span>Week 40 (340 visits)</span>
            <span className="text-sky-400 font-bold">Week 41 (420 visits)</span>
          </div>
        </div>

        {/* Specialty Distribution Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Consultations by Specialty</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">Cardiology</span>
                <span className="font-mono text-sky-400">42% (596 visits)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full rounded-full bg-sky-500 w-[42%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">Endocrinology</span>
                <span className="font-mono text-emerald-400">26% (369 visits)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 w-[26%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">General Health</span>
                <span className="font-mono text-purple-400">18% (255 visits)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full rounded-full bg-purple-500 w-[18%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">Neurology</span>
                <span className="font-mono text-amber-400">9% (128 visits)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500 w-[9%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">Pulmonology</span>
                <span className="font-mono text-rose-400">5% (72 visits)</span>
              </div>
              <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full rounded-full bg-rose-500 w-[5%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
