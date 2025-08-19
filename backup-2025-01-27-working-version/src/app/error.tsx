'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mb-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong!</h1>

        <p className="mb-6 text-gray-600">
          We're sorry, but something unexpected happened. Please try again or contact support if the
          problem persists.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-xs text-gray-800">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="space-y-3">
          <Button onClick={reset} className="w-full bg-primary hover:opacity-90">
            Try again
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link href="/contact" className="text-primary hover:opacity-80">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
