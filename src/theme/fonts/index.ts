// Imports
// ------------
// import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Fonts } from './interface';

// SECTION • Inter font configuration optimized with swap display for better loading performance
// export const inter = Inter({
// 	subsets: ['latin'],
// 	display: 'swap', // Uses fallback font until Inter loads
// 	weight: ['400', '500', '700'],
// 	variable: '--inter',
// 	preload: true,
// });

// SECTION • Local font configuration
export const sequel = localFont({
	src: [
		{
			path: './sequel/65-wide.otf',
			weight: '400',
			style: 'normal',
		}
	],
	display: 'swap',
	variable: '--sequel',
	preload: true,
});

export const ppNeueMontreal = localFont({
	src: [
		{
			path: './ppNeueMontreal/thin.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: './ppNeueMontreal/book.otf',
			weight: '400',
			style: 'normal',
		}
	],
	display: 'swap',
	variable: '--ppNeueMontreal',
	preload: true,
});

// Exports
// ------------
export const fonts: Fonts = {
	family: {
		heading: `var(--sequel), Arial, sans-serif`,
		body: `var(--ppNeueMontreal), Arial, sans-serif`,
		mono: `var(--ppNeueMontreal), Arial, sans-serif`,
		script: `var(--ppNeueMontreal), Arial, sans-serif`,
	},
	weight: {
		light: 300,
		regular: 400,
		medium: 500,
		semi: 600,
		bold: 700,
		heavy: 800,
		black: 900,
	},
};
