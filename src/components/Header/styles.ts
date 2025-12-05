// Imports
// ------------
import { bp, Header, getGap, getGlobal, getEase, Nav, Div } from '@tackl';
import { bodyS } from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Header)(
	props => css`
		position: fixed;
		z-index: 999;
		inset: 0 0 auto 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: ${getGap('m')};

		${bp.m`
			padding-block: ${getGap('l')};
		`}

		${bp.l`
			padding-block: ${getGap('xl')};
		`}
	`
);

export const Navigation = styled(Nav)(
	props => css`
		display: none;
		align-items: center;
		justify-content: space-between;
		gap: ${getGap('m')};

		${bp.l` display: flex; `}
	`
);

export const Col = styled(Div)<{ $isRight?: boolean }>(props => css``);

export const LogoWrapper = styled.div(
	props => css`
		position: relative; /* Needed for magnetic transform */
		display: inline-block; /* Keep logo inline but allow transforms */
	`
);
interface ButtonProps {
	$isFirst?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	'aria-label'?: string;
}

export const Button = styled.button<ButtonProps>(
	props => css`
		${bodyS}

		display: ${props.$isFirst ? 'none' : 'block'};
		padding-block: ${getGap('xs')};
		position: relative; /* Needed for magnetic transform */

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

export const Hamburger = styled.div(
	props => css`
		display: flex;
		justify-content: flex-end;
	`
);
