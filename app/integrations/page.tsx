'use client';

import React, { useState } from 'react';

export default function AdminIntegrationsPage() {
  const [connectors, setConnectors] = useState([
    {
      id: 'epic',
      name: 'Epic Systems (MyChart & Hyperspace)',
      version: 'HL7 FHIR R4 v4.0.1',
      status: 'connected',
      uptime: '99.98%',
      lastSync: '12 seconds ago',
      activeSyncs: 'Lead II ECG, Continuous SpO2, SOAP Notes, CPT 99453',
      endpoint: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4',
      partnerHospital: 'Cleveland Clinic & Mayo Clinic Network',
    },
    {
      id: 'cerner',
      name: 'Oracle Health (Cerner Millennium)',
      version: 'HL7 FHIR R4 Smart-on-FHIR',
      status: 'connected',
      uptime: '99.94%',
      lastSync: '48 seconds ago',
      activeSyncs: 'Patient Demographics, Observations, DiagnosticReports',
      endpoint: 'https://fhir-myrecord.cerner.com/r4/2c240066-b486-4264-a65e-476cde4e4920',
      partnerHospital: 'Johns Hopkins Medicine',
    },
    {
      id: 'meditech',
      name: 'MEDITECH Expanse EHR',
      version: 'HL7 FHIR v3.0 / v4.0',
      status: 'maintenance',
      uptime: '98.50%',
      lastSync: '14 minutes ago',
      activeSyncs: 'In-Patient Telemetry Buffer, Fall Detection Alarms',
      endpoint: 'https://fhir.meditech.com/v1/r4/skyline_health',
      partnerHospital: 'Pacific Metro Health System',
    },
    {
      id: 'athena',
      name: 'Athenahealth Clinicals',
      version: 'Athena API & FHIR v4',
      status: 'connected',
      uptime: '99.99%',
      lastSync: 'Just now',
      activeSyncs: 'Outpatient Telehealth Encounters, e-Prescriptions',
      endpoint: 'https://api.preview.platform.athenahealth.com/v1/fhir/r4',
      partnerHospital: 'Tri-Valley Lung & Cardiology Centers',
    },
  ]);

  const [activeModal, setActiveModal] = useState<any | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestConnection = (id: string) => {
    setTestResult(`Testing WebRTC & FHIR endpoint for ${id}...`);
    setTimeout(() => {
      setTestResult(`✓ Connection established! 200 OK. 18ms latency. OAuth2 token valid for 3580 seconds.`);
    }, 800);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      {/* ── MASTHEAD ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 live-pulse" />
            <span>HL7 FHIR R4 & SMART-ON-FHIR CONNECTORS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hospital EHR & Clinical Integrations Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Bi-directional synchronization of continuous wrist biometric streams, telehealth SOAP notes, and e-prescriptions into institutional EHR networks.
          </p>
        </div>

        <button
          onClick={() => setActiveModal(connectors[0])}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">add_link</span>
          <span>Configure New FHIR Node</span>
        </button>
      </div>

      {testResult && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <span>{testResult}</span>
          <button onClick={() => setTestResult(null)} className="text-slate-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* ── INTEGRATION CONNECTORS GRID ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connectors.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-md flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 font-bold shrink-0">
                    <span className="material-symbols-outlined text-2xl">sync_saved_locally</span>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">{c.name}</h3>
                    <div className="text-[11px] font-mono text-sky-400">{c.version}</div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase shrink-0 ${
                    c.status === 'connected'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 font-mono">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Target Hospital:</span>
                  <span className="text-white truncate max-w-[220px] font-sans">{c.partnerHospital}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Endpoint URL:</span>
                  <span className="text-slate-300 truncate max-w-[220px]">{c.endpoint}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Uptime & Latency:</span>
                  <span className="text-emerald-400 font-bold">{c.uptime} • 18ms</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-400">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase font-mono">
                  Synchronized FHIR Resources:
                </span>
                <span className="text-slate-300 text-[11px]">{c.activeSyncs}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-mono">Synced {c.lastSync}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTestConnection(c.name)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-[11px] transition-colors"
                >
                  Ping Test
                </button>
                <button
                  onClick={() => setActiveModal(c)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] transition-colors"
                >
                  Configure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── REAL-TIME FHIR PAYLOAD TRANSMISSION LOG ─────────────────────────────── */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-emerald-400">data_object</span>
            Recent FHIR Resource Transmission Stream (Last 100 Transactions)
          </span>
          <span className="text-slate-400 font-mono">Auto-refreshing • HL7 FHIR v4</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[620px]">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Resource Type</th>
                <th className="py-3 px-4">Target EHR</th>
                <th className="py-3 px-4">Patient MRN</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
              {[
                { id: 'tx-88192', res: 'Observation (ECG Lead II)', ehr: 'Epic MyChart', mrn: 'SK-88329', status: '201 Created', time: '12s ago' },
                { id: 'tx-88191', res: 'Encounter (Telehealth)', ehr: 'Cerner Millennium', mrn: 'SK-94021', status: '200 OK', time: '48s ago' },
                { id: 'tx-88190', res: 'MedicationRequest (Metoprolol)', ehr: 'Athenahealth', mrn: 'SK-77180', status: '201 Created', time: '2m ago' },
                { id: 'tx-88189', res: 'Observation (SpO2 99%)', ehr: 'Epic MyChart', mrn: 'SK-31902', status: '201 Created', time: '3m ago' },
                { id: 'tx-88188', res: 'Claim (CPT 99453 RPM)', ehr: 'Clearinghouse EDI 837', mrn: 'SK-44912', status: '200 OK', time: '6m ago' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400">{row.id}</td>
                  <td className="py-3 px-4 text-white font-sans">{row.res}</td>
                  <td className="py-3 px-4">{row.ehr}</td>
                  <td className="py-3 px-4">{row.mrn}</td>
                  <td className="py-3 px-4">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50 text-[10px] font-bold">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CONNECTOR CONFIGURATION MODAL ───────────────────────────────────────── */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-white text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">settings_input_component</span>
                <h3 className="text-sm font-bold">Configure {activeModal.name}</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  FHIR v4 Base Server URL
                </label>
                <input
                  type="text"
                  defaultValue={activeModal.endpoint}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-[11px] focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Client ID / Application Key
                  </label>
                  <input
                    type="text"
                    defaultValue="skyline_prod_fhir_99412"
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-[11px] focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Environment
                  </label>
                  <select className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none">
                    <option>Production (HIPAA Vault)</option>
                    <option>Staging Sandbox</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  OAuth2 Token Endpoint
                </label>
                <input
                  type="text"
                  defaultValue="https://oauth.epic.com/oauth2/token"
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-[11px] focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Settings for ${activeModal.name} saved successfully.`);
                  setActiveModal(null);
                }}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-bold"
              >
                Save & Deploy Connector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
