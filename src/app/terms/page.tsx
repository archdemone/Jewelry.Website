import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="container py-10">
        <section className="prose prose-sm max-w-none">
          <h1>Terms of Service</h1>
          <p>
            These terms govern your use of our website and services. By using our site, you agree to
            these terms.
          </p>
          <h2>Orders</h2>
          <p>
            All orders are subject to acceptance and availability. We reserve the right to refuse
            service.
          </p>
          <h2>Returns</h2>
          <p>
            Eligible items can be returned within 30 days in original condition. Custom items are
            final sale.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
