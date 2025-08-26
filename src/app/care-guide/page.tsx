import CareInstructions from '@/components/features/CareInstructions';

export default function CareGuidePage() {
  return (
    <main className="container py-10">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-[var(--font-serif)] font-semibold text-secondary">
          Jewelry Care Guide
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Keep your pieces shining for years with these care recommendations.
        </p>
        <div className="mt-6">
          <CareInstructions />
        </div>
      </section>
    </main>
  );
}
