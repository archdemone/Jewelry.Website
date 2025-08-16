"use client"

import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

interface PlaceholderImageProps {
	text?: string
	className?: string
}

const PlaceholderImage = ({ text = "Image Coming Soon", className = "" }: PlaceholderImageProps) => {
	return (
		<div className={`relative bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}>
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="text-center">
					<Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
					<p className="text-gray-500 font-medium">{text}</p>
				</div>
			</div>
			
			{/* Animated shimmer effect */}
			<motion.div
				animate={{
					x: ['-100%', '100%'],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: 'linear'
				}}
				className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
			/>
		</div>
	)
}

export default PlaceholderImage
