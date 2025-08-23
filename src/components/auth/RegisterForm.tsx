'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || 'Registration failed');
      return;
    }
    router.push('/auth/login');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
              <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
              </div>
              <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input type="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
              </div>
              <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <input type="password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required minLength={8}
        />
              </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit"
        className="w-full rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-60" disabled={loading}>
        {loading ? 'Creating account...' : 'Create account'}
      </button>
              </form>
  );
}
