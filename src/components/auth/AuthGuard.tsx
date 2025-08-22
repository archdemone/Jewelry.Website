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
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(fallback);
    }
  }, [status, router, fallback]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg font-medium">Loading...</div>
          <div className="text-sm text-gray-500">Please wait while we verify your session</div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg font-medium">Redirecting to login...</div>
          <div className="text-sm text-gray-500">Please wait</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
