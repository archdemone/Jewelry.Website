import type { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-white">{children}</main>;
}
