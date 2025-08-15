export default function SizeChart() {
	return (
		<div className="grid gap-6">
			<section>
				<h3 className="text-xl font-semibold">Ring Size Conversion</h3>
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm">
						<thead>
							<tr className="border-b">
								<th className="py-2">US</th>
								<th>UK</th>
								<th>EU</th>
								<th>JP</th>
							</tr>
						</thead>
						<tbody>
							{[
								{ us: '5', uk: 'J½', eu: '49', jp: '9' },
								{ us: '6', uk: 'L', eu: '52', jp: '12' },
								{ us: '7', uk: 'N', eu: '54', jp: '14' },
								{ us: '8', uk: 'P', eu: '57', jp: '16' },
								{ us: '9', uk: 'R', eu: '59', jp: '18' },
							].map(r => (
								<tr key={r.us} className="border-b">
									<td className="py-2">{r.us}</td>
									<td>{r.uk}</td>
									<td>{r.eu}</td>
									<td>{r.jp}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
			<section>
				<h3 className="text-xl font-semibold">Necklace Length Guide</h3>
				<p className="mt-2 text-sm text-gray-600">Common lengths: 14" (Choker), 16" (Short), 18" (Standard), 20" (Matinee), 24" (Opera).</p>
				<div className="mt-3 h-32 w-full rounded-md bg-gray-100" />
			</section>
		</div>
	)
}