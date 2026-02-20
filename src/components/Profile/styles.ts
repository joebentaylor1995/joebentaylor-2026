// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Aside,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
} from '@tackl';
import { bodyM } from '@tackl/type';

// Interfaces
// ------------
interface ProfileInterface {
	$isOpen?: boolean;
}

// Exports
// ------------

const sharedStyles = css`
	position: fixed;

	cursor:
		url('/close-cursor.svg') 12 12,
		auto;
`;

export const Jacket = styled(Aside)(
	({}) => css`
		${sharedStyles}
		inset: 0 0 auto auto;

		width: 100%;
		z-index: 100;
		background: ${getBrand('bc4')};
		overflow-y: auto;
		overflow-x: hidden;
		height: 100dvh;
		visibility: hidden;
		-webkit-overflow-scrolling: touch;
		touch-action: pan-y;

		${bp.l`
			width: 68vw;
			border-radius: ${getRadius('s')} 0 0 ${getRadius('s')};
		`}
	`
);

export const Content = styled.div(
	props => css`
		width: 100%;
		height: auto;
		min-height: 100%;
	`
);

export const BackgroundOverlay = styled.aside<ProfileInterface>(
	({ $isOpen }) => css`
		${sharedStyles}

		--cursor-url: url('/close-cursor.svg');
		--cursor-size: 12 12;
		cursor:
			var(--cursor-url) var(--cursor-size),
			auto;

		inset: 0;
		z-index: 98;

		background: ${getGlobal('black', 60)};
		opacity: ${$isOpen ? 1 : 0};
		pointer-events: ${$isOpen ? 'auto' : 'none'};
		backdrop-filter: blur(${$isOpen ? 6 : 0}px);

		transition:
			background 1s ${getEase('bezzy3')},
			backdrop-filter 1s ${getEase('bezzy3')};
	`
);

export const MobileClose = styled.button<ProfileInterface>(
	({ $isOpen }) => css`
		${bodyM}

		--time: 1s;

		user-select: none;
		position: fixed;
		z-index: 101;
		top: ${getGap('s')};
		right: ${getGap('s')};

		padding: ${getGap('s')};
		color: ${getGlobal('white', 40)};
		opacity: ${$isOpen ? 1 : 0};
		pointer-events: ${$isOpen ? 'auto' : 'none'};
		transform: translateX(${$isOpen ? 0 : 100}%);
		transition:
			opacity var(--time) ${getEase('bezzy2')},
			transform var(--time) ${getEase('bezzy3')};

		&:active {
			transform: scale(0.95);
			opacity: 0.5;
		}

		${bp.l` display: none; `}
	`
);
