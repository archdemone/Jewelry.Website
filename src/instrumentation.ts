export async function register() {
  // Only run on server-side (Node.js environment)
  if (typeof window !== 'undefined') return;
  
  if ((global as any).__gracefulSetup) return;
  (global as any).__gracefulSetup = true;
  const shutdown = await import('@/lib/shutdown');
  shutdown.setupGracefulShutdown();
}
