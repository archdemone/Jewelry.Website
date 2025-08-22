'use client';

import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';

export default function TestSessionPage() {
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email: 'debug@example.com',
      password: 'password123',
    });
    console.log('Sign in result:', result);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-2xl font-bold">Session Test Page</h1>
      
      <div className="mb-6 rounded-lg border p-4">
        <h2 className="mb-2 text-lg font-semibold">Session Status</h2>
        <p>Status: <span className="font-mono">{status}</span></p>
        <p>Authenticated: <span className="font-mono">{status === 'authenticated' ? 'Yes' : 'No'}</span></p>
      </div>

      {session && (
        <div className="mb-6 rounded-lg border p-4">
          <h2 className="mb-2 text-lg font-semibold">Session Data</h2>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(session, null, 2)}</pre>
        </div>
      )}

      <div className="space-y-4">
        {status === 'unauthenticated' ? (
          <button
            onClick={handleSignIn}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Sign In (debug@example.com)
          </button>
        ) : (
          <button
            onClick={handleSignOut}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sign Out
          </button>
        )}
        
        <a
          href="/account"
          className="inline-block rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Go to Account Page
        </a>
      </div>
    </div>
  );
}