import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className="container py-10">
			<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="rounded-lg border p-3">
						<Skeleton className="h-40 w-full" />
						<Skeleton className="mt-3 h-4 w-3/4" />
						<Skeleton className="mt-2 h-4 w-1/2" />
					</div>
				))}
			</div>
		</div>
	)
}