'use client';

import React from 'react';

export default function AdminRulesPage() {
  const rules = [
    { name: 'Sustained Tachycardia Alert', condition: 'Heart Rate > 130 BPM for > 3 minutes', severity: 'Critical', action: 'Trigger Urgent Telehealth Pager & Ring Attending MD', enabled: true },
    { name: 'Acute Nocturnal Hypoxia Alert', condition: 'SpO2 < 90% for > 60 seconds during sleep', severity: 'High', action: 'Log EHR Event & Flag Next Morning Consult', enabled: true },
    { name: 'Severe Bradycardia Alert', condition: 'Heart Rate < 40 BPM (Non-athletic baseline)', severity: 'Critical', action: 'Automated 911 Triage Escalation & SMS Guardian', enabled: true },
    { name: 'Hypertensive Urgency', condition: 'Blood Pressure > 180/120 mmHg', severity: 'High', action: 'Notify On-Call Nephrologist / Cardiologist', enabled: false },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Clinical Alert Rules Engine</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure threshold triggers, escalation protocols, and automated specialist dispatch logic.
          </p>
        </div>

        <button
          onClick={() => alert('New clinical triage rule created.')}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Add Custom Triage Rule</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Rule Name</th>
              <th className="py-3 px-4">Telemetry Trigger Condition</th>
              <th className="py-3 px-4">Severity Tier</th>
              <th className="py-3 px-4">Clinical Escalation Action</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {rules.map((r, i) => (
              <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-white">{r.name}</td>
                <td className="py-3.5 px-4 font-mono text-sky-400">{r.condition}</td>
                <td className="py-3.5 px-4 font-mono">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.severity === 'Critical'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {r.severity}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-300 max-w-xs">{r.action}</td>
                <td className="py-3.5 px-4 text-right">
                  <span className={`font-mono text-xs font-bold ${r.enabled ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {r.enabled ? 'ACTIVE' : 'DISABLED'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
