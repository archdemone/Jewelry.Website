import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AuditPage({ searchParams }: { searchParams: { cursor?: string } }) {
  const pageSize = 20;
  const cursor = searchParams?.cursor;
  const logs = await db.auditLog.findMany({
    orderBy: { ts: 'desc' },
    take: pageSize + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });
  const hasMore = logs.length > pageSize;
  const items = hasMore ? logs.slice(0, pageSize) : logs;
  const nextCursor = hasMore ? logs[pageSize]?.id : undefined;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Audit Logs</h1>
      <div className="divide-y rounded border bg-white">
        {items.map((l) => (
          <div key={l.id} className="grid grid-cols-12 gap-2 p-3 text-sm">
            <div className="col-span-2 text-gray-500">{new Date(l.ts).toLocaleString()}</div>
            <div className="col-span-2 font-medium">{l.action}</div>
            <div className="col-span-2">
              {l.entity}
              {l.entityId ? `:${l.entityId}` : ''}
            </div>
            <div className="col-span-2 truncate text-gray-600">IP: {l.ip || '-'}</div>
            <div className="col-span-4 truncate text-gray-600">UA: {l.ua || '-'}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {nextCursor && (
          <a className="underline" href={`/admin/audit?cursor=${nextCursor}`}>
            Next
          </a>
        )}
      </div>
    </div>
  );
}
