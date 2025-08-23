'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number;
  steps: Array<{
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    description: string;
  }>;
  onStepClick: (stepIndex: number) => void;
}

export function CheckoutProgress({ currentStep, steps, onStepClick }: CheckoutProgressProps) {
  return (
    <div className="w-full">
              <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = index <= currentStep || isCompleted;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
              <motion.button              onClick={() => isClickable && onStepClick(index)}              disabled={!isClickable}              className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gold-500 border-gold-500 text-white cursor-pointer hover:bg-gold-600'
                      : isCurrent
                      ? 'bg-white border-gold-500 text-gold-500 cursor-pointer hover:border-gold-600' : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' }`}              whileHover={isClickable ? { scale: 1.05 } : {}}              whileTap={isClickable ? { scale: 0.95 } : {}}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </motion.button>

                {/* Step Label */}
                <div className="mt-2 text-center">
              <motion.p className={`text-sm font-medium transition-colors ${ isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500' }`}              initial={{ opacity: 0, y: 10 }}              animate={{ opacity: 1, y: 0 }}              transition={{ delay: index * 0.1 }}>
                    {step.title}
                  </motion.p>
              <motion.p className={`text-xs transition-colors ${ isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400' }`}              initial={{ opacity: 0, y: 10 }}              animate={{ opacity: 1, y: 0 }}              transition={{ delay: index * 0.1 + 0.1 }}>
                    {step.description}
                  </motion.p>
              </div>

                {/* Current Step Indicator */}
                {isCurrent && (
                  <motion.div className="absolute -bottom-1 w-4 h-1 bg-gold-500 rounded-full"              initial={{ scaleX: 0 }}              animate={{ scaleX: 1 }}              transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
              <div className="relative h-0.5 bg-gray-200">
              <motion.div className="absolute top-0 left-0 h-full bg-gold-500"              initial={{ scaleX: 0 }}              animate={{ 
                        scaleX: isCompleted ? 1 : 0 
                      }}              transition={{ duration: 0.5, delay: 0.2 }}              style={{ transformOrigin: 'left' }}
                    />
              </div>
              </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Progress Bar */}
      <div className="mt-6 lg:hidden">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div className="bg-gold-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
              </div>
              </div>
              </div>
  );
}
