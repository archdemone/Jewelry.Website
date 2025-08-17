export async function register() {
  if ((global as any).__gracefulSetup) return;
  (global as any).__gracefulSetup = true;
  const shutdown = await import('@/lib/shutdown');
  shutdown.setupGracefulShutdown();
}
