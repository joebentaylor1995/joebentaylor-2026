// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getEase, getGap } from '@tackl';
import {} from '@tackl/type';

// Exports
// ------------
export const Jacket = styled.button<{ $isOpen: boolean }>(
	props => css`
		--height: 2.4rem;
		--width: 3.6rem;

		position: relative;
		width: var(--width);
		height: var(--height);

		@keyframes toggleTop {
			0% {
				transform: rotate(0deg);
				top: var(--height);
			}

			40% {
				transform: rotate(-12deg);
				top: var(--height);
			}

			100% {
				transform: rotate(221deg);
				top: calc(var(--height) - 3px);
			}
		}

		span {
			position: absolute;
			width: var(--width);
			height: 1px;
			left: 0;

			transform-origin: right;

			background: ${getGlobal('white')};
		}

		span:first-child {
			top: 0.8rem;
		}

		span:last-child {
			bottom: 0.8rem;
		}
	`
);
