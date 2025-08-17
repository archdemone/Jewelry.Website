import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { rateLimitOrThrow } from '@/lib/rateLimit';

const handler = NextAuth(authOptions);

export async function GET(req: Request) {
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
  const max = Number(process.env.RATE_LIMIT_MAX || 100);
  await rateLimitOrThrow(req, '/api/auth', {
    windowMs,
    max,
    slowdownAfter: Math.floor(max * 0.8),
    slowdownMs: 100,
  });
  // Pass through to NextAuth
  return handler(req);
}

export async function POST(req: Request) {
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
  const max = Number(process.env.RATE_LIMIT_MAX || 100);
  await rateLimitOrThrow(req, '/api/auth', {
    windowMs,
    max,
    slowdownAfter: Math.floor(max * 0.8),
    slowdownMs: 100,
  });
  return handler(req);
}
