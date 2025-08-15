"use client"

// Simple hook-in point for Core Web Vitals reporting
// Wire this to your analytics destination of choice

export function reportWebVitals(metric: any) {
	switch (metric.name) {
		case 'FCP':
		case 'LCP':
		case 'CLS':
		case 'FID':
		case 'TTFB':
			// Example: send to your analytics pipeline
			// window?.analytics?.track?.('Web Vitals', {
			// 	metric: metric.name,
			// 	value: metric.value,
			// 	label: metric.id,
			// })
			break
		default:
			break
	}
}