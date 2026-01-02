// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, getGlobal, getBrand } from '@tackl';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled.div(
	({ theme }) => css`
		--offset: 4.8rem;

		position: fixed;
		z-index: 98;
		inset: 3.6rem auto auto 2.4rem;
		height: 2px;

		background: ${getBrand('bc3')};
		pointer-events: none;
		user-select: none;
		transform-origin: left center;
		width: 25vw;

		${bp.l`
            inset: auto auto var(--offset) var(--offset);
            width: calc(28.45vw - var(--offset));
        `}
	`
);

export const Progress = styled.div(
	props => css`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: ${getGlobal('white')};
		transform-origin: left center;
		transform: scaleX(0);
	`
);
