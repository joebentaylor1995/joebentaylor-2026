// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, getBrand, getGlobal, getEase, getGap, Div } from '@tackl';
import { bodyL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		position: relative;
		padding-bottom: ${getGap('xl')};
		overflow: clip;

		${bp.l`
			padding-bottom: ${getGap('uber')};
		`}
	`
);

export const Background = styled(Div)(
	props => css`
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		height: 100lvh;
		background: ${getBrand('bc4')};
	`
);

export const BackgroundImage = styled(Div)(
	props => css`
		width: 100%;
		height: 120%;
		background: ${getBrand('bc4')};
		filter: grayscale(100%);

		&:after {
			content: '';
			position: absolute;
			inset: 0;
			z-index: 1;
			background: linear-gradient(
				to top,
				${getBrand('bc4')} 0%,
				${getBrand('bc4', 0)} 100%
			);
		}

		img {
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
	props => css`
		position: relative;
		margin-bottom: ${getGap('m')};

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
	props => css`
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
	props => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('s')};
		margin-top: ${getGap('xl')};

		${bp.l`
			margin-top: ${getGap('uber')};
		`}
	`
);
