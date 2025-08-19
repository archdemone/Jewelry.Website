import type { ReactNode } from 'react';

export default function AdminMfaLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-2xl p-6">{children}</div>;
}
