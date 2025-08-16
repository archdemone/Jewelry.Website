import { Counter, Histogram, Registry, collectDefaultMetrics } from 'prom-client'

// Ensure singletons across hot-reloads in dev
declare global {
	// eslint-disable-next-line no-var
	var __metricsRegistry: Registry | undefined
	// eslint-disable-next-line no-var
	var __httpRequestHistogram: Histogram<string> | undefined
	// eslint-disable-next-line no-var
	var __httpRequestCounter: Counter<string> | undefined
	// eslint-disable-next-line no-var
	var __metricsInitialized: boolean | undefined
}

const registry: Registry = global.__metricsRegistry || new Registry()

if (!global.__metricsInitialized) {
	collectDefaultMetrics({ register: registry })

	const httpRequestHistogram = new Histogram({
		name: 'http_request_duration_ms',
		help: 'HTTP request duration in ms',
		labelNames: ['method', 'route', 'status'] as const,
		buckets: [50, 100, 200, 400, 800, 1600, 3200],
	})

	const httpRequestCounter = new Counter({
		name: 'http_requests_total',
		help: 'Total number of HTTP requests',
		labelNames: ['method', 'route', 'status'] as const,
	})

	registry.registerMetric(httpRequestHistogram)
	registry.registerMetric(httpRequestCounter)

	global.__httpRequestHistogram = httpRequestHistogram
	global.__httpRequestCounter = httpRequestCounter
	global.__metricsRegistry = registry
	global.__metricsInitialized = true
}

export const register = registry
export const httpRequestHistogram = global.__httpRequestHistogram as Histogram<string>
export const httpRequestCounter = global.__httpRequestCounter as Counter<string>

export async function metricsText(): Promise<string> {
	return await register.metrics()
}

export function recordRequest(method: string, route: string, statusCode: number, durationMs: number): void {
	try {
		httpRequestCounter.labels(method, route, String(statusCode)).inc(1)
		httpRequestHistogram.labels(method, route, String(statusCode)).observe(durationMs)
	} catch {
		// no-op on metrics errors
	}
}