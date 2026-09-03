'use client';

import React, { useState } from 'react';
import { MOCK_PAYOUTS, AdminPayoutRecord } from '@/data/mockAdminData';

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<AdminPayoutRecord[]>(MOCK_PAYOUTS);
  const [disbursed, setDisbursed] = useState(false);

  const handleBatchDisburse = () => {
    setPayouts(payouts.map((p) => ({ ...p, status: 'processed' })));
    setDisbursed(true);
    alert('Batch ACH transfer of $8,134.50 initiated via JPMorgan Chase Treasury Gateway.');
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Clinician Payouts & Financial Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Weekly direct ACH disbursements, 15% platform commission accounting, and CPT telemetry settlement.
          </p>
        </div>

        <button
          onClick={handleBatchDisburse}
          disabled={disbursed}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-2 ${
            disbursed
              ? 'bg-emerald-800 text-emerald-200 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950'
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {disbursed ? 'check_circle' : 'send_money'}
          </span>
          <span>{disbursed ? 'Batch ACH Disbursed' : 'Disburse Friday Batch ACH ($8,134.50)'}</span>
        </button>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Total Gross Billings</div>
          <div className="text-3xl font-extrabold font-mono text-white">$9,570.00</div>
          <div className="text-xs text-slate-400">82 encounters this pay cycle</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Platform Revenue (15%)</div>
          <div className="text-3xl font-extrabold font-mono text-sky-400">$1,435.50</div>
          <div className="text-xs text-slate-400">Net retained commission</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Net Clinician Disbursements</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">$8,134.50</div>
          <div className="text-xs text-slate-400">ACH direct transfer scheduled</div>
        </div>
      </div>

      {/* Payout Ledger Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between text-xs">
          <h3 className="font-bold text-white">Disbursement Batch Ledger • Cycle 2026-W42</h3>
          <span className="text-slate-400 font-mono">Plaid Institutional Direct Deposit</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Batch ID</th>
                <th className="py-3 px-4">Clinician & NPI</th>
                <th className="py-3 px-4">Visits</th>
                <th className="py-3 px-4">Gross Billing</th>
                <th className="py-3 px-4">Platform (15%)</th>
                <th className="py-3 px-4">Net Payout</th>
                <th className="py-3 px-4">Bank Destination</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-400">{p.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{p.clinicianName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">NPI: {p.npi}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{p.encountersCount} encounters</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    ${p.grossAmount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    -${p.platformFee.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    ${p.netPayout.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{p.bankAccount}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                        p.status === 'processed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
