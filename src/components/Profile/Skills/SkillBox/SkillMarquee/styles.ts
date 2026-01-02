// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getEase, getGap } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Div)<{ $itemCount: number }>(
	props => css`
		--gap: ${getGap('s')};
		--duration: calc(2s * ${props.$itemCount});
		--fade: ${getBrand('bc4')} 0%, transparent 100%;

		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);

		&:before,
		&:after {
			content: '';
			position: absolute;
			z-index: 2;
			top: 0;
			bottom: 0;
			width: ${getGap('m')};

			${bp.m` width: ${getGap('xl')}; `}
		}

		&:before {
			left: 0;
			background: linear-gradient(to right, var(--fade));
		}

		&:after {
			right: 0;
			background: linear-gradient(to left, var(--fade));
		}
	`
);

export const Content = styled.ul<{ $isActive?: boolean }>(
	props => css`
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;
		min-width: 100%;
		gap: var(--gap);
		animation: scroll var(--duration) linear infinite;
		animation-play-state: ${props.$isActive ? 'running' : 'paused'};

		@keyframes scroll {
			from {
				transform: translateX(0);
			}
			to {
				transform: translateX(calc(-100% - var(--gap)));
			}
		}
	`
);

export const Picture = styled.div(
	props => css`
		--size: 10.8rem;
		--icon-size: 4.8rem;

		display: flex;
		align-items: center;
		justify-content: center;

		width: var(--size);
		height: var(--size);

		border-radius: 50%;
		background: ${getBrand('bc3')};
		overflow: hidden;
		transition: background 0.3s ${getEase('bezzy3')};

		picture {
			display: block;
			width: var(--icon-size);
			height: var(--icon-size);

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				object-position: center;
				user-select: none;
				pointer-events: none;
			}
		}
	`
);
