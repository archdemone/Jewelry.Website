export async function GET(request: Request) {
	const { withRequest, getLogger } = await import('@/lib/logger')
	const { recordRequest } = await import('@/lib/metrics')
	const start = Date.now()
	const logger = withRequest(getLogger(), request.headers, { route: '/api/hello' })
	const res = Response.json({ status: 'ok' })
	recordRequest('GET', '/api/hello', 200, Date.now() - start)
	logger.info({ status: 200 }, 'hello')
	return res
}


