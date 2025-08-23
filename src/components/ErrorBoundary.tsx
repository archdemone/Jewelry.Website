'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({ children, fallback }: Props) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('ErrorBoundary caught an error:', error);
      setError(error.error || new Error(error.message));
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('ErrorBoundary caught an unhandled rejection:', event);
      setError(new Error(event.reason?.message || 'Unhandled promise rejection'));
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
              <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
              <div className="mb-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round"
                  strokeLinejoin="round"              strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              </div>
              </div>
              <h1 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong</h1>
              <p className="mb-6 text-gray-600">
            An unexpected error occurred. Please try refreshing the page.
          </p>
              <div className="space-y-3">
              <Button              onClick={() => window.location.reload()}
              className="w-full bg-primary hover:opacity-90"
            >
              Refresh page
            </Button>
              <Button variant="outline" asChild className="w-full">
              <Link href="/">Go to homepage</Link>
              </Button>
              </div>
              </div>
              </div>
    );
  }

  return <>{children}</>;
}
