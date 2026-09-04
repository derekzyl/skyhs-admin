'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { apiGet, clearAuthTokens, errorMessage } from '@/lib/api';
import type { Consultant, ConsultationSession } from '@/lib/types';

type MeUser = {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
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

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<MeUser | null>(null);
  const [pendingConsultants, setPendingConsultants] = useState(0);
  const [openDisputes, setOpenDisputes] = useState(0);
  const [liveSessions, setLiveSessions] = useState(0);

  useEffect(() => {
    if (pathname === '/login' || pathname === '/reset-password') return;
    let cancelled = false;
    (async () => {
      try {
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
      } catch (err) {
        if (!cancelled) console.warn(errorMessage(err));
      }
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
    router.replace('/login');
  };

  const telehealthNav = [
    {
      label: 'Live Console',
      href: '/',
      icon: 'dashboard',
      badge: liveSessions > 0 ? 'LIVE' : undefined,
    },
    { label: 'Executive Command', href: '/executive', icon: 'shield' },
    {
      label: 'Consultant Network',
      href: '/consultants',
      icon: 'stethoscope',
      badge: pendingConsultants > 0 ? `${pendingConsultants} New` : undefined,
    },
    { label: 'Clinical Analytics', href: '/analytics', icon: 'monitoring' },
    { label: 'Payouts & Billing', href: '/payouts', icon: 'account_balance_wallet' },
    {
      label: 'Disputes & Flags',
      href: '/disputes',
      icon: 'flag',
      badge: openDisputes > 0 ? `${openDisputes} Open` : undefined,
    },
  ];

  const platformNav = [
    { label: 'Patient Directory', href: '/patients', icon: 'groups' },
    { label: 'Wearable Fleet', href: '/fleet', icon: 'watch' },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between h-screen sticky top-0 border-r border-slate-800 bg-slate-950 transition-all z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden p-1 shadow-md shrink-0">
              <Image
                src="/logo.png"
                alt="Skyline Health"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
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

        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div>
            {!collapsed && (
              <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
                Telehealth Operations
              </div>
            )}
            <nav className="space-y-1">
              {telehealthNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
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

      <div className="p-3 border-t border-slate-800 bg-slate-950/80 space-y-3">
        {!collapsed && (
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-400">Chat sessions</span>
              <span className="text-emerald-400 font-bold">
                {liveSessions} live
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials(user)}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">
                {displayName(user)}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {user?.email || 'Signed in'}
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={logout}
            title="Sign Out"
            className="text-slate-500 hover:text-slate-300"
          >
            <span className="material-symbols-outlined text-base">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
