import { getStripe } from '@/lib/stripe/stripe-server';

export async function POST(req: Request) {
  const { amount, currency, metadata } = await req.json();

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: currency || 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: {
      orderId: metadata?.orderId,
      userId: metadata?.userId,
    },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
