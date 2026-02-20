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
} from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	disabled?: boolean;
}

// Exports
// ------------
export const Jacket = styled.div<StylesInterface>(
	props => css`
		--size: 6rem;

		position: absolute;
		right: 0;
		top: 0;

		display: grid;
		place-items: center;

		width: var(--size);
		height: var(--size);
	`
);

export const Content = styled.button<StylesInterface>(
	props => css`
		--size: 3.6rem;
		--speed: 0.5s;
		--ease: ${getEase('bezzy2')};

		width: var(--size);
		height: var(--size);

		background: ${getGlobal('white', 20)};
		border-radius: ${getRadius('round')};
		transition: background var(--speed) var(--ease);

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				cursor: pointer;
				background: ${getGlobal('white')};

				svg {
					stroke: ${getBrand('bc3')};
				}
			}
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					background: ${getGlobal('white', 20)};
					svg {
						stroke: ${getGlobal('white')};
					}
				}
			}
		}

		svg {
			--size: 1.8rem;

			width: var(--size);
			height: var(--size);

			stroke: ${getGlobal('white')};
			fill: none;

			transition: stroke var(--speed) var(--ease);
		}
	`
);
