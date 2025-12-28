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
		display: flex;
		justify-content: center;
		width: 100%;

		[data-logo-wall-list] [data-logo-wall-item]:nth-child(n + 7) {
			display: none;

			${bp.l`
                display: block;
            `}
		}

		${bp.l`
            [data-logo-wall-list] [data-logo-wall-item]:nth-child(n + 9) {
                display: none;
            }
        `}
	`
);

export const Collection = styled(Div)(
	props => css`
		width: 100%;
	`
);

export const List = styled(Div)(
	props => css`
		display: flex;
		flex-flow: wrap;
		border: 1px solid ${getBrand('bc3')};
		border-radius: ${getRadius('s')};
	`
);

export const ListItem = styled(Div)(
	props => css`
		width: 50%;
		position: relative;
		border-right: 1px solid ${getBrand('bc3')};
		overflow: hidden;

		&:nth-child(-n + 4) {
			border-bottom: 1px solid ${getBrand('bc3')};
		}

		&:nth-child(2n) {
			border-right: none;

			${bp.l`
				border-right: 1px solid ${getBrand('bc3')};
			`}
		}

		${bp.l`
            width: 25%;

			&:nth-child(4n) {
				border-right: none;
			}
        `}
	`
);

export const LogoWall = styled(Div)(
	props => css`
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	`
);

export const LogoBefore = styled(Div)(
	props => css`
		display: block;
		aspect-ratio: 1/1;
		width: 100%;
	`
);

export const LogoTarget = styled(Div)(
	props => css`
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		display: flex;
		position: absolute;

		img {
			display: block;
			width: 100%;
			height: 100%;
			max-height: 11.2rem !important;
			max-width: 11.2rem !important;
			object-fit: contain;
			object-position: center;
			user-select: none;
			pointer-events: none;
		}
	`
);
