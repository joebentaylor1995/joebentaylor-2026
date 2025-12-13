// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Div,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	Aside,
	getRadius,
} from '@tackl';
import { bodyL } from '@tackl/type';

// Interfaces
// ------------

// Exports
// ------------
const sharedContainerStyles = css`
	position: fixed;
	inset: 0;
	overflow: hidden;
`;

export const Jacket = styled(Aside)(
	props => css`
		${sharedContainerStyles}
		z-index: 99;
		background: ${getGlobal('white')};

		ul {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			gap: ${getGap('m')};
			width: 100%;

			transform: translateY(100dvh);

			li {
				position: relative;
				display: block;
			}
		}
	`
);

export const Image = styled.div(
	props => css`
		position: relative;
		display: block;

		width: 20vw;
		height: 20dvh;
		overflow: hidden;
	`
);

export const ImageClip = styled.div(
	props => css`
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		clip-path: inset(0% round ${getRadius('s')});
	`
);

export const ImageScale = styled.div(
	props => css`
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		scale: 1.4;

		img {
			position: absolute;
			top: 50%;
			left: 100%;
			transform: translate(-50%, -50%) scale(0.2);
			display: block;
			width: 200vw !important;
			height: 100vh !important;
			object-fit: cover;
			max-width: none !important;

			${bp.m`
				left: 50%;
				width: 100vw !important;
			`}
		}
	`
);

export const Counter = styled.div(
	props => css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		color: ${getGlobal('white')};
		mix-blend-mode: difference;

		span {
			${bodyL}
		}
	`
);
