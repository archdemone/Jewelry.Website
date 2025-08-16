"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
	children: ReactNode
	variant?: 'primary' | 'secondary' | 'outline'
	className?: string
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
}

export const AnimatedButton = ({ 
	children, 
	variant = 'primary', 
	className = "",
	onClick,
	type = 'button',
	disabled = false
}: AnimatedButtonProps) => {
	const variants = {
		primary: 'bg-gold-500 text-white hover:bg-gold-600',
		secondary: 'bg-white text-black border-2 border-gray-200 hover:border-gold-500',
		outline: 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white'
	}

	return (
		<motion.button
			whileHover={{ 
				scale: disabled ? 1 : 1.05,
				boxShadow: disabled ? 'none' : '0 10px 30px rgba(212, 175, 55, 0.3)'
			}}
			whileTap={{ scale: disabled ? 1 : 0.95 }}
			transition={{ type: 'spring', stiffness: 400, damping: 17 }}
			className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			<motion.span
				initial={{ display: 'inline-block' }}
				whileHover={{ y: disabled ? 0 : -2 }}
				transition={{ type: 'spring', stiffness: 400 }}
			>
				{children}
			</motion.span>
		</motion.button>
	)
}
