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
import {} from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Div)(
	props => css`
		cursor: grab;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex: none;
		width: 100%;
		overflow: hidden;
	`
);

export const Collection = styled.div(
	props => css`
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex: none;
		will-change: transform;
	`
);

export const List = styled.ul(
	props => css`
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
