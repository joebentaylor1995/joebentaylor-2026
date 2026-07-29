// Imports
// ------------

import { bp, Div, getGap, getRadius } from '@tackl';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Div)(
	_props => css`
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex: none;
		width: 100%;
		overflow: hidden;
		pointer-events: none;
		user-select: none;

		${bp.l`
			cursor: grab;
			pointer-events: auto;
		`}
	`
);

export const Collection = styled.div(
	_props => css`
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex: none;
		will-change: transform;
	`
);

export const List = styled.ul(
	_props => css`
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex: none;

		li {
			width: 18.4rem;
			aspect-ratio: 3/4;
			border-radius: ${getRadius('s')};
			margin-right: ${getGap('s')};
			flex: none;
			overflow: hidden;

			picture {
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					object-position: center;
					user-select: none;
					pointer-events: none;
				}
			}
		}
	`
);
