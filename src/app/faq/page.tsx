import type { Metadata } from 'next';
import FAQAccordion, { FAQItem } from '@/components/features/FAQAccordion';
import { FAQPageJsonLd } from '@/components/seo/JsonLd';

const FAQs: FAQItem[] = [
  {
    id: '1',
    category: 'Ordering & Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards and Stripe for secure checkout.',
    popularity: 10,
  },
  {
    id: '2',
    category: 'Shipping & Delivery',
    question: 'How long does shipping take?',
    answer: 'Processing takes 1-2 business days. Shipping times vary by location.',
    popularity: 9,
  },
  {
    id: '3',
    category: 'Returns & Exchanges',
    question: 'What is your return policy?',
    answer: 'Returns are accepted within 30 days for unworn items. See our returns policy page.',
    popularity: 8,
  },
  {
    id: '4',
    category: 'Product Information',
    question: 'Are your materials certified?',
    answer: 'Yes, we use certified gold and ethically sourced gemstones.',
    popularity: 7,
  },
  {
    id: '5',
    category: 'Care & Maintenance',
    question: 'How do I clean my jewelry?',
    answer: 'Use mild soap and water. See our care guide for details.',
    popularity: 6,
  },
  {
    id: '6',
    category: 'Custom Orders',
    question: 'Do you offer custom designs?',
    answer: 'Yes, contact us with your ideas. Attach inspiration images in the contact form.',
    popularity: 5,
  },
  {
    id: '7',
    category: 'Gift Cards',
    question: 'Can I buy a gift card?',
    answer: 'Yes, digital gift cards are available in preset and custom amounts.',
    popularity: 4,
  },
  {
    id: '8',
    category: 'Account & Security',
    question: 'How do I reset my password?',
    answer: 'Use the "Forgot password" link on the login page.',
    popularity: 3,
  },
];

export const metadata: Metadata = {
  title: 'FAQ — J&M',
  description: 'Answers to common questions about orders, shipping, returns, care, and more.',
};

export default function FAQPage() {
  return (
    <>
      <FAQPageJsonLd faqs={FAQs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-[var(--font-serif)] font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our handcrafted jewelry. Can't find what you're looking for?{' '}
            <a href="/contact" className="text-primary hover:underline font-medium">
              Contact us
            </a>
            .
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <FAQAccordion items={FAQs} />
        </div>
      </section>
    </>
  );
}
