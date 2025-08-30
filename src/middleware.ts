import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole } from '@/types/enums';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Maintenance mode check
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    if (!pathname.startsWith('/maintenance') && !pathname.startsWith('/api')) {
      const url = request.nextUrl.clone();
      url.pathname = '/maintenance';
      return NextResponse.rewrite(url);
    }
  }

  // HTTPS redirect behind proxy/CDN when opted-in
  if (process.env.FORCE_HTTPS === 'true') {
    const proto = request.headers.get('x-forwarded-proto') || 'http';
    if (proto !== 'https') {
      const url = request.nextUrl.clone();
      url.protocol = 'https';
      if (request.method === 'GET' || request.method === 'HEAD') {
        return NextResponse.redirect(url, 308);
      }
    }
  }

  // Admin protection - only protect /admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/mfa')) {
    const allowlist = (process.env.IP_ALLOWLIST || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '';

    if (allowlist.length > 0 && clientIp && !allowlist.includes(clientIp)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const token = (await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })) as any;
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('callbackUrl', '/admin');
      return NextResponse.redirect(url, { status: 302 });
    }

    const role = token?.role;
    if (role !== UserRole.ADMIN && role !== UserRole.STAFF) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('callbackUrl', '/admin');
      return NextResponse.redirect(url, { status: 302 });
    }

    if (process.env.ADMIN_MFA_REQUIRED === 'true') {
      const mfaEnabled = !!token?.mfaEnabled;
      const mfaCookie = request.cookies.get('mfa_verified')?.value === 'true';
      if (!mfaEnabled) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/mfa/enroll';
        return NextResponse.redirect(url, { status: 302 });
      }
      if (mfaEnabled && !mfaCookie) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/mfa/verify';
        return NextResponse.redirect(url, { status: 302 });
      }
    }
  }

  const res = NextResponse.next();

  // Basic security headers - no CSP for now to avoid interference
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // HSTS only in production
  if (process.env.NODE_ENV === 'production') {
    res.headers.set('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload');
  }

  // Request ID passthrough
  const existingReqId = request.headers.get('x-request-id');
  if (existingReqId) res.headers.set('x-request-id', existingReqId);

  // Cache control for API routes
  if (pathname.startsWith('/api')) {
    res.headers.set('Cache-Control', 'max-age=0, must-revalidate');
  }

  return res;
}

export const config = {
  matcher: [
    // Only match admin routes and exclude static assets
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|images|static).*)',
  ],
};
