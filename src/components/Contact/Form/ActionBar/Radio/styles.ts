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
import { bodyS } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {}

// Exports
// ------------
export const Jacket = styled.div<StylesInterface>(
	({}) => css`
		display: flex;
		align-items: center;
		gap: ${getGap('s')};

		input[type='radio'] {
			--size: 1.6rem;

			cursor: pointer;
			visibility: hidden;
			pointer-events: none;

			position: absolute;
			inset: 0;

			width: var(--size);
			height: var(--size);
			opacity: 0;
		}

		label {
			--speed: 0.4s;
			--text-speed: 0.35s;
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

			@keyframes radioIn {
				from {
					transform: translateY(102%);
				}
				to {
					transform: translateY(0%);
				}
			}

			@keyframes radioOut {
				from {
					transform: translateY(0%);
				}
				to {
					transform: translateY(-102%);
				}
			}

			@keyframes radioLetterIn {
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
					cursor: pointer;

					&:before {
						animation: radioIn var(--anim);
					}

					.letter {
						animation: radioLetterIn var(--text-speed) var(--ease);
					}
				}

				&:not(:hover) {
					&:before {
						animation: radioOut var(--anim);
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
					color: ${getBrand('bc6')};
					transition: transform var(--speed) var(--ease);

					${[...Array(50)]
						.map(
							(_, i) =>
								`&:nth-child(${i + 1}) { animation-delay: ${i * 0.005}s; }`
						)
						.join('\n')}
				}
			}
		}
	`
);
