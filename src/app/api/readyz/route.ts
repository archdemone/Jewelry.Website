import { NextResponse } from 'next/server';
import { checkReadiness, readinessStatusCode } from '@/lib/readiness';
import { withRequest, getLogger } from '@/lib/logger';
import { recordRequest } from '@/lib/metrics';

export async function GET(request: Request) {
  const start = Date.now();
  const logger = withRequest(getLogger(), request.headers, { route: '/api/readyz' });
  try {
    const result = await checkReadiness();
    const status = readinessStatusCode(result);
    const res = NextResponse.json(result, {
      status,
      headers: { 'Cache-Control': 'max-age=0, must-revalidate' },
    });
    recordRequest('GET', '/api/readyz', status, Date.now() - start);
    logger.info({ status }, 'readyz');
    return res;
  } catch (err) {
    const status = 500;
    logger.error({ err }, 'readyz error');
    recordRequest('GET', '/api/readyz', status, Date.now() - start);
    return NextResponse.json({ ready: false, error: 'Internal Error' }, { status });
  }
}
