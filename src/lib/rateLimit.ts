type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

function now(): number { return Date.now() }

function getClientId(req: Request): string {
	const xf = req.headers.get('x-forwarded-for')
	if (xf) return xf.split(',')[0].trim()
	return req.headers.get('x-real-ip') || 'unknown'
}

export type RateLimitOptions = {
	windowMs: number
	max: number
	slowdownAfter?: number
	slowdownMs?: number
	key?: (req: Request) => string
}

export async function rateLimitOrThrow(req: Request, path: string, options: RateLimitOptions): Promise<void> {
	const keyFn = options.key || getClientId
	const key = `${path}:${keyFn(req)}`
	const nowMs = now()
	let bucket = buckets.get(key)
	if (!bucket || bucket.resetAt <= nowMs) {
		bucket = { count: 0, resetAt: nowMs + options.windowMs }
		buckets.set(key, bucket)
	}
	bucket.count += 1
	if (options.slowdownAfter && bucket.count > options.slowdownAfter) {
		const over = bucket.count - options.slowdownAfter
		const base = options.slowdownMs || 100
		const delay = Math.min(3000, Math.pow(2, Math.min(8, over)) * base)
		await new Promise((r) => setTimeout(r, delay))
	}
	if (bucket.count > options.max) {
		const retryAfter = Math.max(0, Math.ceil((bucket.resetAt - nowMs) / 1000))
		const err = new Error('Too many requests') as Error & { status?: number; headers?: Record<string, string> }
		err.status = 429
		err.headers = { 'Retry-After': String(retryAfter) }
		throw err
	}
}