// app/api/healthz/route.ts
import { NextResponse } from 'next/server';

let prisma: any = null;
try {
  // Lazy require so we don’t crash if prisma isn’t installed in some env
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch {
  prisma = null;
}

export async function GET() {
  const startedAt = new Date().toISOString();
  const web = true;

  // Only attempt a DB check if we actually have a DATABASE_URL
  // AND (optionally) we’re in sandbox mode.
  const wantDbCheck =
    !!process.env.DATABASE_URL &&
    (process.env.SANDBOX === '1' || process.env.NODE_ENV === 'production');

  let db = false;
  let dbError: string | null = null;

  if (wantDbCheck && prisma) {
    try {
      // Cheap “SELECT 1” that works in most DBs; skip if your DB needs a different ping
      await prisma.$queryRaw`SELECT 1`;
      db = true;
    } catch (e: any) {
      dbError = e?.message || String(e);
    }
  }

  const ok = web && (!wantDbCheck || db);
  // If web is up but DB is intentionally not configured, still return 200
  const status = ok ? 200 : 503;

  return NextResponse.json(
    { ok, web, db, dbError, startedAt },
    { status }
  );
}
