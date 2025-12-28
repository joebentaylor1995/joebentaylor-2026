// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Section,
	Div,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
} from '@tackl';
import { bodyL, displayL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		position: relative;
		padding-block: ${getGap('xl')};

		${bp.l`
			padding-block: ${getGap('uber')};
		`}
	`
);

export const Sticky = styled(Div)(
	props => css`
		position: relative;
		margin-bottom: ${getGap('m')};

		${bp.l` margin-bottom: ${getGap('xs')};`}

		> div {
			${bp.m`
				position: sticky;
				top: calc(100% - ${getGap('xl')});
				left: 0;
				
			`}
		}
	`
);

export const Desc = styled(Div)(
	props => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};

		p {
			${bodyL}
			color: ${getGlobal('white', 40)};
			text-wrap: balance;
		}
	`
);

export const AwardsList = styled(Div)(
	props => css`
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;

		border: 1px solid ${getBrand('bc3')};
		border-radius: ${getRadius('s')};

		margin-top: ${getGap('xl')};

		${bp.l`
            margin-top: ${getGap('uber')};
        `}
	`
);

export const AwardItem = styled(Div)(
	props => css`
		--speed: 0.3s;
		--ease: ${getEase('bezzy2')};
		--trans: var(--speed) var(--ease);

		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		gap: ${getGap('s')};
		padding: ${getGap('xl')};
		overflow: clip;

		aspect-ratio: 1 / 1;
		width: 100%;
		grid-column: auto;

		border-right: 1px solid ${getBrand('bc3')};
		border-bottom: 1px solid ${getBrand('bc3')};

		&:nth-child(3n) {
			border-right: none;
		}

		// Remove bottom border for the last 3 items in the grid
		&:nth-last-child(-n + 3) {
			border-bottom: none;
		}

		&:before {
			content: '';
			position: absolute;
			z-index: -1;
			inset: 0;
			transform: translateY(150%);

			background: linear-gradient(
				to bottom,
				${getBrand('bc4')} 0%,
				${getBrand('bc1')} 100%
			);
			filter: blur(4rem);

			transition: transform var(--trans);
		}

		&:hover {
			* {
				color: ${getGlobal('white')};
			}

			&:before {
				transform: translateY(20%);
			}
		}
	`
);

export const AwardItemTitle = styled.h3(
	props => css`
		${bodyL}
		color: ${getGlobal('white', 40)};

		transition: color var(--trans);
	`
);
