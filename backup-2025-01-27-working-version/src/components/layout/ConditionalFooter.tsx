'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  const isAdminPage = pathname && pathname.startsWith('/admin');
  
  if (!pathname || isAdminPage) {
    return null;
  }
  
  return <Footer />;
}
