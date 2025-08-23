'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import non-critical components
const NewsletterPopup = dynamic(() => import('@/components/features/NewsletterPopup'), {
  ssr: false,
  loading: () => null,
});

const CookieBanner = dynamic(() => import('@/components/features/CookieBanner'), {
  ssr: false,
  loading: () => null,
});

const LiveChat = dynamic(() => import('@/components/features/LiveChat'), {
  ssr: false,
  loading: () => null,
});

const ExitIntentPopup = dynamic(() => import('@/components/features/ExitIntentPopup'), {
  ssr: false,
  loading: () => null,
});

export default function DeferredComponents() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer loading until after initial page load
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 2000); // Load after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
              <NewsletterPopup />
              <CookieBanner />
              <LiveChat />
              <ExitIntentPopup />
              </>
  );
}
