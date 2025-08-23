'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ShippingForm from './ShippingForm';
import ShippingMethods, { shippingMethods } from './ShippingMethods';
import PaymentForm from './PaymentForm';
import OrderReview from './OrderReview';
import { useEffect, useMemo, useState } from 'react';
import { checkoutDataSchema, type CheckoutData } from '@/lib/checkout/validation';
import { useCartStore } from '@/store/cart';
import OrderSummary from './OrderSummary';
import { CheckoutSteps } from './CheckoutSteps';
import ExpressCheckout from './ExpressCheckout';
import { z } from 'zod';

const steps = [
  { id: 'information', component: ShippingForm },
  { id: 'shipping', component: ShippingMethods },
  { id: 'payment', component: PaymentForm },
  { id: 'review', component: OrderReview },
] as const;

type StepId = (typeof steps)[number]['id'];

const formSchema = checkoutDataSchema.partial();
type CheckoutFormValues = z.infer<typeof formSchema>;

export default function CheckoutForm() {
  const { items, subtotal, isHydrated } = useCartStore();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: (() => {
      if (typeof window === 'undefined') return undefined;
      try {
        const raw = sessionStorage.getItem('checkout');
        return raw ? JSON.parse(raw) : undefined;
      } catch {
        return undefined;
      }
    })(),
  });

  useEffect(() => {
    const sub = methods.watch((value) => {
      try {
        sessionStorage.setItem('checkout', JSON.stringify(value));
      } catch {}
    });
    return () => sub.unsubscribe();
  }, [methods]);

  useEffect(() => {
    methods.setValue('items', items as any);
    methods.setValue('subtotal', subtotal as any);
  }, [items, subtotal, methods]);

  const Current = useMemo(() => steps[currentStep].component, [currentStep]);

  async function next() {
    const valid = await methods.trigger();
    if (!valid) return;
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  const selectedShippingId = methods.watch('shippingMethod.id') as string | undefined;

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="py-8 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <CheckoutSteps
          currentStep={currentStep as 0 | 1 | 2 | 3}
          onStepClick={(s) => setCurrentStep(s)}
        />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {currentStep === 0 && <ExpressCheckout />}
            <Current
              {...(steps[currentStep].id === 'shipping'
                ? {
                    value: selectedShippingId,
                    onChange: (id: string) => {
                      const method = shippingMethods.find((m) => m.id === id);
                      methods.setValue('shippingMethod', method as any);
                    },
                  }
                : {})}
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm underline"              onClick={back}              disabled={currentStep === 0}
              >
                Back
              </button>
              <button
                type="button"
                data-testid="checkout-continue"
                className="rounded-md bg-primary px-4 py-2 text-white hover:opacity-90"              onClick={next}
              >
                {currentStep === steps.length - 1 ? 'Place order' : 'Continue'}
              </button>
            </div>
          </div>
          <div>
            <OrderSummary selectedShippingId={selectedShippingId} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
