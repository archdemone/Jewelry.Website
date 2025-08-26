import SizeChart from '@/components/features/SizeChart';

export default function SizeGuidePage() {
  return (
    <main className="container py-10">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-[var(--font-serif)] font-semibold text-secondary">
          Size Guide
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Find your perfect fit with our ring, bracelet, and necklace sizing tips.
        </p>
        <div className="mt-6">
          <SizeChart />
        </div>
        <div className="mt-8 rounded-md border p-4">
          <h2 className="text-xl font-semibold">How to Measure</h2>
          <ol className="mt-2 list-inside list-decimal text-sm text-gray-700">
            <li>Wrap a strip of paper around your finger at the widest point.</li>
            <li>Mark where the paper overlaps and measure the length.</li>
            <li>Use the chart to find your size.</li>
          </ol>
          <div className="mt-3 text-sm text-secondary">
            <a href="/files/ring-sizer.pdf" className="underline">
              Download printable ring sizer (PDF)
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
