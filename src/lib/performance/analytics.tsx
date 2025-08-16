"use client"

import React from 'react'

// Only load Vercel analytics in production to reduce bundle size
const VercelAnalytics = process.env.NODE_ENV === 'production' 
	? React.lazy(() => import('@vercel/analytics/react').then(module => ({ default: module.Analytics })))
	: () => null;

const SpeedInsights = process.env.NODE_ENV === 'production'
	? React.lazy(() => import('@vercel/speed-insights/next').then(module => ({ default: module.SpeedInsights })))
	: () => null;

export function AnalyticsProviders() {
	// Only render analytics in production
	if (process.env.NODE_ENV !== 'production') {
		return null;
	}

	return (
		<React.Suspense fallback={null}>
			<VercelAnalytics />
			<SpeedInsights />
		</React.Suspense>
	)
}