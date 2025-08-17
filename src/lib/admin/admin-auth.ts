export type AdminRole = 'ADMIN' | 'STAFF';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function getSession() {
  return getServerSession(authOptions);
}

export function isAdminOrStaff(role?: string | null): boolean {
  return role === 'ADMIN' || role === 'STAFF';
}

export async function requireAuthenticatedSession(redirectTo?: string) {
  const session = await getSession();
  if (!session) {
    const target = redirectTo || '/admin';
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(target)}`);
  }
  return session;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent('/admin')}`);
  }
  const role = (session.user as any)?.role as string | undefined;
  if (!isAdminOrStaff(role)) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent('/admin')}`);
  }
  if (process.env.ADMIN_MFA_REQUIRED === 'true') {
    const user = session.user as any;
    if (user?.mfaEnabled) {
      const mfaVerified = cookies().get('mfa_verified')?.value === 'true';
      if (!mfaVerified) {
        redirect('/admin/mfa/verify');
      }
    } else {
      redirect('/admin/mfa/enroll');
    }
  }
  return session;
}

export async function requireAdminAccess() {
  const session = await getSession();
  if (!session) {
    return { session: null as any, allowed: false as const };
  }
  const role = (session.user as any)?.role as string | undefined;
  if (!isAdminOrStaff(role)) {
    return { session, allowed: false as const };
  }
  return { session, allowed: true as const };
}

export async function requireAdminApi(): Promise<{ ok: true } | Response> {
  const session = await getSession();
  if (!session || !isAdminOrStaff((session.user as any)?.role)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (process.env.ADMIN_MFA_REQUIRED === 'true') {
    const user = session.user as any;
    if (user?.mfaEnabled) {
      const mfaVerified = cookies().get('mfa_verified')?.value === 'true';
      if (!mfaVerified) {
        return new Response(JSON.stringify({ error: 'MFA required' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  }
  return { ok: true };
}
