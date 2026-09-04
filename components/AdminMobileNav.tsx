'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AdminMobileNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // If on login or reset-password page, do not show admin mobile nav
  if (pathname === '/login' || pathname === '/reset-password') {
    return null;
  }

  const telehealthNav = [
    { label: 'Live Telehealth Console', href: '/', icon: 'dashboard', badge: 'LIVE' },
    { label: 'Executive Command', href: '/executive', icon: 'shield' },
    { label: 'Consultant Roster & Privileging', href: '/consultants', icon: 'stethoscope', badge: '12 New' },
    { label: 'Clinical Analytics', href: '/analytics', icon: 'monitoring' },
    { label: 'Payouts & Billing Ledger', href: '/payouts', icon: 'account_balance_wallet' },
    { label: 'Disputes & Flags', href: '/disputes', icon: 'flag', badge: '2 Open' },
  ];

  const platformNav = [
    { label: 'Patient Directory', href: '/patients', icon: 'groups' },
    { label: 'Wearable Device Fleet', href: '/fleet', icon: 'watch' },
    { label: 'Alert Rules Engine', href: '/rules', icon: 'rule' },
    { label: 'Hospital EHR Integrations', href: '/integrations', icon: 'sync_saved_locally', badge: 'FHIR v4' },
  ];

  return (
    <div className="md:hidden sticky top-0 z-40 w-full bg-slate-950 border-b border-slate-800 text-white shadow-lg">
      {/* ── TOP MOBILE BAR ──────────────────────────────────────────────────────── */}
      <div className="h-14 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden p-1 shadow-md shrink-0">
            <Image
              src="/logo.png"
              alt="Skyline Health"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-xs font-extrabold tracking-tight text-white leading-none">
              SKYLINE <span className="text-secondary-container font-semibold">HEALTH</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-pulse" />
              <span>Admin Console</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-400">
            MESH 14ms
          </span>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            aria-label="Toggle Admin Navigation Drawer"
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* ── MOBILE NAVIGATION DRAWER ────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-4 max-h-[calc(100vh-56px)] overflow-y-auto animate-fadeIn">
          {/* Section 1: Telehealth Operations */}
          <div>
            <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
              Telehealth Operations
            </div>
            <nav className="space-y-1">
              {telehealthNav.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-container text-white font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-lg shrink-0">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
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

          {/* Section 2: Platform & Population */}
          <div>
            <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
              Population & Systems
            </div>
            <nav className="space-y-1">
              {platformNav.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-container text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-lg shrink-0">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Admin User Info & Sign Out */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold shrink-0">
                CMO
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-none">Dr. Arinze Okafor</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Chief Medical Officer</div>
              </div>
            </div>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
