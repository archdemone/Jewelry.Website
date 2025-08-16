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
				gold: {
					50: '#FFF8E1',
					100: '#FFEDB3',
					200: '#FFE180',
					300: '#FFD24D',
					400: '#F5C13A',
					500: '#D4AF37',
					600: '#AE8F2D',
					700: '#896F23',
					800: '#644F19',
					900: '#3F3010',
				},
			},
		},
	},
	plugins: [],
};

export default config;


