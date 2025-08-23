import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // TODO: In production, integrate with email service (Mailchimp, SendGrid, etc.)
    // For now, we'll just validate and return success
    console.log('Newsletter subscription:', email);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email address'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to subscribe. Please try again.'
    }, { status: 500 });
  }
}