"use client"

import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import React from 'react'

export function AnalyticsProviders() {
	return (
		<>
			<VercelAnalytics />
			<SpeedInsights />
		</>
	)
}