import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent, createCustomer } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'gbp', email, name } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create or get customer
    let customer;
    try {
      customer = await createCustomer(email, name);
    } catch (error) {
      console.error('Error creating customer:', error);
      // Continue without customer if creation fails
    }

    // Create payment intent
    const paymentIntent = await createPaymentIntent(amount, currency);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer?.id,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error in create-payment-intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
