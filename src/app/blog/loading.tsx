import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className="container py-10">
			<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="overflow-hidden rounded-lg border">
						<Skeleton className="h-48 w-full" />
						<div className="p-4">
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="mt-2 h-4 w-1/2" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}