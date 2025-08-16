"use client"
import { useState } from 'react'
import SmartImage from '@/components/common/SmartImage'
import { DEFAULT_PLACEHOLDER } from '@/lib/assets/images'

type ProductImageGalleryProps = {
	images: string[]
	productName: string
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
	const [selectedImage, setSelectedImage] = useState(0)

	// Ensure we have at least one image to display
	const displayImages = images.length > 0 ? images : [DEFAULT_PLACEHOLDER]
	
	// Ensure productName is never undefined
	const safeProductName = productName || 'Jewelry Item'

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
			{/* Main Image */}
			<div className="lg:col-span-4">
				<div className="aspect-square overflow-hidden rounded-lg">
					<SmartImage
						srcs={[displayImages[selectedImage] || displayImages[0]]}
						alt={`${safeProductName} - Image ${selectedImage + 1}`}
						className="h-full w-full object-cover"
						width={800}
						height={800}
					/>
				</div>
			</div>

			{/* Thumbnail Images */}
			{displayImages.length > 1 && (
				<div className="lg:col-span-4">
					<div className="grid grid-cols-4 gap-2">
						{displayImages.map((image, index) => (
							<button
								key={index}
								onClick={() => setSelectedImage(index)}
								className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
									selectedImage === index
										? 'border-primary'
										: 'border-gray-200 hover:border-gray-300'
								}`}
							>
								<SmartImage
									srcs={[image]}
									alt={`${safeProductName} - Thumbnail ${index + 1}`}
									className="h-full w-full object-cover"
									width={200}
									height={200}
								/>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}


