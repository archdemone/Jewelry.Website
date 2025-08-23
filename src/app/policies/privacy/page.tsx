import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
              <Header />
              <main className="container py-10">
              <section className="prose prose-sm max-w-none">
              <h1>Privacy Policy</h1>
              <p>
              <em>Last updated: 2025-01-01</em>
              </p>
              <h2>Information We Collect</h2>
              <p>Contact details, order information, and website usage data.</p>
              <h2>How We Use Information</h2>
              <p>To process orders, provide support, and improve our services.</p>
              <h2>Cookies & Tracking</h2>
              <p>
            We use cookies for essential functionality and analytics. Manage preferences via the
            cookie banner.
          </p>
              <h2>Third-Party Services</h2>
              <p>We use payment processors and analytics providers who process data on our behalf.</p>
              <h2>Data Security</h2>
              <p>We implement safeguards to protect your data from unauthorized access.</p>
              <h2>Your Rights</h2>
              <p>
            Depending on your location, you may have rights to access, correct, or delete your data
            (GDPR/CCPA).
          </p>
              <h2>Contact</h2>
              <p>Contact privacy@example.com for requests.</p>
              </section>
              </main>
              <Footer />
              </>
  );
}
