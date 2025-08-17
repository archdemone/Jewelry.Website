import { NextResponse } from 'next/server'
import { withRequest, getLogger } from '@/lib/logger'
import { recordRequest } from '@/lib/metrics'

export async function GET(request: Request) {
	const start = Date.now()
	const logger = withRequest(getLogger(), request.headers, { route: '/api/healthz' })
	const res = NextResponse.json({ ok: true, ts: Date.now() }, {
		status: 200,
		headers: {
			'Cache-Control': 'max-age=0, must-revalidate',
		},
	})
	recordRequest('GET', '/api/healthz', 200, Date.now() - start)
	logger.info({ status: 200 }, 'healthz')
	return res
}