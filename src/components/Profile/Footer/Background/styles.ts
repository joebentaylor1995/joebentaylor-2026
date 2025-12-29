// Imports
// ------------
import styled, { css } from 'styled-components';
import { getGap, getGlobal } from '@tackl';

// Exports
// ------------
export const Jacket = styled.aside(
	props => css`
		position: absolute;
		z-index: -2;
		inset: 0;
		overflow: hidden;
		background: ${getGlobal('black')};
	`
);

export const IntroSection = styled.section(
	props => css`
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	`
);

export const GridMotionContainer = styled.div(
	props => css`
		gap: ${getGap('m')};
		flex: none;
		position: relative;
		width: 150%;
		display: grid;
		grid-template-rows: repeat(4, 1fr);
		grid-template-columns: 100%;
		transform: rotate(-15deg);
		transform-origin: center center;
		z-index: 2;
	`
);

export const Row = styled.div(
	props => css`
		display: grid;
		gap: ${getGap('m')};
		grid-template-columns: repeat(7, 1fr);
		will-change: transform, filter;
	`
);

export const RowItem = styled.div(
	props => css`
		position: relative;
	`
);

export const RowItemInner = styled.div(
	props => css`
		position: relative;
		width: 24rem;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border-radius: 10px;
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
	`
);

export const RowItemImgWrapper = styled.div(
	props => css`
		position: absolute;
		inset: 0;
		overflow: hidden;

		picture {
			position: absolute;
			inset: 0;
			overflow: hidden;
		}

		img {
			user-select: none;
			filter: grayscale(100%);
			opacity: 0.2;
		}
	`
);
