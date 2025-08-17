import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-10">
      <Skeleton className="h-8 w-80" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
