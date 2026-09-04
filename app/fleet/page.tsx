'use client';

import React, { useEffect, useState } from 'react';
import { apiGet, errorMessage, getAccessToken } from '@/lib/api';
import type { DeviceOut } from '@/lib/types';

export default function AdminFleetPage() {
  const [devices, setDevices] = useState<DeviceOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        if (!getAccessToken()) {
          setError('Sign in as an admin user to load devices.');
          setDevices([]);
          return;
        }
        const data = await apiGet<DeviceOut[]>('/api/v1/health/devices');
        if (!cancelled) setDevices(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) {
          setError(
            errorMessage(
              err,
              'Could not load devices. This endpoint returns devices for the logged-in user.'
            )
          );
          setDevices([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Wearable Device Fleet Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Devices linked to the authenticated admin account via GET /api/v1/health/devices.
          </p>
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-mono text-slate-400">Linked Devices</div>
          <div className="text-3xl font-extrabold font-mono text-white mt-1">
            {loading ? '…' : devices.length}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-mono text-slate-400">Active</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
            {devices.filter((d) => d.is_active).length}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-mono text-slate-400">Inactive</div>
          <div className="text-3xl font-extrabold font-mono text-amber-400 mt-1">
            {devices.filter((d) => !d.is_active).length}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Hardware ID</th>
              <th className="py-3 px-4">Name & Firmware</th>
              <th className="py-3 px-4">Last Sync</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500">
                  Loading devices…
                </td>
              </tr>
            ) : devices.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500">
                  No devices returned for this account.
                </td>
              </tr>
            ) : (
              devices.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-sky-400">{d.hardware_id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-sans font-semibold text-white">{d.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {d.firmware_version || 'Firmware n/a'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {d.last_sync_at
                      ? new Date(d.last_sync_at).toLocaleString()
                      : 'Never'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.is_active
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {d.is_active ? 'Online' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
