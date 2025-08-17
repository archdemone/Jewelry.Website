import { db } from '@/lib/db';
import { getLogger } from '@/lib/logger';

let configured = false;

export function setupGracefulShutdown() {
  // Only run on server-side (Node.js environment)
  if (typeof window !== 'undefined' || configured) return;
  
  // Additional check for process object
  if (typeof process === 'undefined' || !process.on) return;
  
  configured = true;
  const logger = getLogger();
  async function shutdown(signal: string) {
    try {
      logger.warn({ signal }, 'received shutdown signal');
      await db.$disconnect().catch(() => {});
      process.exit(0);
    } catch {
      process.exit(1);
    }
  }
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}
