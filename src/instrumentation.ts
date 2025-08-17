export async function register() {
  try {
    // Only run graceful shutdown wiring in Node.js runtimes (not Edge)
    if (typeof process === 'object' && typeof (process as any).on === 'function') {
      const globalRef = globalThis as any;
      if (globalRef.__gracefulSetup) return;
      globalRef.__gracefulSetup = true;
      const { setupGracefulShutdown } = await import('@/lib/shutdown');
      setupGracefulShutdown();
    }
  } catch {
    // No-op in Edge or if any unexpected error occurs
  }
}
