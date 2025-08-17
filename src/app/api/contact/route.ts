export async function POST(req: Request) {
	const { rateLimitOrThrow } = await import('@/lib/rateLimit')
	const { withRequest, getLogger } = await import('@/lib/logger')
	const { recordRequest } = await import('@/lib/metrics')
	const start = Date.now()
	const logger = withRequest(getLogger(), req.headers, { route: '/api/contact' })
	const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000)
	const max = Number(process.env.RATE_LIMIT_MAX || 100)
	try {
		await rateLimitOrThrow(req, '/api/contact', { windowMs, max, slowdownAfter: Math.floor(max * 0.8), slowdownMs: 250 })
		const { parseFormData, validateOrThrow, ContactSchema } = await import('@/lib/validate')
		const data = await parseFormData(req)
		const parsed = validateOrThrow(ContactSchema, data)
		// TODO: Send email to admin and autoresponder via provider
		const res = new Response(JSON.stringify({ ok: true, data: { name: parsed.name, email: parsed.email, subject: parsed.subject } }), { status: 200, headers: { 'Content-Type': 'application/json' } })
		recordRequest('POST', '/api/contact', 200, Date.now() - start)
		logger.info({ status: 200 }, 'contact')
		return res
	} catch (e) {
		const err = e as Error & { status?: number; headers?: Record<string, string> }
		const isRate = (err.status || 0) === 429
		const status = isRate ? 429 : 400
		const headers = { 'Content-Type': 'application/json', ...(err.headers || {}) }
		logger.warn({ status, error: isRate ? 'rate' : 'bad_request' }, 'contact error')
		recordRequest('POST', '/api/contact', status, Date.now() - start)
		return new Response(JSON.stringify({ ok: false, error: isRate ? 'Too many requests' : 'Invalid input' }), { status, headers })
	}
}