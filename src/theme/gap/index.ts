// Property Documentation
// ------------

// NOTE • This file exports the gap object, the gap object is used to store all the gap values for the application.

// REVIEW — Usage: ${getGap('s')}

// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';

// SECTION • Raw Gap Values
// NOTE • Emitted as --gap-{key} on :root by GlobalStyle (@theme)
export const gapValues = {
	xxs: '0.3rem',
	xs: '0.6rem',
	s: '1.2rem',
	sm: '1.8rem',
	m: '2.4rem',
	l: '3.6rem',
	xl: '4.8rem',
	xxl: '6rem',
	huge: '7.2rem',
	uber: '9.6rem',
};

// Exports
// ------------
export const gap = toVarRefs('gap', gapValues);
