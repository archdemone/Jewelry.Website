import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withRequest, getLogger } from '@/lib/logger'
import { recordRequest } from '@/lib/metrics'

export async function GET(request: Request) {
	const start = Date.now()
	const logger = withRequest(getLogger(), request.headers, { route: '/api/health' })
	try {
		await db.$queryRaw`SELECT 1`
		let cacheStatus = 'disabled'
		if (process.env.REDIS_URL) {
			cacheStatus = 'unknown'
		}
		const body = {
			status: 'healthy',
			timestamp: new Date().toISOString(),
			services: {
				database: 'connected',
				payment: process.env.STRIPE_SECRET_KEY ? 'configured' : 'disabled',
				cache: cacheStatus,
				authSecret: Boolean(process.env.NEXTAUTH_SECRET || 'dev-secret'),
			},
			version: process.env.npm_package_version,
		}
		const res = NextResponse.json(body, { headers: { 'Cache-Control': 'max-age=0, must-revalidate' } })
		recordRequest('GET', '/api/health', 200, Date.now() - start)
		logger.info({ status: 200 }, 'health')
		return res
	} catch (error) {
		const err = error as Error
		logger.error({ err }, 'health error')
		recordRequest('GET', '/api/health', 503, Date.now() - start)
		return NextResponse.json(
			{
				status: 'unhealthy',
				error: err.message,
				timestamp: new Date().toISOString(),
			},
			{ status: 503, headers: { 'Cache-Control': 'max-age=0, must-revalidate' } }
		)
	}
}