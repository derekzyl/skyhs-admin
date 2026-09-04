'use client';

import React from 'react';

export default function AdminRulesPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Clinical Alert Rules Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Threshold triggers and escalation protocols.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center space-y-3">
        <span className="material-symbols-outlined text-4xl text-slate-500">rule</span>
        <h2 className="text-sm font-bold text-white">Coming soon</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Custom triage rules are not available in this build. Wearable alerts continue to use
          server-side health risk endpoints when enabled.
        </p>
      </div>
    </div>
  );
}
