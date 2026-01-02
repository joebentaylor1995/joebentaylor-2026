// Imports
// ------------
import styled, { css } from 'styled-components';
import { getGlobal, getEase } from '@tackl';

// Exports
// ------------
export const Jacket = styled.button<{ $isOpen: boolean }>(
	({ $isOpen }) => css`
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
				opacity: ${$isOpen ? 0 : 1};

				transition:
					opacity var(--speed-out) var(--ease),
					transform var(--speed-out) var(--ease);

				transition-delay: ${$isOpen ? 0 : 0.1}s;
			}

			&:before {
				top: var(--offset);
				transform: translateX(${$isOpen ? 100 : 0}%);
			}

			&:after {
				bottom: var(--offset);
				transform: translateX(${$isOpen ? -100 : 0}%);
			}
		}

		.close {
			transform: translateX(${$isOpen ? 0.8 : 0}rem);
			transition: transform var(--speed-out) var(--ease);

			&:before,
			&:after {
				left: 50%;
				width: 2.4rem;
				opacity: ${$isOpen ? 1 : 0};

				transition:
					opacity var(--speed-out) var(--ease),
					transform var(--speed-out) var(--ease);
			}

			&:before {
				top: 50%;
				transform: translateX(-50%) rotate(45deg)
					translate(${$isOpen ? 0 : -50}%);
			}

			&:after {
				top: 50%;
				transform: translateX(-50%) rotate(-45deg)
					translate(${$isOpen ? 0 : -50}%);
				transition-delay: 0.1s;
			}
		}
	`
);
