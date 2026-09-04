'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { apiGet, clearAuthTokens, getAccessToken } from '@/lib/api';

const PUBLIC_PATHS = new Set(['/login', '/reset-password']);

type MePayload = {
  is_platform_admin?: boolean;
  user_type?: string;
  roles?: unknown;
  data?: MePayload;
};

function unwrapMe(raw: unknown): MePayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as MePayload;
  if (obj.data && typeof obj.data === 'object') return obj.data;
  return obj;
}

function isAuthorizedAdmin(me: MePayload | null): boolean {
  if (!me) return false;
  if (me.is_platform_admin === true) return true;
  if (String(me.user_type || '').toLowerCase() === 'admin') return true;
  const roles = Array.isArray(me.roles) ? me.roles.map(String) : [];
  return roles.some((r) => r === 'super_admin' || r === 'admin');
}

export default function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isPublic = PUBLIC_PATHS.has(pathname);

  useEffect(() => {
    if (isPublic) {
      setReady(true);
      return;
    }
    const token = getAccessToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const meRaw = await apiGet<unknown>('/api/v1/auth/me');
        if (cancelled) return;
        const me = unwrapMe(meRaw);
        if (!isAuthorizedAdmin(me)) {
          clearAuthTokens();
          router.replace('/login');
          return;
        }
        setReady(true);
      } catch {
        if (cancelled) return;
        clearAuthTokens();
        router.replace('/login');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isPublic, pathname, router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex-1 flex items-center justify-center bg-surface-canvas text-slate-400 text-sm">
        Checking session…
      </div>
    );
  }

  return <>{children}</>;
}
