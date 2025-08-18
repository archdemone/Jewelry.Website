import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { rateLimitOrThrow } = await import('@/lib/rateLimit');
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
  const max = Number(process.env.RATE_LIMIT_MAX || 100);
  try {
    await rateLimitOrThrow(req, '/api/auth/register', {
      windowMs,
      max,
      slowdownAfter: Math.floor(max * 0.8),
      slowdownMs: 250,
    });
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
    }
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    await db.user.create({ data: { name, email, password: hashed } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const err = e as Error & { status?: number; headers?: Record<string, string> };
    if (err.status === 429) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...(err.headers || {}) },
      });
    }
    return NextResponse.json({ message: 'Unexpected error' }, { status: 500 });
  }
}
