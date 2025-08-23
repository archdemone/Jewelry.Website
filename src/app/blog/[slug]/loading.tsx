import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-10">
              <div className="mx-auto max-w-3xl">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="mt-4 h-8 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
              <div className="mt-6 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
              </div>
              </div>
  );
}
