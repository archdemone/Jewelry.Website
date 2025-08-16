import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
		const { pathname } = request.nextUrl
		if (!pathname.startsWith('/maintenance') && !pathname.startsWith('/api')) {
			const url = request.nextUrl.clone()
			url.pathname = '/maintenance'
			return NextResponse.rewrite(url)
		}
	}

	// HTTPS redirect behind proxy/CDN when opted-in
	if (process.env.FORCE_HTTPS === 'true') {
		const proto = request.headers.get('x-forwarded-proto') || 'http'
		if (proto !== 'https') {
			const url = request.nextUrl.clone()
			url.protocol = 'https'
			return NextResponse.redirect(url, 301)
		}
	}

	const res = NextResponse.next()

	// Security headers (can be tuned or disabled via env)
	if (process.env.CSP_DISABLE !== 'true') {
		const csp = "default-src 'self'; img-src 'self' data: blob:; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'self';"
		res.headers.set('Content-Security-Policy', csp)
	}
	res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
	res.headers.set('X-Content-Type-Options', 'nosniff')
	res.headers.set('X-Frame-Options', 'SAMEORIGIN')
	res.headers.set('X-XSS-Protection', '1; mode=block')

	// HSTS only in production
	if (process.env.NODE_ENV === 'production') {
		res.headers.set('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload')
	}

	// Request ID passthrough or generation
	const existingReqId = request.headers.get('x-request-id')
	if (existingReqId) res.headers.set('x-request-id', existingReqId)

	// Short TTL for HTML/API
	const path = request.nextUrl.pathname
	if (path.startsWith('/api') || path === '/' || path.endsWith('.html')) {
		res.headers.set('Cache-Control', 'max-age=0, must-revalidate')
	}

	return res
}

export const config = {
	matcher: '/:path*',
}