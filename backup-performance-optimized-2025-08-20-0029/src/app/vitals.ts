export function reportWebVitals(metric: any) {
  // Send to analytics endpoint
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    id: metric.id,
    label: metric.label,
    delta: metric.delta,
    navigationType: metric.navigationType,
    rating: metric.rating,
    // Add timestamp for tracking
    timestamp: Date.now(),
    // Add user agent for debugging
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
  });

  // Use sendBeacon for better performance, fallback to fetch
  if (typeof window !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/vitals', body);
  } else {
    fetch('/api/analytics/vitals', {
      method: 'POST',
      body,
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error);
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', {
      name: metric.name,
      value: metric.value,
      label: metric.label,
      rating: metric.rating,
    });
  }
}
