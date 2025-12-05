// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Section,
	Div,
	P,
	Footer,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
} from '@tackl';
import { bodyL, bodyS } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		width: 100%;
		height: 100dvh;

		waffl-grid {
			align-items: center;
			height: 100%;
		}
	`
);

export const Background = styled.div(
	props => css`
		--unicorn-width: 100%;
		--unicorn-height: 100%;

		position: fixed;
		inset: 0;
		z-index: -1;

		&:after {
			${bp.l`
				content: '';
				position: absolute;
				inset: 0 0 0 50%;
				background: linear-gradient(270deg, ${getGlobal('black', 60)} 0%, ${getGlobal('black', 0)} 100%);
			`}
		}

		video {
			opacity: 0.4;
			width: 200%;
			height: 100%;
			object-fit: cover;

			--media-object-fit: cover;
			--controls: none;
		}
	`
);

export const Texts = styled(Div)(
	props => css`
		position: relative;
		display: flex;
		flex-direction: column;
		gap: ${getGap('s')};

		${bp.m` gap: ${getGap('sm')}; `}
	`
);

export const Text = styled(P)(
	props => css`
		${bodyL}
		color: ${getGlobal('white')};

		/* Fix character shifting when SplitText splits text */
		font-kerning: none;
		text-rendering: optimizeSpeed;
	`
);

export const ButtonAnimation = styled(Div)(
	props => css`
		opacity: 0; /* Start hidden, will be animated in after text animation */
	`
);

export const CenterContent = styled(Div)<{ $offset: number }>(
	props => css`
		--offset: calc(${props.$offset}rem / 2);

		position: relative;
		height: 100%;
		padding-bottom: var(--offset);

		${bp.m` padding-bottom: 0; `}
	`
);

export const BottomContent = styled(Footer)(
	props => css`
		--offset: ${getGap('m')};

		position: absolute;
		inset: auto 0 var(--offset) 0;

		${bp.m` --offset: ${getGap('l')}; `}
		${bp.l` --offset: ${getGap('xl')}; `}

    	waffl-grid {
			align-items: flex-end;
		}
	`
);

export const Copyright = styled(Div)(
	props => css`
		${bodyS}
		color: ${getGlobal('white', 40)};

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: ${getGap('s')};

		${bp.m` gap: ${getGap('sm')}; `}

		hr {
			flex: 1;
			height: 1px;
			background-color: ${getGlobal('white', 10)};
			border: none;
		}
	`
);

export const VideoPreview = styled(Div)<{ $isModalOpen: boolean }>(
	props => css`
		width: 10.2rem;
		aspect-ratio: 3/4;
		height: 100%;
		position: relative;
		overflow: hidden;
		border-radius: ${getRadius('s')};
		cursor: pointer;
		clip-path: inset(
			${props.$isModalOpen ? '100%' : '0%'}
				${props.$isModalOpen ? '100%' : '0%'} 0% 0% round
				${getRadius('s')}
		);
		transition:
			transform 0.35s ${getEase('bezzy3')},
			clip-path 0.35s ${getEase('bezzy3')};
		transform-origin: bottom left;

		&:hover {
			transform: scale(1.12);
		}

		${bp.m` width: 14.4rem; `}

		mux-player {
			--media-object-fit: cover;
			--controls: none;

			width: 100%;
			height: 100%;
		}
	`
);

export const Modal = styled.div(
	props => css`
		position: fixed;
		inset: 0;
		z-index: 9998;
		background-color: ${getGlobal('black', 90)};
		backdrop-filter: blur(12px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: ${getGap('m')};

		${bp.m` padding: ${getGap('l')}; `}
		${bp.l` padding: ${getGap('xl')}; `}
	`
);

export const ModalContent = styled.div(
	props => css`
		position: relative;
		width: 100%;
		max-width: 90rem;
		max-height: 90vh;
		background-color: ${getGlobal('black')};
		border-radius: ${getRadius('m')};
		overflow: hidden;
	`
);

export const ModalCloseButton = styled.button(
	props => css`
		position: absolute;
		top: ${getGap('s')};
		right: ${getGap('s')};
		z-index: 10;
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 50%;
		background-color: ${getGlobal('black', 60)};
		border: none;
		color: ${getGlobal('white')};
		font-size: 2.4rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background-color 0.2s ease,
			transform 0.2s ease;
		backdrop-filter: blur(8px);

		&:hover {
			background-color: ${getGlobal('black', 80)};
			transform: scale(1.1);
		}

		&:active {
			transform: scale(0.95);
		}

		${bp.m`
			width: 4rem;
			height: 4rem;
			font-size: 3rem;
			top: ${getGap('m')};
			right: ${getGap('m')};
		`}
	`
);

export const ModalVideo = styled.div(
	props => css`
		width: 100%;
		aspect-ratio: 16/9;
		position: relative;
		overflow: hidden;

		mux-player {
			width: 100%;
			height: 100%;

			/* Style controls with brand color 1 (blue) */
			--media-accent-color: ${getBrand('bc1')};
			--media-range-bar-color: ${getBrand('bc1')};
			--media-range-bar-fill-color: ${getBrand('bc1')};
			--media-range-thumb-background-color: ${getBrand('bc1')};
			--media-control-hover-background: ${getBrand('bc4')};
		}
	`
);
