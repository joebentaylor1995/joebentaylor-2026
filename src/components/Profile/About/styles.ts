// Imports
// ------------

import { bp, Div, getBrand, getGap, getGlobal, Section } from '@tackl';
import { bodyL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Section)(
	() => css`
		position: relative;
		padding-bottom: ${getGap('xl')};
		overflow: clip;

		${bp.l`
			padding-bottom: ${getGap('xl')};
		`}
	`
);

export const Background = styled(Div)(
	() => css`
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		height: 100lvh;
		background: ${getBrand('bc4')};
	`
);

export const BackgroundImage = styled(Div)(
	() => css`
		width: 100%;
		height: 120%;
		background: ${getBrand('bc4')};

		img {
			scale: 1.2;
			object-fit: cover;
			object-position: top center;
			user-select: none;
			pointer-events: none;
			width: 100% !important;
			height: 100% !important;
			aspect-ratio: unset !important;
		}
	`
);

export const Sticky = styled(Div)(
	() => css`
		position: relative;
		margin-bottom: ${getGap('m')};

		${bp.l` margin-bottom: ${getGap('xs')};`}

		> div {
			${bp.m`
				position: sticky;
				top: calc(100% - ${getGap('xl')});
				left: 0;
				margin-bottom: 0;
			`}
		}
	`
);

export const Desc = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};

		p {
			${bodyL}
			color: ${getGlobal('white', 40)};
			text-wrap: pretty;
		}
	`
);

export const Marquees = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('s')};
		margin-top: ${getGap('xl')};

		${bp.l`
			margin-top: ${getGap('uber')};
		`}
	`
);
