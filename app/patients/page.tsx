'use client';

import React, { useState } from 'react';

export default function AdminPatientsPage() {
  const [search, setSearch] = useState('');

  const patients = [
    { id: 'PT-94021', name: 'Eleanor Vance-Kovacs', age: 64, gender: 'F', risk: 'Elevated (Tachycardia)', watch: 'VitalsWatch Pro #4021', lastSync: '2 min ago', doctor: 'Dr. Julian Vance' },
    { id: 'PT-88219', name: 'David K. Adeleke', age: 52, gender: 'M', risk: 'Moderate (HTN)', watch: 'VitalsWatch Pro #8821', lastSync: '14 min ago', doctor: 'Dr. Sarah Lin' },
    { id: 'PT-77402', name: 'Hannah Nguyen', age: 39, gender: 'F', risk: 'Low Risk', watch: 'VitalsWatch Pro #7740', lastSync: '1 hr ago', doctor: 'Dr. Anthony Adebayo' },
    { id: 'PT-66190', name: 'Marcus Brody Jr.', age: 71, gender: 'M', risk: 'High (COPD / Hypoxia)', watch: 'VitalsWatch Pro #6619', lastSync: '5 min ago', doctor: 'Dr. Marcus Brody' },
  ];

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search)
  );

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Patient Member Directory</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Population health monitoring, continuous sensor link statuses, and risk stratification.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Total Enrolled Members: <span className="text-white font-bold">12,480</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient name, MRN, assigned doctor, or risk tier..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Patient Member</th>
              <th className="py-3 px-4">Risk Stratification</th>
              <th className="py-3 px-4">Hardware Telemetry Link</th>
              <th className="py-3 px-4">Last Sync</th>
              <th className="py-3 px-4">Assigned Attending</th>
              <th className="py-3 px-4 text-right">EHR Chart</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white">{p.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {p.id} • {p.age}y {p.gender}
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.risk.startsWith('High')
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : p.risk.startsWith('Elevated')
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {p.risk}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-300 flex items-center gap-1.5 mt-2">
                  <span className="material-symbols-outlined text-xs text-sky-400">watch</span>
                  <span>{p.watch}</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">{p.lastSync}</td>
                <td className="py-3.5 px-4 text-white font-semibold">{p.doctor}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => alert(`Opening HL7 FHIR chart for ${p.name} (${p.id})...`)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold border border-slate-700 transition-colors"
                  >
                    Chart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
