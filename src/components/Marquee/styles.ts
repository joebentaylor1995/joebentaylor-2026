// Imports
// ------------
import styled, { css } from 'styled-components';
import { Div } from '@tackl';

// Interfaces
// ------------
interface MarqueeInterface {
	$isPlaying?: boolean;
	$direction?: 'left' | 'right';
	$speed?: number;
}

// Exports
// ------------
export const Jacket = styled(Div)<MarqueeInterface>(
	({ $speed }) => css`
		--gap: 1.2rem;
		--duration: ${$speed}s;

		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
	`
);

export const List = styled.ul<MarqueeInterface>(
	({ $direction, $isPlaying }) => css`
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;
		min-width: 100%;
		gap: var(--gap);
		animation: scroll var(--duration) linear infinite;
		animation-direction: ${$direction === 'right' ? 'reverse' : 'normal'};
		animation-play-state: ${$isPlaying ? 'running' : 'paused'};

		list-style: none;
		padding: 0;
		margin: 0;

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
