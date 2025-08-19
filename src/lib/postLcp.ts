export function onPostLCP(cb: () => void) {
  try {
    const po = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) { 
        po.disconnect(); 
        cb(); 
      }
    });
    po.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // Fallback if PO unsupported
    setTimeout(cb, 2500);
  }
}
