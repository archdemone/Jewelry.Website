import type { ReactNode } from 'react';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <div className="container max-w-7xl py-8">{children}</div>;
}
