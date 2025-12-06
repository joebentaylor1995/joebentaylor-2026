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
	getRadius,
	Aside,
} from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Aside)(
	props => css`
		position: fixed;
		inset: 0;
		z-index: 9998;
		background-color: ${getGlobal('black', 90)};
		backdrop-filter: blur(12px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: ${getGap('m')};

		${bp.m` padding: ${getGap('l')}; `}
		${bp.l` padding: ${getGap('xl')}; `}
	`
);

export const ModalContent = styled.div(
	props => css`
		position: relative;
		width: 100%;
		max-width: 90rem;
		max-height: 90vh;
		background-color: ${getGlobal('black')};
		border-radius: ${getRadius('m')};
		overflow: hidden;
	`
);

export const ModalCloseButton = styled.button(
	props => css`
		position: absolute;
		top: ${getGap('s')};
		right: ${getGap('s')};
		z-index: 10;
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 50%;
		background-color: ${getGlobal('black', 60)};
		border: none;
		color: ${getGlobal('white')};
		font-size: 2.4rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background-color 0.2s ease,
			transform 0.2s ease;
		backdrop-filter: blur(8px);

		&:hover {
			background-color: ${getGlobal('black', 80)};
			transform: scale(1.1);
		}

		&:active {
			transform: scale(0.95);
		}

		${bp.m`
			width: 4rem;
			height: 4rem;
			font-size: 3rem;
			top: ${getGap('m')};
			right: ${getGap('m')};
		`}
	`
);

export const ModalVideo = styled.div(
	props => css`
		width: 100%;
		aspect-ratio: 16/9;
		position: relative;
		overflow: hidden;

		mux-player {
			width: 100%;
			height: 100%;

			/* Style controls with brand color 1 (blue) */
			--media-accent-color: ${getBrand('bc1')};
			--media-range-bar-color: ${getBrand('bc1')};
			--media-range-bar-fill-color: ${getBrand('bc1')};
			--media-range-thumb-background-color: ${getBrand('bc1')};
			--media-control-hover-background: ${getBrand('bc4')};
		}
	`
);
