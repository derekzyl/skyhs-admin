'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { apiGet, clearAuthTokens } from '@/lib/api';
import type { Consultant, ConsultationSession } from '@/lib/types';

type MeUser = {
  email?: string;
  first_name?: string;
  last_name?: string;
  [key: string]: unknown;
};

function unwrapMe(raw: unknown): MeUser | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (obj.data && typeof obj.data === 'object') return obj.data as MeUser;
  return obj as MeUser;
}

function displayName(user: MeUser | null): string {
  if (!user) return 'Administrator';
  const parts = [user.first_name, user.last_name].filter(Boolean);
  if (parts.length) return parts.join(' ');
  return user.email || 'Administrator';
}

function initials(user: MeUser | null): string {
  const name = displayName(user);
  const bits = name.split(/\s+/).filter(Boolean);
  if (bits.length >= 2) return `${bits[0][0]}${bits[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase() || 'AD';
}

export default function AdminMobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<MeUser | null>(null);
  const [pendingConsultants, setPendingConsultants] = useState(0);
  const [openDisputes, setOpenDisputes] = useState(0);
  const [liveSessions, setLiveSessions] = useState(0);

  useEffect(() => {
    if (pathname === '/login' || pathname === '/reset-password') return;
    let cancelled = false;
    (async () => {
      const [meRaw, consultants, disputed, live] = await Promise.all([
        apiGet<unknown>('/api/v1/auth/me').catch(() => null),
        apiGet<Consultant[]>('/api/v1/consultancy/admin/consultants').catch(() => []),
        apiGet<ConsultationSession[]>(
          '/api/v1/consultancy/admin/sessions?disputed_only=true'
        ).catch(() => []),
        apiGet<ConsultationSession[]>(
          '/api/v1/consultancy/admin/sessions?live_only=true'
        ).catch(() => []),
      ]);
      if (cancelled) return;
      setUser(unwrapMe(meRaw));
      setPendingConsultants(
        (consultants || []).filter((c) => c.status === 'pending').length
      );
      setOpenDisputes((disputed || []).length);
      setLiveSessions((live || []).length);
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (pathname === '/login' || pathname === '/reset-password') {
    return null;
  }

  const logout = () => {
    clearAuthTokens();
    setMenuOpen(false);
    router.replace('/login');
  };

  const telehealthNav = [
    {
      label: 'Live Telehealth Console',
      href: '/',
      icon: 'dashboard',
      badge: liveSessions > 0 ? 'LIVE' : undefined,
    },
    { label: 'Executive Command', href: '/executive', icon: 'shield' },
    {
      label: 'Consultant Roster & Privileging',
      href: '/consultants',
      icon: 'stethoscope',
      badge: pendingConsultants > 0 ? `${pendingConsultants} New` : undefined,
    },
    { label: 'Clinical Analytics', href: '/analytics', icon: 'monitoring' },
    { label: 'Payouts & Billing Ledger', href: '/payouts', icon: 'account_balance_wallet' },
    {
      label: 'Disputes & Flags',
      href: '/disputes',
      icon: 'flag',
      badge: openDisputes > 0 ? `${openDisputes} Open` : undefined,
    },
  ];

  const platformNav = [
    { label: 'Patient Directory', href: '/patients', icon: 'groups' },
    { label: 'Wearable Device Fleet', href: '/fleet', icon: 'watch' },
    { label: 'Alert Rules Engine', href: '/rules', icon: 'rule' },
    { label: 'Hospital EHR Integrations', href: '/integrations', icon: 'sync_saved_locally' },
  ];

  return (
    <div className="md:hidden sticky top-0 z-40 w-full bg-slate-950 border-b border-slate-800 text-white shadow-lg">
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
            {liveSessions} LIVE
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

      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-4 max-h-[calc(100vh-56px)] overflow-y-auto animate-fadeIn">
          <div>
            <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
              Telehealth Operations
            </div>
            <nav className="space-y-1">
              {telehealthNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
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
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold shrink-0">
                {initials(user)}
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-none">
                  {displayName(user)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {user?.email || 'Signed in'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
