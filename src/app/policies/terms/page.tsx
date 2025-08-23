import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsOfServicePage() {
  return (
    <>
              <Header />
              <main className="container py-10">
              <section className="prose prose-sm max-w-none">
              <h1>Terms of Service</h1>
              <h2>Acceptance of Terms</h2>
              <p>By accessing our website, you agree to these Terms.</p>
              <h2>Use of Website</h2>
              <p>You may not misuse the site or interfere with its security.</p>
              <h2>Product Information</h2>
              <p>
            We strive for accuracy; errors may occur. We reserve the right to correct information.
          </p>
              <h2>Pricing & Payment</h2>
              <p>Prices are subject to change. Taxes and shipping are calculated at checkout.</p>
              <h2>Intellectual Property</h2>
              <p>All content is owned by us or our licensors and protected by law.</p>
              <h2>Limitation of Liability</h2>
              <p>
            We are not liable for indirect or consequential damages to the maximum extent permitted.
          </p>
              <h2>Governing Law</h2>
              <p>These Terms are governed by the laws of your jurisdiction.</p>
              <h2>Contact</h2>
              <p>For questions, contact legal@example.com.</p>
              </section>
              </main>
              <Footer />
              </>
  );
}
