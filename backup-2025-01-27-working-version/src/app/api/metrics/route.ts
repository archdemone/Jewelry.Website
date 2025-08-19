import { NextResponse } from 'next/server';
import { metricsText, register } from '@/lib/metrics';
import { withRequest, getLogger } from '@/lib/logger';

export async function GET(request: Request) {
  const start = Date.now();
  const logger = withRequest(getLogger(), request.headers, { route: '/api/metrics' });
  const body = await metricsText();
  const res = new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': register.contentType,
      'Cache-Control': 'no-store',
    },
  });
  logger.info({ status: 200, durationMs: Date.now() - start }, 'metrics served');
  return res;
}
