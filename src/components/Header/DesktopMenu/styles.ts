// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Nav, getBrand, getGlobal, getEase, getGap } from '@tackl';
import { bodyS, captionL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Nav)(
	props => css`
		display: none;
		align-items: center;
		justify-content: space-between;
		gap: ${getGap('m')};

		${bp.m` display: flex; `}
	`
);

interface ButtonProps {
	$isFirst?: boolean;
	$index: number;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	'aria-label'?: string;
}

export const Button = styled.button<ButtonProps>(
	({ $isFirst }) => css`
		${bodyS}

		position: relative;
		display: ${$isFirst ? 'none' : 'block'};

		> span {
			display: block;
			overflow: clip;
		}

		@keyframes moveUp {
			from {
				transform: translateY(0%);
			}
			to {
				transform: translateY(-100%);
			}
		}

		@keyframes moveDown {
			from {
				transform: translateY(-100%);
			}
			to {
				transform: translateY(0%);
			}
		}

		@media (hover: hover) and (pointer: fine) {
			cursor: pointer;

			&:hover .letter {
				animation: moveUp var(--speed) var(--ease) forwards;
			}

			&:not(:hover) .letter {
				animation: moveDown var(--speed) var(--ease) forwards;
			}
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.2;
		}

		.letter {
			--speed: 0.35s;
			--ease: ${getEase('bezzy2')};

			display: inline-block;
			vertical-align: middle;
			color: ${getGlobal('white')};
			transition: transform var(--speed) var(--ease);

			${[...Array(12)]
				.map(
					(_, i) =>
						`&:nth-child(${i + 1}) {
							animation-delay: ${i * 0.01}s;
						}`
				)
				.join('\n')}

			${bp.l`
				text-shadow: 0 1.32em 0 ${getGlobal('white', 60)};
			`}
		}
	`
);
