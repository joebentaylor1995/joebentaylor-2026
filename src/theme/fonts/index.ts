// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';
import localFont from 'next/font/local';

// SECTION • Local font configuration
// NOTE • Each config loads only the weights the site uses; display: 'swap'
// shows the fallback until the font arrives
export const sequel = localFont({
	src: [
		{
			path: './sequel/65-wide.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--sequel',
	preload: true,
});

export const ppNeueMontreal = localFont({
	src: [
		{
			path: './ppNeueMontreal/thin.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: './ppNeueMontreal/book.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--ppNeueMontreal',
	preload: true,
});

// SECTION • Font Registry
// NOTE • Every next/font instance is registered here — key is the font's
// name, value is the CSS variable it exposes on <html>
export const fontVariables = {
	sequel: '--sequel',
	ppNeueMontreal: '--ppNeueMontreal',
};

// SECTION • Raw Font Stacks
// NOTE • Emitted as --font-{key} on :root by GlobalStyle (@theme).
// --sequel / --ppNeueMontreal are set on <html> by next/font (see app/(site)/layout.tsx)
export const fontFamilies = {
	heading: `var(--sequel), Arial, sans-serif`,
	body: `var(--ppNeueMontreal), Arial, sans-serif`,
	mono: `var(--ppNeueMontreal), Arial, sans-serif`,
	script: `var(--ppNeueMontreal), Arial, sans-serif`,
};

// SECTION • Raw Font Weights
// NOTE • Literal numbers — they're not runtime-themeable
export const fontWeights = {
	light: 300,
	regular: 400,
	medium: 500,
	semi: 600,
	bold: 700,
	heavy: 800,
	black: 900,
};

// Exports
// ------------
export const fonts = {
	family: toVarRefs('font', fontFamilies),
	weight: fontWeights,
};
