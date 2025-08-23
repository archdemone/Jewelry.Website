import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Client-side Stripe instance
export const getStripe = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  return stripePromise;
};

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Payment intent creation
export const createPaymentIntent = async (amount: number, currency: string = 'gbp') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });
    
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Customer creation
export const createCustomer = async (email: string, name?: string) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        source: 'jewelry_website',
      },
    });
    
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// Payment method attachment
export const attachPaymentMethod = async (customerId: string, paymentMethodId: string) => {
  try {
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    
    // Set as default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
    
    return true;
  } catch (error) {
    console.error('Error attaching payment method:', error);
    throw error;
  }
};

// Refund creation
export const createRefund = async (paymentIntentId: string, amount?: number) => {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });
    
    return refund;
  } catch (error) {
    console.error('Error creating refund:', error);
    throw error;
  }
};

// Webhook signature verification
export const constructWebhookEvent = (payload: string, signature: string) => {
  try {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw error;
  }
};
