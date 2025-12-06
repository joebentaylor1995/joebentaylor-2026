// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Nav,
	List,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getFont,
	getFontWeight,
	getRadius,
} from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Nav)<{ $isOpen: boolean }>(
	props => css`
		--ease: ${getEase('bezzy2')};
		--speed: 0.5s;
		--open: 0% 0% 0% 0%;
		--closed: 0% 0% 100% 0%;

		position: fixed;
		z-index: 998;
		inset: 0;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: ${getBrand('bc3')};

		clip-path: inset(${props.$isOpen ? 'var(--open)' : 'var(--closed)'});
		transform: translateZ(0); /* Force GPU acceleration */
		transition: clip-path var(--speed) var(--ease);
		pointer-events: ${props.$isOpen ? 'auto' : 'none'};

		/* Only use will-change during animation to avoid constant repaints */
		${props.$isOpen &&
		css`
			will-change: clip-path;
		`}
	`
);

export const UL = styled(List)<{ $isSocial?: boolean }>(
	props => css`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;

		width: 100%;
		padding-inline: ${getGap('m')};

		${props.$isSocial &&
		css`
			position: absolute;
			inset: auto 0 ${getGap('m')} 0;
			gap: ${getGap('s')};
		`}

		li {
			display: inline-block;
		}

		button {
			font-family: ${getFont('body')};
			font-weight: ${getFontWeight('regular')};

			color: ${getGlobal('white')};
			font-size: 6rem;
			line-height: 1.32;
		}
	`
);
