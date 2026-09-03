'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // If on login page, hide the sidebar
  if (pathname === '/login') {
    return null;
  }

  const telehealthNav = [
    { label: 'Live Console', href: '/', icon: 'dashboard', badge: 'LIVE' },
    { label: 'Executive Command', href: '/executive', icon: 'shield' },
    { label: 'Consultant Network', href: '/consultants', icon: 'stethoscope', badge: '12 New' },
    { label: 'Clinical Analytics', href: '/analytics', icon: 'monitoring' },
    { label: 'Payouts & Billing', href: '/payouts', icon: 'account_balance_wallet' },
    { label: 'Disputes & Flags', href: '/disputes', icon: 'flag', badge: '2 Open' },
  ];

  const platformNav = [
    { label: 'Patient Directory', href: '/patients', icon: 'groups' },
    { label: 'Wearable Fleet', href: '/fleet', icon: 'watch' },
    { label: 'Alert Rules Engine', href: '/rules', icon: 'rule' },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between h-screen sticky top-0 border-r border-slate-800 bg-slate-950 transition-all z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* ── TOP: BRAND ──────────────────────────────────────────────────────────── */}
      <div>
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-xl">vital_signs</span>
            </div>
            {!collapsed && (
              <div>
                <span className="text-sm font-extrabold tracking-tight text-white block leading-none">
                  SKYLINE <span className="text-secondary-container">HEALTH</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mt-0.5">
                  Admin Command
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <span className="material-symbols-outlined text-lg">
              {collapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {/* Section 1: Telehealth Operations */}
          <div>
            {!collapsed && (
              <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
                Telehealth Operations
              </div>
            )}
            <nav className="space-y-1">
              {telehealthNav.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-container text-white font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-lg shrink-0">
                        {item.icon}
                      </span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          item.badge === 'LIVE'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Section 2: Platform & Fleet */}
          <div>
            {!collapsed && (
              <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
                Population & Fleet
              </div>
            )}
            <nav className="space-y-1">
              {platformNav.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-container text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                    title={item.label}
                  >
                    <span className="material-symbols-outlined text-lg shrink-0">
                      {item.icon}
                    </span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* ── BOTTOM: SYSTEM HEALTH & ADMIN PROFILE ─────────────────────────────────── */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 space-y-3">
        {!collapsed && (
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-400">WebRTC Mesh</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-pulse" />
                Operational
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Latency: 14ms • HIPAA Encrypted
            </div>
          </div>
        )}

        {/* User Card */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold shrink-0">
            CMO
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">Dr. Arinze Okafor</div>
              <div className="text-[10px] text-slate-400 truncate">Chief Medical Officer</div>
            </div>
          )}
          <Link href="/login" title="Sign Out" className="text-slate-500 hover:text-slate-300">
            <span className="material-symbols-outlined text-base">logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
