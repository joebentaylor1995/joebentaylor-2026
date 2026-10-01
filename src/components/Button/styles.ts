// Imports
// ------------

import { getEase, getGap, getGlobal, getRadius } from '@tackl';
import { bodyS } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled.button(
	_props => css`
		--speed: 0.35s;
		--ease: ${getEase('bezzy2')};

		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: ${getGap('s')};

		width: fit-content;
		padding: ${getGap('s')} ${getGap('m')};

		border: 1px solid ${getGlobal('white', 20)};
		border-radius: ${getRadius('round')};
		overflow: clip;

		@keyframes in {
			from {
				transform: translateY(102%);
			}
			to {
				transform: translateY(0%);
			}
		}

		@keyframes out {
			from {
				transform: translateY(0%);
			}
			to {
				transform: translateY(-102%);
			}
		}

		@keyframes letterIn {
			from {
				transform: translateY(0%);
			}
			to {
				transform: translateY(-160%);
			}
		}

		@media (hover: hover) and (pointer: fine) {
			--anim: var(--speed) var(--ease) forwards;

			&:hover {
				&:before {
					animation: in var(--anim);
				}

				.letter {
					animation: letterIn var(--anim);
				}
			}

			&:not(:hover) {
				&:before {
					animation: out var(--anim);
				}
			}
		}

		&:before {
			content: '';
			position: absolute;
			inset: 0;
			background: ${getGlobal('white')};
			border-radius: ${getRadius('round')};

			transition: transform var(--speed) var(--ease);
			transform: translateY(102%);
		}

		> span {
			${bodyS}
			color: ${getGlobal('white')};
			mix-blend-mode: difference;

			.letter {
				display: inline-block;
				text-shadow: 0 3rem 0 ${getGlobal('white')};
				color: ${getGlobal('white')};
				transition: transform var(--speed) var(--ease);

				${[...Array(12)].map((_, i) => `&:nth-child(${i + 1}) { animation-delay: ${i * 0.01}s; }`).join('\n')}
			}
		}
	`
);
