'use client';

import React from 'react';

export default function AdminIntegrationsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Hospital EHR Integrations
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          FHIR / EHR connector status.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center space-y-3">
        <span className="material-symbols-outlined text-4xl text-slate-500">
          sync_saved_locally
        </span>
        <h2 className="text-sm font-bold text-white">No integrations configured</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Epic, Cerner, and other EHR connectors are not wired in this environment. Configure
          partners when institutional APIs are available.
        </p>
      </div>
    </div>
  );
}
