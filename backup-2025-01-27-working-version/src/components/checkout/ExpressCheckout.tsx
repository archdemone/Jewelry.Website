'use client';

import { Elements, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe/stripe-client';

export default function ExpressCheckout() {
  return (
    <div className="rounded-md border p-4">
      <h3 className="mb-3 font-semibold">Express checkout</h3>
      <Elements stripe={stripePromise} options={{ appearance: { theme: 'stripe' } } as any}>
        <ExpressCheckoutElement
          onConfirm={() => {
            /* handled by Stripe */
          }}
        />
      </Elements>
    </div>
  );
}
