'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') ?? false;
  
  if (isAdminPage) {
    return null;
  }
  
  return <Footer />;
}
