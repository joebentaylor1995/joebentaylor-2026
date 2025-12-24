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
		padding-bottom: ${getGap('xl')};

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
		mix-blend-mode: screen;
		background: ${getBrand('bc4')};

		mask-image: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 1) 5%,
			rgba(255, 255, 255, 0) 100%
		);
	`
);

export const BackgroundImage = styled(Div)(
	props => css`
		width: 100%;
		height: 120%;
		background: ${getBrand('bc4')};

		${bp.l`
            
        `}

		img {
			object-fit: cover;
			object-position: center;
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
