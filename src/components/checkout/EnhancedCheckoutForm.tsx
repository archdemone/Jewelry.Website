'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, CreditCard, Truck, User, FileText, Lock, Shield, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { checkoutDataSchema, type CheckoutData } from '@/lib/checkout/validation';
import { EnhancedShippingForm } from './EnhancedShippingForm';
import { EnhancedPaymentForm } from './EnhancedPaymentForm';
import { EnhancedOrderReview } from './EnhancedOrderReview';
import { EnhancedOrderSummary } from './EnhancedOrderSummary';
import { CheckoutProgress } from './CheckoutProgress';
import ExpressCheckout from './ExpressCheckout';

const steps = [
  { 
    id: 'information', 
    title: 'Information', 
    icon: User,
    component: EnhancedShippingForm,
    description: 'Shipping details'
  },
  { 
    id: 'payment', 
    title: 'Payment', 
    icon: CreditCard,
    component: EnhancedPaymentForm,
    description: 'Payment method'
  },
  { 
    id: 'review', 
    title: 'Review', 
    icon: FileText,
    component: EnhancedOrderReview,
    description: 'Order summary'
  },
];

type StepId = (typeof steps)[number]['id'];

export function EnhancedCheckoutForm() {
  const { items, subtotal, isHydrated, clear } = useCartStore();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const methods = useForm<CheckoutData>({
    resolver: zodResolver(checkoutDataSchema),
    defaultValues: (() => {
      if (typeof window === 'undefined') return undefined;
      try {
        const raw = sessionStorage.getItem('enhanced-checkout');
        return raw ? JSON.parse(raw) : undefined;
      } catch {
        return undefined;
      }
    })(),
    mode: 'onChange', // Real-time validation
  });

  // Auto-save form data
  useEffect(() => {
    const sub = methods.watch((value) => {
      try {
        sessionStorage.setItem('enhanced-checkout', JSON.stringify(value));
      } catch {}
    });
    return () => sub.unsubscribe();
  }, [methods]);

  // Set cart data
  useEffect(() => {
    methods.setValue('items', items);
    methods.setValue('subtotal', subtotal);
  }, [items, subtotal, methods]);

  const CurrentStepComponent = useMemo(() => steps[currentStep].component, [currentStep]);

  const canProceed = useMemo(() => {
    const formValues = methods.getValues();
    const currentStepData = steps[currentStep];
    
    switch (currentStepData.id) {
      case 'information':
        return methods.formState.isValid && formValues.shipping?.email && formValues.shipping?.firstName;
      case 'payment':
        return methods.formState.isValid && formValues.shippingMethod;
      case 'review':
        return methods.formState.isValid;
      default:
        return false;
    }
  }, [currentStep, methods.formState.isValid, methods.getValues]);

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) {
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handlePlaceOrder();
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const formData = methods.getValues();
      
      // Create payment intent
      const paymentResponse = await fetch('/api/checkout/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: formData.total, 
          currency: 'gbp',
          metadata: {
            orderId: `order_${Date.now()}`,
            customerEmail: formData.shipping.email
          }
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await paymentResponse.json();

      // Process order
      const orderResponse = await fetch('/api/checkout/process-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          paymentIntentId: clientSecret,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to process order');
      }

      const { orderId: newOrderId } = await orderResponse.json();
      setOrderId(newOrderId);
      setOrderComplete(true);
      
      // Clear cart and form data
      clear();
      sessionStorage.removeItem('enhanced-checkout');
      
      // Redirect to success page
      window.location.href = `/checkout/success?orderId=${newOrderId}`;
      
    } catch (error) {
      console.error('Order placement failed:', error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepClick = async (stepIndex: number) => {
    // Validate current step before allowing navigation
    if (stepIndex > currentStep) {
      const isValid = await methods.trigger();
      if (!isValid) return;
    }
    setCurrentStep(stepIndex);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gold-500"></div>
              <p className="mt-4 text-gray-600">Loading checkout...</p>
              </div>
              </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Your cart is empty</h2>
              <p className="mt-2 text-gray-600">Add some items to your cart to continue</p>
              <a href="/products"  className="mt-4 inline-block rounded-md bg-gold-500 px-6 py-3 text-white hover:bg-gold-600 transition-colors">
            Continue Shopping
          </a>
              </div>
              </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
              <div className="container mx-auto px-4 py-8">
              <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
              <p className="text-gray-600">Complete your purchase in just a few steps</p>
              </div>

          {/* Progress Indicator */}
          <CheckoutProgress              currentStep={currentStep}              steps={steps}
            onStepClick={handleStepClick}
          />
              <div className="grid gap-8 lg:grid-cols-3 mt-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <FormProvider {...methods}>
              <div className="bg-white rounded-lg shadow-sm border">
              <AnimatePresence mode="wait">
              <motion.div key={currentStep}              initial={{ opacity: 0, x: 20 }}              animate={{ opacity: 1, x: 0 }}              exit={{ opacity: 0, x: -20 }}              transition={{ duration: 0.3 }} className="p-6">
              <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-gold-100">
                          {React.createElement(steps[currentStep].icon, { className: "h-5 w-5 text-gold-600" })}
                        </div>
              <div>
              <h2 className="text-xl font-semibold text-gray-900">
                            {steps[currentStep].title}
                          </h2>
              <p className="text-sm text-gray-600">
                            {steps[currentStep].description}
                          </p>
              </div>
              </div>
              <CurrentStepComponent />

                      {/* Navigation */}
                      <div className="flex items-center justify-between pt-6 mt-6 border-t">
              <button type="button"              onClick={handleBack}              disabled={currentStep === 0} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                          ← Back
                        </button>
              <button type="button"              onClick={handleNext}              disabled={!canProceed || isSubmitting} className="flex items-center gap-2 px-6 py-3 bg-gold-500 text-white rounded-md hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                          {isSubmitting ? (
                            <>
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                              Processing...
                            </>
                          ) : currentStep === steps.length - 1 ? (
                            <>
              <Lock className="h-4 w-4" />
                              Place Order
                            </>
                          ) : (
                            <>
                              Continue
                              <CheckCircle className="h-4 w-4" />
              </>
                          )}
                        </button>
              </div>
              </motion.div>
              </AnimatePresence>
              </div>

                {/* Express Checkout */}
                {currentStep === 0 && (
                  <div className="mt-6">
              <ExpressCheckout />
              </div>
                )}
              </FormProvider>
              </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <EnhancedOrderSummary              currentStep={currentStep}              isSubmitting={isSubmitting}
              />
              </div>
              </div>

          {/* Security Badges */}
          <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Free Shipping</span>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
  );
}
