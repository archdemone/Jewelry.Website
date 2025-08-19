import { db } from '@/lib/db';

export type ReadinessResult = {
  ready: boolean;
  checks: { database?: 'ok' | 'fail' | 'skipped' };
  error?: string;
};

export async function checkReadiness(): Promise<ReadinessResult> {
  const result: ReadinessResult = { ready: true, checks: {} };
  try {
    if (process.env.READINESS_PROBE_SKIP_DB === 'true') {
      result.checks.database = 'skipped';
    } else {
      await db.$queryRaw`SELECT 1`;
      result.checks.database = 'ok';
    }
  } catch (err) {
    result.ready = false;
    result.checks.database = 'fail';
    result.error = (err as Error).message;
  }
  return result;
}

export function readinessStatusCode(r: ReadinessResult): number {
  return r.ready ? 200 : 503;
}
