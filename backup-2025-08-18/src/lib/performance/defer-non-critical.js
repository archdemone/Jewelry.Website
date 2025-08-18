// Defer non-critical JavaScript execution to reduce TBT
export function deferNonCritical() {
  if (typeof window === 'undefined') return;

  // Use requestIdleCallback or setTimeout as fallback
  const defer = window.requestIdleCallback || ((fn) => setTimeout(fn, 1));

  // Defer analytics and monitoring
  defer(() => {
    // Load analytics only when idle
    if (process.env.NODE_ENV === 'production') {
      // Analytics can be loaded here
    }
  });

  // Defer non-critical UI interactions
  defer(() => {
    // Load interactive components
    const interactiveElements = document.querySelectorAll('[data-defer-interaction]');
    interactiveElements.forEach(el => {
      el.style.pointerEvents = 'auto';
    });
  });

  // Defer animations until after initial render
  defer(() => {
    document.body.classList.add('animations-ready');
  });
}

// Optimize scroll performance
export function optimizeScroll() {
  if (typeof window === 'undefined') return;

  let ticking = false;
  
  function updateScroll() {
    // Handle scroll-based animations
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

// Initialize performance optimizations
export function initPerformanceOptimizations() {
  deferNonCritical();
  optimizeScroll();
}
