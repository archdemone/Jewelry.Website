import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-10">
              <Skeleton className="h-8 w-64" />
              <div className="mt-6 grid gap-8 md:grid-cols-3">
              <div className="space-y-4 md:col-span-2">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-72 w-full" />
              </div>
              <div className="space-y-3">
              <Skeleton className="h-6 w-48" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-56" />
          ))}
        </div>
              </div>
              </div>
  );
}
