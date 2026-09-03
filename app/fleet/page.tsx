'use client';

import React from 'react';

export default function AdminFleetPage() {
  const devices = [
    { imei: '864920193021940', model: 'VitalsWatch Pro 5G', user: 'Eleanor Vance-Kovacs', battery: '88%', signal: '5G Excellent', firmware: 'v2.4.1 (Latest)', status: 'Online' },
    { imei: '864920193028821', model: 'VitalsWatch Pro 5G', user: 'David K. Adeleke', battery: '94%', signal: '4G LTE Good', firmware: 'v2.4.1 (Latest)', status: 'Online' },
    { imei: '864920193027740', model: 'VitalsWatch SE Cellular', user: 'Hannah Nguyen', battery: '42%', signal: 'BLE Paired', firmware: 'v2.3.9 (Pending Update)', status: 'Online' },
    { imei: '864920193026619', model: 'VitalsWatch Pro 5G', user: 'Marcus Brody Jr.', battery: '15%', signal: '5G Low Battery', firmware: 'v2.4.1 (Latest)', status: 'Alert' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Wearable Device Fleet Manager</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Global eSIM connectivity, battery telemetry, and OTA firmware rollout for patient smartwatches.
          </p>
        </div>

        <button
          onClick={() => alert('OTA Firmware update v2.4.2 queued for 1,240 devices.')}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">system_update</span>
          <span>Deploy OTA Update</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-mono text-slate-400">Total Deployed Wearables</div>
          <div className="text-3xl font-extrabold font-mono text-white mt-1">4,850</div>
          <div className="text-xs text-emerald-400 font-mono mt-0.5">4,792 Active / Connected</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-mono text-slate-400">Cellular eSIM Uptime</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">99.94%</div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">Dual-carrier AT&T / T-Mobile</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-mono text-slate-400">Low Battery Warnings (&lt; 20%)</div>
          <div className="text-3xl font-extrabold font-mono text-amber-400 mt-1">18</div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">Automated SMS reminder sent</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Hardware IMEI</th>
              <th className="py-3 px-4">Model & Firmware</th>
              <th className="py-3 px-4">Assigned Member</th>
              <th className="py-3 px-4">Battery Level</th>
              <th className="py-3 px-4">Cellular Signal</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
            {devices.map((d) => (
              <tr key={d.imei} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-sky-400">{d.imei}</td>
                <td className="py-3.5 px-4">
                  <div className="font-sans font-semibold text-white">{d.model}</div>
                  <div className="text-[10px] text-slate-400">{d.firmware}</div>
                </td>
                <td className="py-3.5 px-4 font-sans text-white">{d.user}</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">{d.battery}</td>
                <td className="py-3.5 px-4 text-slate-300">{d.signal}</td>
                <td className="py-3.5 px-4 text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.status === 'Alert'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {d.status}
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
