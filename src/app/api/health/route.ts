import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
	try {
		// Check database connection
		await db.$queryRaw`SELECT 1`

		// Check Stripe connection (if configured)
		if (process.env.STRIPE_SECRET_KEY) {
			const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
			await stripe.charges.list({ limit: 1 })
		}

		// Optionally check Redis
		let cacheStatus = 'disabled'
		if (process.env.REDIS_URL) {
			cacheStatus = 'unknown'
		}

		return NextResponse.json({
			status: 'healthy',
			timestamp: new Date().toISOString(),
			services: {
				database: 'connected',
				payment: process.env.STRIPE_SECRET_KEY ? 'connected' : 'disabled',
				cache: cacheStatus,
				authSecret: Boolean(process.env.NEXTAUTH_SECRET || 'dev-secret'),
			},
			version: process.env.npm_package_version,
		})
	} catch (error) {
		const err = error as Error
		return NextResponse.json(
			{
				status: 'unhealthy',
				error: err.message,
				timestamp: new Date().toISOString(),
			},
			{ status: 503 }
		)
	}
}