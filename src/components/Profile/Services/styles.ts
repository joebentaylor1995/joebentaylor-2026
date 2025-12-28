// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Section,
	getRadius,
	getGlobal,
	getEase,
	getGap,
	Div,
	List,
	ListItem,
} from '@tackl';
import { bodyL, titleL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		padding-bottom: ${getGap('xl')};

		${bp.l`
			padding-bottom: ${getGap('uber')};
		`}
	`
);

export const Sticky = styled(Div)(
	props => css`
		position: relative;
		margin-bottom: ${getGap('m')};
		display: none;

		${bp.m`
			display: block;
			margin-bottom: ${getGap('sm')};
		`}

		> div {
			${bp.m`
				position: sticky;
				top: calc(100% - ${getGap('xl')});
				left: 0;
				margin-bottom: 0;
			`}
		}
	`
);

export const Text = styled(Div)(
	props => css`
		/*  */
	`
);

export const Desc = styled(Div)(
	props => css`
		/*  */

		p {
			${bodyL}
			color: ${getGlobal('white', 40)};
			text-wrap: pretty;

			mark {
				color: ${getGlobal('white')};
				background: none;
			}
		}
	`
);

export const ServiceList = styled(List)(
	props => css`
		display: flex;
		flex-direction: column;

		padding-top: ${getGap('xl')};

		${bp.l`
			gap: ${getGap('s')};
			padding-top: ${getGap('uber')};
		`}
	`
);

export const ServiceItem = styled(ListItem)(
	props => css`
		display: flex;
		align-items: center;
		gap: ${getGap('sm')};

		${bp.l`
			gap: ${getGap('m')};
		`}
	`
);

export const Picture = styled(Div)(
	props => css`
		transform-origin: left center;

		picture {
			--desktop: 7.2rem;
			--mobile: 4.8rem;

			display: block;
			width: var(--mobile);
			height: var(--mobile);

			border-radius: ${getRadius('s')};
			overflow: hidden;

			${bp.l`
				width: var(--desktop);
				height: var(--desktop);
			`}

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

export const Title = styled(Div)(
	props => css`
		h3 {
			${titleL}
			color: ${getGlobal('white')};
		}
	`
);
