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
		--ease: ${getEase('bezzy')};
		--speed-out: 0.5s;
		--speed-in: 1s;

		position: relative;
		width: var(--width);
		height: var(--height);

		.open,
		.close {
			position: absolute;
			inset: 0;

			&:before,
			&:after {
				content: '';
				position: absolute;
				width: var(--width);
				height: 1px;
				background: ${getGlobal('white')};
			}
		}

		.open {
			--offset: 0.8rem;

			&:before,
			&:after {
				left: 0;
				width: 100%;

				opacity: ${props.$isOpen ? '0' : '1'};

				transition:
					opacity var(--speed-out) var(--ease),
					transform var(--speed-out) var(--ease);

				transition-delay: ${props.$isOpen ? '0s' : '0.1s'};
			}

			&:before {
				top: var(--offset);
				transform: translateX(${props.$isOpen ? '100%' : '0%'});
			}

			&:after {
				bottom: var(--offset);
				transform: translateX(${props.$isOpen ? '-100%' : '0%'});
			}
		}

		.close {
			transform: translateX(${props.$isOpen ? '0.8rem' : '0'});
			transition: transform var(--speed-out) var(--ease);

			&:before,
			&:after {
				left: 50%;
				width: 2.4rem;
				opacity: ${props.$isOpen ? '1' : '0'};

				transition:
					opacity var(--speed-out) var(--ease),
					transform var(--speed-out) var(--ease);
			}

			&:before {
				top: 50%;
				transform: translateX(-50%) rotate(45deg)
					translate(${props.$isOpen ? '0%' : '-50%'});
			}

			&:after {
				top: 50%;
				transform: translateX(-50%) rotate(-45deg)
					translate(${props.$isOpen ? '0%' : '-50%'});
				transition-delay: 0.1s;
			}
		}
	`
);
