export default function MaintenancePage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center px-4">
				<div className="mb-8">
					<svg className="mx-auto h-24 w-24 text-gold-500" />
				</div>
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					We&#39;ll be back soon!
				</h1>
				<p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
					We&#39;re currently performing scheduled maintenance. 
					We should be back online shortly.
				</p>
				<div className="space-y-4">
					<p className="text-sm text-gray-500">
						Expected completion: 2 hours
					</p>
					<p className="text-sm text-gray-500">
						For urgent inquiries: support@yourjewelrystore.com
					</p>
				</div>
			</div>
		</div>
	)
}