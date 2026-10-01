// Imports
// ------------

import { bp, Div, getBrand, getGap, getGlobal } from '@tackl';
import { bodyL, bodyS } from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'section' })(
	_props => css`
		padding-block: ${getGap('xl')};

		${bp.l`
			padding-block: ${getGap('uber')};
		`}
	`
);

export const Content = styled(Div)(
	_props => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};

		margin-left: ${getGap('m')};

		${bp.l` margin-left: ${getGap('xl')}; `}
	`
);

export const Desc = styled.div(
	_props => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};

		p {
			${bodyL}
			color: ${getGlobal('white', 40)};
			text-wrap: balance;
			user-select: none;
			pointer-events: none;
		}
	`
);

export const Helper = styled.span<{ $isMobile: boolean }>(
	({ $isMobile }) => css`
		${bodyS}
		color: ${getGlobal('white')};
		margin-top: auto;
		user-select: none;
		pointer-events: none;
		position: relative;
		overflow: hidden;
		display: inline-block;

		text-align: ${$isMobile ? 'center' : 'left'};
		width: ${$isMobile ? '100%' : 'max-content'};
		margin-top: ${$isMobile ? getGap('m') : 'auto'};

		&:after {
			content: '';
			position: absolute;
			top: 0;
			right: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(
				to left,
				${getBrand('bc4', 0)} 0%,
				${getBrand('bc4', 60)} 50%,
				${getBrand('bc4', 0)} 100%
			);
			transform: skewX(-12deg);
			animation: shine 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
			pointer-events: none;
		}

		@keyframes shine {
			0% {
				transform: translateX(100%);
			}
			100% {
				transform: translateX(-200%);
			}
		}
	`
);

export const Carousel = styled(Div)(
	_props => css`
		position: relative;
		margin-top: ${getGap('xl')};

		${bp.l` margin-top: 0; `}
	`
);
