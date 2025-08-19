'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

export function AuthGuard({
  children,
  fallback = '/auth/login',
}: {
  children: ReactNode;
  fallback?: string;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push(fallback);
  }, [status, router, fallback]);

  if (status === 'loading') {
    return <div className="px-4 py-16 text-center text-sm text-gray-500">Loading...</div>;
  }

  return <>{children}</>;
}
