'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import StoreMap from '@/components/features/StoreMap';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const stores = [
  {
    id: 'nyc',
    name: 'Aurora Flagship',
    address: '123 Fifth Ave, New York, NY',
    phone: '(212) 555-1234',
    hours: 'Mon–Sat 10–7',
    services: ['Piercing', 'Repairs'],
  },
  {
    id: 'la',
    name: 'Aurora LA',
    address: '456 Sunset Blvd, Los Angeles, CA',
    phone: '(310) 555-5678',
    hours: 'Daily 11–7',
    services: ['Repairs'],
  },
];

export default function StoreLocatorPage() {
  const [query, setQuery] = useState('Aurora Jewelry store');

  function useMyLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setQuery(`${latitude},${longitude}`);
    });
  }

  return (
    <>
              <Header />
              <main className="container py-10">
              <h1 className="text-3xl font-[var(--font-serif)] font-semibold text-secondary">
          Store Locator
        </h1>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
              <aside className="md:col-span-1">
              <div className="flex gap-2">
              <Input placeholder="Search by city or ZIP"              value={query}              onChange={(e) => setQuery(e.target.value)}
              />
              <Button variant="outline" onClick={useMyLocation}>
                Use my location
              </Button>
              </div>
              <ul className="mt-4 space-y-3">
              {stores.map((s) => (
                <li key={s.id} className="rounded-md border p-3 text-sm">
              <div className="font-medium">{s.name}</div>
              <div className="text-gray-600">{s.address}</div>
              <div>{s.phone}</div>
              <div className="text-gray-600">{s.hours}</div>
              <div className="mt-1 text-xs text-gray-500">
                    Services: {s.services.join(', ')}
                  </div>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.address)}`} className="mt-2 inline-block text-secondary underline">
                    Directions
                  </a>
              </li>
              ))}
            </ul>
              </aside>
              <section className="md:col-span-2">
              <StoreMap query={query} />
              </section>
              </div>
              </main>
              <Footer />
              </>
  );
}
