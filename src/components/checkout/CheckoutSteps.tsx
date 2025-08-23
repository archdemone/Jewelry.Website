'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEP_LABELS = ['Information', 'Shipping', 'Payment', 'Review'];

export type CheckoutStep = 0 | 1 | 2 | 3;

export function CheckoutSteps({
  currentStep,
  onStepClick,
}: {
  currentStep: CheckoutStep;
  onStepClick?: (step: CheckoutStep) => void;
}) {
  return (
    <ol className="mb-8 grid grid-cols-4 gap-2 text-sm">
      {STEP_LABELS.map((label, index) => {
        const step = index as CheckoutStep;
        const isCompleted = currentStep > step;
        const isActive = currentStep === step;
        return (
          <li key={label}
            className={cn(
              'flex items-center gap-2 rounded-md border p-3',
              isActive && 'border-yellow-500 bg-yellow-50',
              isCompleted && 'border-green-500 bg-green-50',
            )}
            onClick={() => {
              if (onStepClick && isCompleted) onStepClick(step);
            }}
          >
              <span className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border',
                isCompleted
                  ? 'border-green-500 bg-green-500 text-white'
                  : isActive
                    ? 'border-yellow-500 bg-yellow-500 text-white'
                    : 'border-gray-300 bg-gray-100 text-gray-500', )}>
              {isCompleted ? <Check className="h-4 w-4" /> : step + 1}
            </span>
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{step + 1}</span>
              </li>
        );
      })}
    </ol>
  );
}
