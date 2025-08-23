'use client';

import { motion } from 'framer-motion';
import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  CheckCircle,
  Loader2,
  Calendar,
  Info,
  Image as ImageIcon,
  Heart,
  Settings,
} from 'lucide-react';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: 'general' | 'custom' | 'order' | 'repair' | 'other';
  message: string;
  file: File | null;
};

type CustomizationData = {
  productName: string;
  originalPrice: number;
  customization: {
    material: string;
    gemColor: string;
    gemDensity: string;
    gemVariation: string;
    ringSize: string;
    ringWidth: string;
    mixColors: string[];
  };
};

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [customizationData, setCustomizationData] = useState<CustomizationData | null>(null);

  // Handle customization data from URL parameters
  useEffect(() => {
    const customizationParam = searchParams?.get('customization');
    if (customizationParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(customizationParam));
        setCustomizationData(decodedData);

        // Auto-populate form with customization details
        const customizationMessage = `I'm interested in customizing the following ring:

Product: ${decodedData.productName}
Original Price: £${decodedData.originalPrice}

My Customization Preferences:
• Material: ${decodedData.customization.material}
• Gem Color: ${decodedData.customization.gemColor}
• Gem Density: ${decodedData.customization.gemDensity}
• Gem Variation: ${decodedData.customization.gemVariation}
• Ring Size: ${decodedData.customization.ringSize}
• Ring Width: ${decodedData.customization.ringWidth}
${decodedData.customization.mixColors.length > 0 ? `• Mix Colors: ${decodedData.customization.mixColors.join(', ')}` : ''}

Please let me know if you can accommodate these customizations and what the estimated timeline and pricing would be. I'm also open to suggestions and recommendations based on your expertise.`;

        setFormData((prev) => ({
          ...prev,
          subject: 'custom',
          message: customizationMessage,
        }));
      } catch (error) {
        console.error('Error parsing customization data:', error);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.ok) {
        setSubmitStatus('success');
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'general',
          message: '',
          file: null,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'artisan@rings.com',
      description: 'Best for detailed inquiries',
      color: 'blue',
      bgGradient: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      hoverBg: 'hover:from-blue-100 hover:to-indigo-100',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      value: 'Available 9am-6pm',
      description: 'Quick questions & support',
      color: 'green',
      bgGradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      hoverBg: 'hover:from-green-100 hover:to-emerald-100',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+44 123 456 7890',
      description: 'Mon-Fri, 10am-5pm',
      color: 'purple',
      bgGradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      hoverBg: 'hover:from-purple-100 hover:to-pink-100',
    },
  ];

  return (
    <main>
              <div className="min-h-screen bg-white">
        {/* Hero Section with Gradient Background */}
        <section className="relative overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50" />
              <motion.div              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 opacity-50"              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)',
                backgroundSize: '100% 100%',
              }}
            />
              </div>

          {/* Floating Elements */}
          <motion.div animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity }} className="absolute left-10 top-20 text-4xl opacity-20">
            💍
          </motion.div>
              <motion.div animate={{ y: [10, -10, 10] }}
            transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-20 right-10 text-4xl opacity-20">
            ✨
          </motion.div>
              <div className="container relative z-10 py-20">
              <motion.div initial={{ opacity: 0, y: 30 }}              animate={{ opacity: 1, y: 0 }}              transition={{ duration: 0.8 }} className="mx-auto max-w-3xl text-center">
              <motion.div initial={{ scale: 0 }}              animate={{ scale: 1 }}              transition={{ duration: 0.5 }} className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
              <MessageSquare className="h-10 w-10 text-primary" />
              </motion.div>
              <h1 className="mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text font-serif text-4xl text-transparent md:text-5xl">
                Let's Create Something Special
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                Whether you have a question, want to discuss a custom design, or just want to say
                hello, I'd love to hear from you. Every conversation starts a new creative journey.
              </p>

              {/* Quick Stats */}
              <div className="mt-10 flex justify-center gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }}              animate={{ opacity: 1, y: 0 }}              transition={{ delay: 0.2 }} className="text-center">
              <div className="text-3xl font-bold text-primary">24hr</div>
              <div className="text-sm text-gray-600">Response Time</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }}              animate={{ opacity: 1, y: 0 }}              transition={{ delay: 0.3 }} className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }}              animate={{ opacity: 1, y: 0 }}              transition={{ delay: 0.4 }} className="text-center">
              <div className="text-3xl font-bold text-primary">1-on-1</div>
              <div className="text-sm text-gray-600">Personal Service</div>
              </motion.div>
              </div>
              </motion.div>
              </div>
              </section>

        {/* Contact Methods Cards */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
              <div className="container max-w-5xl">
              <motion.h2 initial={{ opacity: 0, y: 20 }}              whileInView={{ opacity: 1, y: 0 }}              viewport={{ once: true }} className="mb-12 text-center font-serif text-3xl text-orange-600">
              Choose Your Preferred Way to Connect
            </motion.h2>
              <div className="grid gap-6 md:grid-cols-3">
              {contactMethods.map((method, index) => (
                <motion.div              key={method.title}              initial={{ opacity: 0, y: 20 }}              whileInView={{ opacity: 1, y: 0 }}              viewport={{ once: true }}              transition={{ delay: index * 0.1 }}              whileHover={{ y: -5, transition: { duration: 0.2 } }}              className={`group relative bg-gradient-to-br ${method.bgGradient} ${method.hoverBg} cursor-pointer overflow-hidden rounded-2xl p-6 transition-all duration-300`}
                >
                  {/* Decorative Corner Element */}
                  <div className="absolute -right-2 -top-2 h-20 w-20 rounded-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:scale-150" />
              <div              className={`${method.iconBg} mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110`}
                  >
              <method.icon className={`h-7 w-7 ${method.iconColor}`} />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">{method.title}</h3>
              <p className="mb-2 font-medium text-gray-900">{method.value}</p>
              <p className="text-sm text-gray-700">{method.description}</p>
              <motion.div className="absolute bottom-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
              <ArrowRight className="h-5 w-5 text-gray-400" />
              </motion.div>
              </motion.div>
              ))}
            </div>
              </div>
              </section>

        {/* Main Contact Form Section */}
        <section className="bg-white py-16">
              <div className="container max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column - Form */}
              <motion.div              initial={{ opacity: 0, x: -30 }}              whileInView={{ opacity: 1, x: 0 }}              viewport={{ once: true }}
              >
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-orange-500">
              <Send className="h-5 w-5 text-gray-900" />
              </div>
              <h3 className="text-2xl font-semibold">
                      {customizationData ? 'Custom Ring Inquiry' : 'Send a Message'}
                    </h3>
              </div>

                  {/* Customization Summary */}
                  {customizationData && (
                    <motion.div initial={{ opacity: 0, y: 20 }}              animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-xl border border-gold-200 bg-gradient-to-r from-gold-50 to-amber-50 p-4">
              <div className="mb-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-100">
              <Settings className="h-4 w-4 text-gold-600" />
              </div>
              <h4 className="font-semibold text-gold-800">Ring Customization Summary</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
              <span className="font-medium">Product:</span>{' '}
                          {customizationData.productName}
                        </div>
              <div>
              <span className="font-medium">Base Price:</span> £
                          {customizationData.originalPrice}
                        </div>
              <div>
              <span className="font-medium">Material:</span>{' '}
                          {customizationData.customization.material}
                        </div>
              <div>
              <span className="font-medium">Gem Color:</span>{' '}
                          {customizationData.customization.gemColor}
                        </div>
              <div>
              <span className="font-medium">Density:</span>{' '}
                          {customizationData.customization.gemDensity}
                        </div>
              <div>
              <span className="font-medium">Variation:</span>{' '}
                          {customizationData.customization.gemVariation}
                        </div>
              <div>
              <span className="font-medium">Size:</span>{' '}
                          {customizationData.customization.ringSize}
                        </div>
              <div>
              <span className="font-medium">Width:</span>{' '}
                          {customizationData.customization.ringWidth}
                        </div>
                        {customizationData.customization.mixColors.length > 0 && (
                          <div className="col-span-2">
              <span className="font-medium">Mix Colors:</span>{' '}
                            {customizationData.customization.mixColors.join(', ')}
                          </div>
                        )}
                      </div>
              </motion.div>
                  )}

                  {submitStatus === 'success' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }}              animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
              <motion.div initial={{ scale: 0 }}              animate={{ scale: 1 }}              transition={{ type: 'spring', duration: 0.5 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
              </motion.div>
              <h3 className="mb-2 text-2xl font-semibold">Message Sent!</h3>
              <p className="text-gray-600">I'll get back to you within 24 hours.</p>
              <button              onClick={() => setSubmitStatus(null)}
                        className="mt-6 font-medium text-primary hover:opacity-80"
                      >
                        Send Another Message
                      </button>
              </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
              <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                            Your Name *
                          </label>
              <input type="text"
                            required              value={formData.name}              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                            placeholder="John Smith"
                          />
              </div>
              <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email Address *
                          </label>
              <input type="email"
                            required              value={formData.email}              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                            placeholder="john@example.com"
                          />
              </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
              <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                            Phone (Optional)
                          </label>
              <input type="tel"              value={formData.phone}              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                            placeholder="+44 123 456 7890"
                          />
              </div>
              <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                            Subject *
                          </label>
              <select
                            required              value={formData.subject}              onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value as ContactFormData['subject'],
                              })
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                          >
              <option value="general">General Inquiry</option>
              <option value="custom">Custom Design</option>
              <option value="order">Order Question</option>
              <option value="repair">Repair/Resize</option>
              <option value="other">Other</option>
              </select>
              </div>
              </div>
              <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                          Message *
                        </label>
              <textarea
                          required              rows={5}              value={formData.message}              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                          placeholder="Tell me about your dream ring..."
                        />
              </div>
              <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <label className="flex cursor-pointer items-center gap-3">
              <input type="file"
                            className="hidden"
                            accept="image/*"              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setFormData({ ...formData, file: e.target.files?.[0] ?? null })
                            }
                          />
              <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <ImageIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
              <p className="font-medium text-gray-800">Attach Inspiration</p>
              <p className="text-sm text-gray-600">
                                {formData.file
                                  ? formData.file.name
                                  : 'Add images for custom designs'}
                              </p>
              </div>
              </div>
              </label>
              </div>
              <motion.button type="submit"              disabled={isSubmitting}              whileHover={{ scale: 1.02 }}              whileTap={{ scale: 0.98 }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-orange-500 py-4 font-medium text-gray-900 shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50">
                        {isSubmitting ? (
                          <>
              <Loader2 className="h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
              <Send className="h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </motion.button>
              </form>
                  )}
                </div>
              </motion.div>

              {/* Right Column - Additional Info */}
              <motion.div initial={{ opacity: 0, x: 30 }}              whileInView={{ opacity: 1, x: 0 }}              viewport={{ once: true }} className="space-y-6">
                {/* Workshop Location Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-200/30 blur-3xl" />
              <div className="relative">
              <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Workshop Location</h3>
              </div>
              <p className="mb-2 text-gray-700">Based in Manchester, UK</p>
              <p className="text-sm text-gray-600">
                      Home workshop crafting rings with love and precision. Visits by appointment
                      only.
                    </p>
              </div>
              </div>

                {/* Business Hours Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6">
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-green-200/30 blur-3xl" />
              <div className="relative">
              <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Clock className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
              <div className="flex justify-between">
              <span className="text-gray-600">Monday - Friday</span>
              <span className="font-medium">10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
              <span className="text-gray-600">Saturday</span>
              <span className="font-medium">11:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
              <span className="text-gray-600">Sunday</span>
              <span className="font-medium">Closed</span>
              </div>
              </div>
              <p className="mt-3 text-xs italic text-gray-500">
                      * Response times may vary during busy periods
                    </p>
              </div>
              </div>

                {/* Social Media Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-6">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-orange-200/30 blur-3xl" />
              <div className="relative">
              <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <Heart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Follow the Journey</h3>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                      See work in progress, new designs, and behind-the-scenes content
                    </p>
              <div className="flex gap-3">
              <motion.a href="#"              whileHover={{ scale: 1.1 }}              whileTap={{ scale: 0.9 }} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
              <Instagram className="h-5 w-5 text-gray-700" />
              </motion.a>
              <motion.a href="#"              whileHover={{ scale: 1.1 }}              whileTap={{ scale: 0.9 }} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
              <Facebook className="h-5 w-5 text-gray-700" />
              </motion.a>
              <motion.a href="#"              whileHover={{ scale: 1.1 }}              whileTap={{ scale: 0.9 }} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
              <Twitter className="h-5 w-5 text-gray-700" />
              </motion.a>
              </div>
              </div>
              </div>

                {/* Quick Tip */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-gray-900">
              <div className="absolute -right-5 -top-5 text-6xl opacity-10">💍</div>
              <div className="relative">
              <div className="mb-3 flex items-center gap-2">
              <Info className="h-5 w-5" />
              <h4 className="font-semibold">Pro Tip</h4>
              </div>
              <p className="text-sm text-gray-700">
                      For custom designs, include as many details as possible - ring size, preferred
                      metals, stone preferences, and any inspiration images you have!
                    </p>
              </div>
              </div>
              </motion.div>
              </div>
              </div>
              </section>

        {/* FAQ Quick Links */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
              <div className="container max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }}              whileInView={{ opacity: 1, y: 0 }}              viewport={{ once: true }} className="text-center">
              <h2 className="mb-6 font-serif text-3xl">Common Questions</h2>
              <p className="mb-8 text-gray-600">
                Can't find what you're looking for? Just send me a message!
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'How long does a custom ring take?',
                  'Do you offer payment plans?',
                  'Can I see samples before ordering?',
                  'Do you ship internationally?',
                ].map((question, index) => (
                  <motion.a key={index}
                    href="/faq"              initial={{ opacity: 0, y: 20 }}              whileInView={{ opacity: 1, y: 0 }}              viewport={{ once: true }}              transition={{ delay: index * 0.1 }}              whileHover={{ x: 5 }} className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md">
              <span className="text-gray-700">{question}</span>
              <ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-primary" />
              </motion.a>
                ))}
              </div>
              </motion.div>
              </div>
              </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 py-20">
              <div className="absolute inset-0 bg-black/5" />
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }} className="absolute right-10 top-10 text-8xl text-orange-200">
            ✨
          </motion.div>
              <div className="container relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }}              whileInView={{ opacity: 1, y: 0 }}              viewport={{ once: true }} className="text-center">
              <h2 className="mb-4 font-serif text-4xl text-gray-900">
                Let's Start Creating Your Perfect Ring
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-700">
                Every great ring begins with a conversation. I'm here to listen, advise, and bring
                your vision to life.
              </p>
              <motion.button whileHover={{ scale: 1.05 }}              whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-8 py-4 font-medium text-white shadow-xl transition-all hover:bg-orange-700 hover:shadow-2xl">
              <Calendar className="h-5 w-5" />
                Book a Consultation
              </motion.button>
              </motion.div>
              </div>
              </section>
              </div>
              </main>
  );
}
