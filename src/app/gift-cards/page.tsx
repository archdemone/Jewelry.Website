import GiftCardForm from '@/components/features/GiftCardForm';

export default function GiftCardsPage() {
  return (
    <main className="container py-10">
      <section className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-[var(--font-serif)] font-semibold text-secondary">
          Gift Cards
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Send the perfect gift instantly or schedule for a special day.
        </p>
        <div className="mt-6">
          <GiftCardForm />
        </div>
      </section>
    </main>
  );
}
