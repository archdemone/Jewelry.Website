import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <main className="container py-10">
        <section className="prose prose-sm max-w-none">
          <h1>Shipping Policy</h1>
          <h2>Processing Times</h2>
          <p>
            Orders are processed within 1–2 business days. Custom pieces may require additional
            time.
          </p>
          <h2>Methods & Costs</h2>
          <p>Standard, Expedited, and Express options are available at checkout.</p>
          <h2>International Shipping</h2>
          <p>We ship worldwide. Duties and taxes are the responsibility of the recipient.</p>
          <h2>Tracking</h2>
          <p>Tracking details are sent via email once your order ships.</p>
          <h2>Insurance & Signature</h2>
          <p>High-value orders are insured and may require signature upon delivery.</p>
          <h2>Holiday Shipping</h2>
          <p>During peak seasons, allow extra time for processing and delivery.</p>
          <h2>Restrictions</h2>
          <p>
            We cannot ship to P.O. Boxes in some regions. Hazardous materials restrictions may
            apply.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
