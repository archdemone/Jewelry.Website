export type FetchJsonOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
	headers?: Record<string, string>
	body?: unknown
	timeoutMs?: number
	retries?: number
	backoffBaseMs?: number
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchJson<T = unknown>(url: string, options: FetchJsonOptions = {}): Promise<T> {
	const method = options.method || 'GET'
	const headers: Record<string, string> = { 'Accept': 'application/json', ...(options.headers || {}) }
	const timeoutMs = options.timeoutMs ?? 8000
	const maxRetries = options.retries ?? (method === 'GET' ? 2 : 0)
	const backoffBaseMs = options.backoffBaseMs ?? 200

	let attempt = 0
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const controller = new AbortController()
		const timer = setTimeout(() => controller.abort(), timeoutMs)
		try {
			const res = await fetch(url, {
				method,
				headers: { ...headers, ...(options.body ? { 'Content-Type': 'application/json' } : {}) },
				body: options.body ? JSON.stringify(options.body) : undefined,
				signal: controller.signal,
			})
			if (!res.ok) {
				throw new Error(`HTTP ${res.status}`)
			}
			const data = (await res.json()) as T
			return data
		} catch (err) {
			if (attempt >= maxRetries) throw err
			const delay = Math.pow(2, attempt) * backoffBaseMs
			await sleep(delay)
			attempt += 1
		} finally {
			clearTimeout(timer)
		}
	}
}