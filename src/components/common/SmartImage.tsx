"use client"

import React from 'react'
import Image from 'next/image'

type SmartImageProps = {
	srcs: string[]
	alt: string
	className?: string
	width?: number
	height?: number
	priority?: boolean
}

export default function SmartImage({ srcs, alt, className, width, height, priority }: SmartImageProps) {
	const [currentSrcIndex, setCurrentSrcIndex] = React.useState(0)
	const [useFallback, setUseFallback] = React.useState(false)

	// Filter valid images (local paths starting with /)
	const validImages = srcs.filter(src => src.startsWith('/'))
	const displayText = alt || 'Jewelry Item'

	const handleError = () => {
		if (currentSrcIndex < validImages.length - 1) {
			setCurrentSrcIndex(prevIndex => prevIndex + 1)
		} else {
			setUseFallback(true)
		}
	}

	const currentSrc = validImages[currentSrcIndex]

	// Add a small cache-busting param for local images so updated assets show
	const assetVersion = process.env.NEXT_PUBLIC_ASSET_VERSION || '1'
	const versionedSrc = currentSrc
		? (currentSrc.includes('?') ? currentSrc : `${currentSrc}?v=${assetVersion}`)
		: undefined

	// If we're using fallback or no valid images, show CSS gradient
	if (useFallback || validImages.length === 0) {
		return (
			<div
				className={`relative flex items-center justify-center bg-gradient-to-br from-[#D4AF37] via-[#B8941F] to-[#8B6914] ${className}`}
				style={{
					width: width ? `${width}px` : '100%',
					height: height ? `${height}px` : '100%'
				}}
			>
				{/* Decorative pattern overlay */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0" style={{
						backgroundImage: `
							radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0, transparent 50%),
							radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0, transparent 50%)
						`
					}} />
				</div>

				{/* Main text */}
				<div className="relative z-10 text-center text-white">
					<h3 className="text-lg font-semibold sm:text-xl md:text-2xl">
						{displayText}
					</h3>
					<p className="mt-1 text-sm text-white/80 sm:text-base">
						Premium Jewelry
					</p>
				</div>

				{/* Shimmer effect */}
				<div className="absolute inset-0 opacity-20">
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
				</div>
			</div>
		)
	}

	// Render raw <img> for SVGs to avoid Next Image SVG restriction
	if (versionedSrc && versionedSrc.toLowerCase().includes('.svg')) {
		return (
			<img
				src={versionedSrc}
				alt={displayText}
				className={`object-cover ${className ?? ''}`}
				width={width || 800}
				height={height || 800}
				onError={handleError as any}
			/>
		)
	}

	// Try to load local non-SVG image via Next Image
	return (
		<Image
			src={versionedSrc as string}
			alt={displayText}
			className={`object-cover ${className}`}
			width={width || 800}
			height={height || 800}
			onError={handleError}
			priority={priority}
		/>
	)
}


