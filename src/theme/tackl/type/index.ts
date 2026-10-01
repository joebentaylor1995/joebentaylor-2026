// Imports
// ------

import { theme } from '@theme';
import { css, type RuleSet } from 'styled-components';
import { breakpointUp as bp } from '@/theme/tackl/breakpoints';

// SECTION • Raw Type Scale
// NOTE • Single source of truth for the type styles below — mobile-first:
// `base` always applies and `sm`/`m`/`l`/`xl` layer overrides from their
// breakpoint up. Every property is optional per breakpoint (omitted =
// inherited); family/weight resolve through the theme getters, so tokens
// stay the single source.
export type TypeScaleFamily = 'heading' | 'body' | 'mono' | 'script';
export type TypeScaleWeight = 'light' | 'regular' | 'medium' | 'semi' | 'bold' | 'heavy' | 'black';

export type TypeScaleBreakpoint = {
	family?: TypeScaleFamily;
	weight?: TypeScaleWeight;
	size?: string;
	lineHeight?: string;
	letterSpacing?: string;
	textTransform?: string;
	display?: string;
};

export type TypeScaleEntry = {
	base: TypeScaleBreakpoint;
	sm?: TypeScaleBreakpoint;
	m?: TypeScaleBreakpoint;
	l?: TypeScaleBreakpoint;
	xl?: TypeScaleBreakpoint;
};

export const typeScale = {
	displayL: {
		base: {
			family: 'body',
			weight: 'light',
			display: 'block',
			size: '7.2rem',
			lineHeight: '1.12',
			letterSpacing: '2px',
		},
		l: { size: '12rem' },
	},

	titleL: {
		base: { family: 'body', weight: 'regular', size: '3.2rem', lineHeight: '1.32' },
		l: { size: '4.8rem' },
	},

	bodyL: {
		base: { family: 'body', weight: 'regular', display: 'block', size: '2.2rem', lineHeight: '1.32' },
		sm: { size: '2.4rem' },
		l: { size: '2.6rem' },
	},

	bodyM: {
		base: {
			family: 'body',
			weight: 'regular',
			display: 'block',
			size: '1.6rem',
			lineHeight: '1.32',
			letterSpacing: '0.5px',
		},
		sm: { size: '1.7rem' },
		l: { size: '1.8rem' },
	},

	bodyS: {
		base: {
			family: 'body',
			weight: 'regular',
			display: 'block',
			size: '1.2rem',
			lineHeight: '1.32',
			letterSpacing: '0.5px',
		},
		sm: { size: '1.3rem' },
		l: { size: '1.4rem' },
	},

	captionL: {
		base: {
			family: 'heading',
			weight: 'regular',
			display: 'block',
			size: '0.8rem',
			lineHeight: '1.2',
			letterSpacing: '1px',
			textTransform: 'uppercase',
		},
		sm: { size: '0.9rem' },
		l: { size: '1rem' },
	},

	captionS: {
		base: {
			family: 'body',
			weight: 'regular',
			display: 'block',
			size: '0.8rem',
			lineHeight: '1.2',
			letterSpacing: '0.2px',
		},
		sm: { size: '0.9rem' },
		l: { size: '1rem' },
	},
} satisfies Record<string, TypeScaleEntry>;

// ANCHOR • Declarations for one breakpoint block — only set what's defined
const breakpointStyles = (block: TypeScaleBreakpoint): RuleSet => css`
	${block.family ? css`font-family: ${theme.font.family[block.family]};` : ''}
	${block.weight ? css`font-weight: ${theme.font.weight[block.weight]};` : ''}
	${block.display ? `display: ${block.display};` : ''}
	${block.size ? `font-size: ${block.size};` : ''}
	${block.lineHeight ? `line-height: ${block.lineHeight};` : ''}
	${block.letterSpacing ? `letter-spacing: ${block.letterSpacing};` : ''}
	${block.textTransform ? `text-transform: ${block.textTransform};` : ''}
`;

const scaleStyles = (entry: TypeScaleEntry): RuleSet => css`
	${breakpointStyles(entry.base)}
	${entry.sm ? bp.sm`${breakpointStyles(entry.sm)}` : ''}
	${entry.m ? bp.m`${breakpointStyles(entry.m)}` : ''}
	${entry.l ? bp.l`${breakpointStyles(entry.l)}` : ''}
	${entry.xl ? bp.xl`${breakpointStyles(entry.xl)}` : ''}
`;

// SECTION • Display styles
export const displayL: RuleSet = css`
	${scaleStyles(typeScale.displayL)}
`;

// SECTION • Title styles
export const titleL: RuleSet = css`
	${scaleStyles(typeScale.titleL)}
`;

// SECTION • Body styles
export const bodyL: RuleSet = css`
	${scaleStyles(typeScale.bodyL)}
`;

export const bodyM: RuleSet = css`
	${scaleStyles(typeScale.bodyM)}
`;

export const bodyS: RuleSet = css`
	${scaleStyles(typeScale.bodyS)}
`;

// SECTION • Caption styles
export const captionL: RuleSet = css`
	${scaleStyles(typeScale.captionL)}
`;

export const captionS: RuleSet = css`
	${scaleStyles(typeScale.captionS)}
`;
