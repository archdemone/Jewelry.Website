'use client'
import { useEffect, useRef, useState } from 'react';

export default function WhenVisible({
  children,
  rootMargin = '800px',
  afterLcp = false,
}: { children: React.ReactNode; rootMargin?: string; afterLcp?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let didShow = false;

    function reveal() {
      if (!didShow) { didShow = true; setShow(true); }
    }

    const startObserve = () => {
      if (!ref.current) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { io.disconnect(); reveal(); } });
      }, { rootMargin });
      io.observe(ref.current);
    };

    if (afterLcp) {
      try {
        const po = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) { 
            po.disconnect(); 
            startObserve(); 
          }
        });
        po.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch { startObserve(); }
    } else {
      startObserve();
    }
  }, [afterLcp, rootMargin]);

  return <div ref={ref}>{show ? children : null}</div>;
}
