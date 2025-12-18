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

// Exports
// ------------

const sharedStyles = css`
	position: fixed;

	cursor:
		url('/close-cursor.svg') 12 12,
		auto;
`;

export const Jacket = styled(Aside)(
	props => css`
		${sharedStyles}
		inset: 0 0 auto auto;

		width: 100%;
		z-index: 100;
		background: ${getBrand('bc4')};
		overflow: hidden;
		height: 100dvh;
		visibility: hidden;

		${bp.l`
			--gutter: ${props.theme.grid.gutter.l};
			--margin: ${props.theme.grid.gutter.l};
			--total-cols: ${props.theme.grid.columns.l};
			--cols: 8;

			--final-calc: calc(
				(var(--cols) * 100vw / var(--total-cols)) +
					(
						(var(--total-cols) - var(--cols)) / var(--total-cols) *
							(2 * var(--margin) - var(--gutter))
					)
			);

			width: var(--final-calc);
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

export const BackgroundOverlay = styled.aside<{ $isProfileOpen: boolean }>(
	props => css`
		${sharedStyles}

		inset: 0;
		z-index: 98;

		background: ${getGlobal('black', 60)};
		opacity: ${props.$isProfileOpen ? 1 : 0};
		pointer-events: ${props.$isProfileOpen ? 'auto' : 'none'};
		backdrop-filter: ${props.$isProfileOpen ? 'blur(6px)' : 'none'};

		transition:
			background 1s ${getEase('bezzy3')},
			backdrop-filter 1s ${getEase('bezzy3')};

		cursor:
			url('/close-cursor.svg') 12 12,
			auto;
	`
);

export const MobileClose = styled.button<{ $isProfileOpen: boolean }>(
	props => css`
		${bodyM}

		position: fixed;
		z-index: 101;
		top: ${getGap('s')};
		right: ${getGap('s')};

		padding: ${getGap('s')};
		color: ${getGlobal('white', 40)};

		opacity: ${props.$isProfileOpen ? 1 : 0};
		pointer-events: ${props.$isProfileOpen ? 'auto' : 'none'};
		transform: ${props.$isProfileOpen
			? 'translateX(0)'
			: 'translateX(100%)'};
		transition:
			opacity 1s ${getEase('bezzy2')},
			transform 1s ${getEase('bezzy3')};

		&:active {
			transform: scale(0.95);
			opacity: 0.5;
		}

		${bp.l` display: none; `}
	`
);
