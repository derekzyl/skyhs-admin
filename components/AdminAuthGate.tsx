'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/api';

const PUBLIC_PATHS = new Set(['/login', '/reset-password']);

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
    setReady(true);
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
