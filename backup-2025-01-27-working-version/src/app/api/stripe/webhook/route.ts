import { getStripe } from '@/lib/stripe/stripe-server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const stripe = getStripe();
  const sig = req.headers.get('stripe-signature') as string;
  const buf = Buffer.from(await req.arrayBuffer());

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as any;
      // Update order status to PAID
      if (pi.metadata?.orderId) {
        await db.order.update({
          where: { id: pi.metadata.orderId },
          data: { paymentStatus: 'PAID', status: 'PROCESSING', paymentIntentId: pi.id },
        });
      }
      break;
    }
    case 'payment_intent.payment_failed':
    case 'payment_intent.canceled': {
      const pi = event.data.object as any;
      if (pi.metadata?.orderId) {
        await db.order.update({
          where: { id: pi.metadata.orderId },
          data: { paymentStatus: 'UNPAID', status: 'PENDING' },
        });
      }
      break;
    }
    case 'charge.refunded': {
      const charge = event.data.object as any;
      // optionally handle refunds
      break;
    }
    case 'checkout.session.completed': {
      // If using Checkout Sessions
      break;
    }
    default:
      break;
  }

  return new Response('ok', { status: 200 });
}
