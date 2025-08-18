import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

const ADMIN_MFA_REQUIRED = process.env.ADMIN_MFA_REQUIRED === 'true';
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || undefined;
const IS_PROD = process.env.NODE_ENV === 'production';

async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string | null,
): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: remoteIp || '',
      }) as any,
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

// Simple in-memory failed login tracker (resets with process). In production, back with Redis.
const failedLoginCounts = new Map<string, { count: number; resetAt: number }>();
function trackFail(key: string, windowMs: number) {
  const now = Date.now();
  const rec = failedLoginCounts.get(key);
  if (!rec || rec.resetAt <= now) {
    failedLoginCounts.set(key, { count: 1, resetAt: now + windowMs });
  } else {
    rec.count += 1;
  }
}
function getFailCount(key: string): number {
  const now = Date.now();
  const rec = failedLoginCounts.get(key);
  if (!rec) return 0;
  if (rec.resetAt <= now) {
    failedLoginCounts.delete(key);
    return 0;
  }
  return rec.count;
}

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
      turnstileToken: { label: 'Turnstile', type: 'text' },
    },
    async authorize(credentials, req) {
      if (!credentials?.email || !credentials?.password) return null;
      const email = String(credentials.email).toLowerCase().trim();
      const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
      const maxFails = Number(process.env.LOGIN_MAX_FAILS || 5);
      const clientIp =
        (req as any)?.headers?.get?.('x-forwarded-for')?.split(',')[0]?.trim?.() ||
        (req as any)?.headers?.get?.('x-real-ip') ||
        null;
      const key = `${email}:${clientIp || 'unknown'}`;
      const fails = getFailCount(key);
      if (fails >= maxFails && process.env.TURNSTILE_SECRET_KEY) {
        const ok = await verifyTurnstile((credentials as any).turnstileToken, clientIp);
        if (!ok) return null;
      }
      const user = await db.user.findUnique({ where: { email } });
      if (!user?.password) {
        trackFail(key, windowMs);
        return null;
      }
      const valid = await bcrypt.compare(String(credentials.password), user.password);
      if (!valid) {
        trackFail(key, windowMs);
        return null;
      }
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        mfaEnabled: user.mfaEnabled,
        tokenVersion: user.tokenVersion,
      } as any;
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  providers,
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret',
  pages: {
    signIn: '/auth/login',
  },
  cookies: {
    sessionToken: {
      name: IS_PROD ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: IS_PROD,
        domain: COOKIE_DOMAIN,
      },
    },
    csrfToken: {
      name: IS_PROD ? '__Host-next-auth.csrf-token' : 'next-auth.csrf-token',
      options: {
        httpOnly: false,
        sameSite: 'strict',
        path: '/',
        secure: IS_PROD,
        domain: COOKIE_DOMAIN,
      },
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        (session.user as any).id = user?.id || token?.sub;
        (session.user as any).role = (user as any)?.role || (token as any)?.role || 'CUSTOMER';
        (session.user as any).mfaEnabled =
          (user as any)?.mfaEnabled ?? (token as any)?.mfaEnabled ?? false;
        (session.user as any).tokenVersion =
          (user as any)?.tokenVersion ?? (token as any)?.tokenVersion ?? 0;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        (token as any).role = (user as any).role;
        (token as any).mfaEnabled = (user as any).mfaEnabled ?? false;
        (token as any).tokenVersion = (user as any).tokenVersion ?? 0;
      }
      return token;
    },
  },
  jwt: { maxAge: 8 * 60 * 60 },
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60, updateAge: 60 * 60 },
};
