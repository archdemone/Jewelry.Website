import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1440px',
			},
		},
		extend: {
			colors: {
				primary: '#D4AF37',
				secondary: '#1A1A1A',
				accent: '#F8F8F8',
				text: '#333333',
				border: '#E5E5E5',
				success: '#10B981',
				error: '#EF4444',
			},
		},
	},
	plugins: [],
};

export default config;


