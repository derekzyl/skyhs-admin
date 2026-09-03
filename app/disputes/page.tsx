'use client';

import React, { useState } from 'react';
import { MOCK_DISPUTES, AdminDispute } from '@/data/mockAdminData';

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<AdminDispute[]>(MOCK_DISPUTES);

  const handleResolve = (id: string, action: 'refund' | 'dismiss') => {
    setDisputes(
      disputes.map((d) => (d.id === id ? { ...d, status: 'resolved' } : d))
    );
    alert(`Dispute ${id}: Action '${action.toUpperCase()}' executed successfully.`);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Disputes & Clinical Flag Triage
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Resolve encounter audio/video packet dropouts, prescription fulfillment issues, and patient refund requests.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          Resolution SLA: &lt; 24 Hours
        </div>
      </div>

      <div className="space-y-4">
        {disputes.map((dsp) => (
          <div
            key={dsp.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-sky-400 font-bold">{dsp.id}</span>
                <span>•</span>
                <span className="text-slate-400">Encounter {dsp.encounterId}</span>
                <span>•</span>
                <span className="text-slate-500">{dsp.date}</span>
              </div>

              <div className="flex items-center gap-3 font-mono">
                <span className="text-slate-400">Amount: ${dsp.amount.toFixed(2)}</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                    dsp.status === 'resolved'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {dsp.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <div className="text-xs">
                  <span className="text-slate-400">Patient: </span>
                  <span className="font-bold text-white">{dsp.patientName}</span>
                  <span className="text-slate-500 mx-2">•</span>
                  <span className="text-slate-400">Attending MD: </span>
                  <span className="font-bold text-white">{dsp.clinicianName}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-rose-400 font-bold">Complaint: </span>
                  {dsp.reason}
                </p>

                {/* WebRTC Health Log */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span className="material-symbols-outlined text-sm text-sky-400">troubleshoot</span>
                  <span>WebRTC Diagnostics: </span>
                  <span
                    className={
                      dsp.webrtcLogHealth === 'packet_loss_detected'
                        ? 'text-rose-400 font-bold'
                        : 'text-emerald-400 font-bold'
                    }
                  >
                    {dsp.webrtcLogHealth === 'packet_loss_detected'
                      ? 'Client Packet Loss Detected (14% uplink drop)'
                      : 'Clean Session Logs (0 packet loss)'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2 justify-end">
                {dsp.status !== 'resolved' ? (
                  <>
                    <button
                      onClick={() => handleResolve(dsp.id, 'refund')}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
                    >
                      Issue Full Refund (${dsp.amount})
                    </button>
                    <button
                      onClick={() => handleResolve(dsp.id, 'dismiss')}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
                    >
                      Dismiss Complaint
                    </button>
                  </>
                ) : (
                  <div className="p-2 text-center bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-emerald-400 text-xs font-bold">
                    Incident Closed
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
