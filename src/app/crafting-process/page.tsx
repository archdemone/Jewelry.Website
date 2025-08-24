'use client';

import { createElement, useState } from 'react';
import { motion } from 'framer-motion';
// import SmartImage from '@/components/common/SmartImage' // Temporarily disabled
import Link from 'next/link';
import {
  ShoppingCart,
  Package,
  Hammer,
  Clock,
  CheckCircle,
  Truck,
  MessageSquare,
  AlertCircle,
  Sparkles,
  Gift,
  Mail,
  Search,
  CreditCard,
  Timer,
  Users,
  Heart,
} from 'lucide-react';

import Image from 'next/image';

export default function CraftingProcessPage() {
  const [activeStep, setActiveStep] = useState(1);

  const processSteps = [
    {
      number: 1,
      title: 'Order Received',
      icon: ShoppingCart,
      color: 'blue',
      description: 'Your custom specifications are carefully reviewed',
      details:
        "Once you place your order, I personally review every detail of your request. Whether it's a specific size, material preference, or custom engraving, I make sure I understand exactly what you're looking for. Within 24 hours, you'll receive a confirmation email with all your order details.",
    },
    {
      number: 2,
      title: 'Material Check',
      icon: Package,
      color: 'amber',
      description: 'Checking material availability',
      details:
        "I check my current inventory for all required materials. If everything is in stock, we move straight to creation. If not, I'll contact you immediately with options.",
      hasWarning: true,
    },
    {
      number: 3,
      title: 'Payment & Start',
      icon: CreditCard,
      color: 'green',
      description: 'Creation begins once payment is confirmed',
      details:
        "As soon as your payment is confirmed, your ring officially enters my workshop queue. You'll receive an email notification that creation has begun, along with your estimated completion date.",
    },
    {
      number: 4,
      title: 'Creation Timeline',
      icon: Timer,
      color: 'purple',
      description: 'Choose your preferred timeline',
      details:
        'Standard creation takes 2-3 weeks. Need it sooner? Priority service options are available for an additional fee.',
      hasOptions: true,
    },
    {
      number: 5,
      title: 'Quality Inspection',
      icon: Search,
      color: 'indigo',
      description: 'Multiple quality checks ensure perfection',
      details:
        'Every ring undergoes thorough inspection from multiple angles. We check for finish quality, stone security, sizing accuracy, and overall craftsmanship. Only perfect rings leave the workshop.',
    },
    {
      number: 6,
      title: 'Packaging & Delivery',
      icon: Truck,
      color: 'emerald',
      description: 'Carefully packed and shipped to you',
      details:
        "Your ring is carefully packaged in a beautiful presentation box, wrapped securely, and shipped with full tracking. You'll receive tracking information as soon as it's dispatched.",
    },
  ];

  return (
    <main className="space-y-0">
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="absolute inset-0">
            <Image 
              src="/images/craftingprocess/header.webp"
              alt="Artisan crafting a ring"              
              width={1200}              
              height={600}
              className="absolute inset-0 h-full w-full object-cover opacity-60"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-center text-white">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}              
                animate={{ opacity: 1, y: 0 }}              
                transition={{ duration: 0.8 }}
                className="mb-6 font-serif text-5xl font-bold md:text-6xl"
              >
                Our Crafting Process
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}              
                animate={{ opacity: 1, y: 0 }}              
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto max-w-2xl text-xl text-orange-400"
              >
                Discover how each ring is carefully crafted from raw materials to finished
                masterpiece
              </motion.p>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="bg-white py-16">
          <div className="container max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}              
              whileInView={{ opacity: 1, y: 0 }}              
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 font-serif text-3xl">The Creation Journey</h2>
              <p className="text-lg text-orange-600">
                Click on each step to learn more about the process
              </p>
            </motion.div>

            {/* Desktop Timeline */}
            <div className="relative hidden md:block">
              {/* Connecting Line */}
              <div className="absolute left-0 right-0 top-16 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200" />

              {/* Steps */}
              <div className="relative grid grid-cols-6 gap-4">
                {processSteps.map((step, index) => (
                  <motion.div 
                    key={step.number}              
                    initial={{ opacity: 0, y: 20 }}              
                    whileInView={{ opacity: 1, y: 0 }}              
                    viewport={{ once: true }}              
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <button
                      onClick={() => setActiveStep(step.number)}
                      className={`w-full transition-all ${activeStep === step.number ? 'scale-110' : ''}`}
                    >
                      <div className={`mx-auto flex h-32 w-32 items-center justify-center rounded-full ${
                        activeStep === step.number
                          ? `bg-${step.color}-100 border-4 border-${step.color}-400`
                          : 'border-2 border-gray-200 bg-gray-50 hover:border-gray-300'
                      } cursor-pointer transition-all`}
                    >
                      <step.icon
                        className={`h-12 w-12 ${
                          activeStep === step.number ? `text-${step.color}-600` : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div className="mt-4">
                      <div className={`text-sm font-bold ${
                        activeStep === step.number ? 'text-gray-900' : 'text-gray-500'
                      }`}
                      >
                        Step {step.number}
                      </div>
                      <div className={`mt-1 text-sm font-medium ${
                        activeStep === step.number ? 'text-gray-800' : 'text-gray-600'
                      }`}
                      >
                        {step.title}
                      </div>
                    </div>
                  </button>
                </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="space-y-6 md:hidden">
              {processSteps.map((step, index) => (
                <motion.button
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveStep(step.number)}
                  className={`flex w-full items-center gap-4 rounded-xl p-4 transition-all ${
                    activeStep === step.number
                      ? 'bg-gradient-to-r from-orange-50 to-amber-50 shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full ${
                    activeStep === step.number
                      ? `bg-${step.color}-100 border-2 border-${step.color}-400`
                      : 'border-2 border-gray-200 bg-white'
                  } `}
                  >
                    <step.icon
                      />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">
                      Step {step.number}: {step.title}
                    </div>
                    <div className="text-sm text-gray-600">{step.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Active Step Details */}
            <motion.div 
              key={activeStep}              
              initial={{ opacity: 0, y: 20 }}              
              animate={{ opacity: 1, y: 0 }}              
              transition={{ duration: 0.3 }}
              className="mt-12 rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg"
            >
              <div className="flex items-start gap-6">
                <div
                  >
                  {createElement(processSteps[activeStep - 1].icon, {
                    className: `w-10 h-10 text-${processSteps[activeStep - 1].color}-600`,
                  })}
                </div>
                <div className="flex-grow">
                  <h3 className="mb-3 text-2xl font-semibold">
                    Step {activeStep}: {processSteps[activeStep - 1].title}
                  </h3>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    {processSteps[activeStep - 1].details}
                  </p>

                  {/* Step 2 Special Content - Material Availability */}
                  {activeStep === 2 && (
                    <div className="mt-6 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-amber-600" />
                        <div>
                          <h4 className="mb-2 font-semibold text-amber-900">
                            Material Not in Stock?
                          </h4>
                          <p className="mb-3 text-amber-800">Don't worry! You have options:</p>
                          <ul className="space-y-2 text-amber-700">
                            <li className="flex items-start gap-2">
                              <span className="text-amber-600">•</span>
                              <span>
                                <strong>Pre-order Option:</strong> Reserve your ring now and we'll
                                begin crafting as soon as materials arrive (typically 1-2 weeks
                                additional wait)
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-600">•</span>
                              <span>
                                <strong>Email Notification:</strong> You'll receive an instant email
                                when materials are in stock and your ring enters production
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-600">•</span>
                              <span>
                                <strong>Alternative Materials:</strong> I can suggest similar
                                materials that are currently available
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 Special Content - Timeline Options */}
                  {activeStep === 4 && (
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                        <div className="mb-3 text-center">
                          <Clock className="mx-auto h-8 w-8 text-gray-500" />
                        </div>
                        <h4 className="mb-2 text-center font-semibold">Standard</h4>
                        <p className="mb-2 text-center text-2xl font-bold text-gray-900">FREE</p>
                        <p className="text-center text-sm text-gray-600">2-3 weeks</p>
                        <p className="mt-2 text-center text-xs text-gray-500">
                          Perfect for planned occasions
                        </p>
                      </div>
                      <div className="rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
                        <div className="mb-3 text-center">
                          <Timer className="mx-auto h-8 w-8 text-purple-600" />
                        </div>
                        <h4 className="mb-2 text-center font-semibold">Priority</h4>
                        <p className="mb-2 text-center text-2xl font-bold text-purple-900">+£25</p>
                        <p className="text-center text-sm text-purple-700">7-10 days</p>
                        <p className="mt-2 text-center text-xs text-purple-600">
                          Great for upcoming events
                        </p>
                      </div>
                      <div className="rounded-xl border-2 border-red-300 bg-gradient-to-br from-red-50 to-orange-50 p-6">
                        <div className="mb-3 text-center">
                          <Sparkles className="mx-auto h-8 w-8 text-red-600" />
                        </div>
                        <h4 className="mb-2 text-center font-semibold">Express</h4>
                        <p className="mb-2 text-center text-2xl font-bold text-red-900">+£50</p>
                        <p className="text-center text-sm text-red-700">3-5 days</p>
                        <p className="mt-2 text-center text-xs text-red-600">For urgent requests</p>
                      </div>
                    </div>
                  )}

                  {/* Step 5 Special Content - Quality Inspection */}
                  {activeStep === 5 && (
                    <div className="mt-6 rounded-xl bg-blue-50 p-6">
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-blue-900">
                        <Users className="h-5 w-5" />
                        Multi-Point Inspection Process
                      </h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm">Sizing accuracy check</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm">Stone security verification</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm">Surface finish inspection</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm">Symmetry assessment</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm">Comfort fit testing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm">Final polish perfection</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm italic text-blue-700">
                        "Multiple inspectors review each ring to ensure it meets our quality
                        standards"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Visual Process Gallery */}
        <section className="bg-gray-50 py-16">
          <div className="container max-w-6xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}              
              whileInView={{ opacity: 1, y: 0 }}              
              viewport={{ once: true }}
              className="mb-12 text-center font-serif text-3xl text-orange-600"
            >
              The Craft in Action
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}              
                whileInView={{ opacity: 1, y: 0 }}              
                viewport={{ once: true }}              
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden rounded-xl"
              >
                                 <Image 
                   src="/images/craftingprocess/material-selection.webp"
                  alt="Material Selection - Choosing the perfect materials for your ring"              
                  width={400}              
                  height={300}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold">Material Selection</h3>
                    <p className="text-sm opacity-90">
                      Choosing the perfect materials for your ring
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}              
                whileInView={{ opacity: 1, y: 0 }}              
                viewport={{ once: true }}              
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden rounded-xl"
              >
                                 <Image 
                   src="/images/craftingprocess/crafting-action.webp"
                  alt="Precision Crafting - Every detail carefully shaped by hand"              
                  width={400}              
                  height={300}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold">Precision Crafting</h3>
                    <p className="text-sm opacity-90">Every detail carefully shaped by hand</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}              
                whileInView={{ opacity: 1, y: 0 }}              
                viewport={{ once: true }}              
                transition={{ delay: 0.3 }}
                className="group relative overflow-hidden rounded-xl"
              >
                                 <Image 
                   src="/images/craftingprocess/final-polish.webp"
                  alt="Perfect Finish - The final polish that makes it shine"              
                  width={400}              
                  height={300}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold">Perfect Finish</h3>
                    <p className="text-sm opacity-90">The final polish that makes it shine</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="container max-w-4xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}              
              whileInView={{ opacity: 1, y: 0 }}              
              viewport={{ once: true }}
              className="mb-12 text-center font-serif text-3xl text-gray-900"
            >
              Common Questions About the Process
            </motion.h2>
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}              
                whileInView={{ opacity: 1, y: 0 }}              
                viewport={{ once: true }}
                className="rounded-xl bg-gray-50 p-6"
              >
                <h3 className="mb-2 text-lg font-semibold">
                  What happens if I need my ring urgently?
                </h3>
                <p className="text-gray-700">
                  We offer Priority (7-10 days for +£25) and Express (3-5 days for +£50) services.
                  Select your preferred timeline during checkout or contact me directly for urgent
                  requests.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}              
                whileInView={{ opacity: 1, y: 0 }}              
                viewport={{ once: true }}
                className="rounded-xl bg-gray-50 p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-orange-600">
                  🔄 Can I make changes after ordering?
                </h3>
                <p className="text-gray-700">
                  You can make changes within 24 hours of ordering, before production begins. Once
                  crafting starts, changes may not be possible or may incur additional costs.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}              
                whileInView={{ opacity: 1, y: 0 }}              
                viewport={{ once: true }}
                className="rounded-xl bg-gray-50 p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-orange-600">
                  📧 How will I know when my ring is ready?
                </h3>
                <p className="text-gray-700">
                  You'll receive email updates at each major milestone: order confirmation,
                  production start, quality check complete, and shipping notification with tracking
                  details.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Special Offer Banner - First 100 Customers */}
        <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-8">
          <div className="container max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}              
              whileInView={{ opacity: 1, scale: 1 }}              
              viewport={{ once: true }}
              className="rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur"
            >
              <div className="mb-4 flex items-center justify-center">
                <Gift className="mr-2 h-8 w-8 text-orange-600" />
                <h3 className="text-2xl font-bold text-gray-900">
                  🎉 First 100 Customers Special!
                </h3>
                <Gift className="ml-2 h-8 w-8 text-orange-600" />
              </div>
              <div className="text-center">
                <p className="mb-4 text-lg text-gray-700">
                  <strong>FREE Worldwide Delivery</strong> on your first purchase!
                </p>
                <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">
                    Limited Offer • Only 100 spots remaining!
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  As a thank you for being one of our founding customers, enjoy completely free
                  shipping anywhere in the world. No minimum order, no strings attached!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-50 py-16">
          <div className="container max-w-4xl text-center">
            <motion.div
            >
              <h2 className="mb-6 font-serif text-3xl text-orange-600">
                Ready to Begin Your Ring Journey?
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Every ring starts with a conversation. Let's create something special together.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/products">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}                  
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-medium text-white shadow-lg transition-all hover:opacity-90"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Browse Collection
                  </motion.button>
                </Link>
                <Link href="/custom-design">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}                  
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-4 font-medium text-primary transition-all hover:bg-primary/5"
                  >
                    <Hammer className="h-5 w-5" />
                    Custom Design
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
