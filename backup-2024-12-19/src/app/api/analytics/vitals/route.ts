import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the metric data
    const { name, value, id, label, rating, timestamp, userAgent } = body;
    
    if (!name || typeof value !== 'number' || !id) {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      );
    }

    // Log the metric (in production, you'd send this to your analytics service)
    console.log('Web Vital captured:', {
      name,
      value,
      label,
      rating,
      timestamp: new Date(timestamp).toISOString(),
      userAgent: userAgent?.substring(0, 100), // Truncate for logging
    });

    // In production, you might want to:
    // 1. Send to Google Analytics 4
    // 2. Send to your own analytics database
    // 3. Send to monitoring services like DataDog, New Relic, etc.
    
    // Example: Send to Google Analytics 4
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      // You could implement GA4 custom events here
      // gtag('event', 'web_vital', {
      //   event_category: 'Web Vitals',
      //   event_label: name,
      //   value: Math.round(value),
      //   custom_parameter_rating: rating,
      // });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing web vitals:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
