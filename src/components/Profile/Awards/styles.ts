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
import { bodyL, bodyM } from '@tackl/type';

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
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;

		border: 1px solid ${getBrand('bc3')};
		border-radius: ${getRadius('s')};

		margin-top: ${getGap('xl')};

		${bp.l`
            margin-top: ${getGap('uber')};
			grid-template-columns: repeat(3, 1fr);
        `}
	`
);

export const AwardItem = styled(Div)(
	props => css`
		--speed: 0.8s;
		--ease: ${getEase('bezzy3')};
		--trans: var(--speed) var(--ease);

		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		gap: ${getGap('s')};

		padding: ${getGap('m')};
		overflow: clip;

		aspect-ratio: 1 / 1;
		width: 100%;
		grid-column: auto;

		border-right: 1px solid ${getBrand('bc3')};
		border-bottom: 1px solid ${getBrand('bc3')};

		${bp.l`
			padding: ${getGap('xl')};
		`}

		&:nth-child(2n) {
			border-right: none;

			${bp.l`
				border-right: 1px solid ${getBrand('bc3')};
			`}
		}

		&:nth-child(4n) {
			border-right: none;

			${bp.l`
				border-right: 1px solid ${getBrand('bc3')};
			`}
		}

		&:nth-child(3n) {
			${bp.l`
				border-right: none;
			`}
		}

		&:nth-last-child(-n + 2) {
			border-bottom: none;
		}

		&:nth-last-child(-n + 3) {
			${bp.l`
				border-bottom: none;
			`}
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

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				* {
					color: ${getGlobal('white')};
				}

				&:before {
					transform: translateY(20%);
					transition: transform 0.5s var(--ease);
				}
			}
		}
	`
);

export const AwardItemTitle = styled.h3(
	props => css`
		${bodyM}
		color: ${getGlobal('white', 40)};

		transition: color var(--trans);

		${bp.l`
			${bodyL}
		`}
	`
);
