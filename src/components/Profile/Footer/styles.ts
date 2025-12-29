// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getGlobal, getGap, getBrand } from '@tackl';
import { bodyL, displayL } from '@tackl/type';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		position: relative;
		margin-top: ${getGap('xl')};
		height: 100lvh;

		${bp.l`
			margin-top: ${getGap('uber')};
		`}

		&:before {
			pointer-events: none;
			user-select: none;
			content: '';
			position: absolute;
			z-index: -1;
			inset: 30% 0 0 0;
			background: linear-gradient(
				to bottom,
				${getBrand('bc2', 0)} 0%,
				${getBrand('bc2')} 90%
			);
		}
	`
);

export const Content = styled(Div)(
	props => css`
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		width: 100%;
		height: 100%;

		header {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			h2 {
				${displayL}
			}
		}

		footer {
			padding-bottom: ${getGap('m')};

			${bp.l`
				padding-bottom: ${getGap('xl')};
			`}

			> waffl-grid {
				gap: ${getGap('xl')};
			}
		}
	`
);

export const Left = styled(Div)(
	props => css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		gap: ${getGap('m')};
	`
);

export const Right = styled(Div)(
	props => css`
		/*  */
	`
);

export const Location = styled.div(
	props => css`
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 100%;

		p,
		time {
			${bodyL}

			span {
				display: block;
				&:first-child {
					color: ${getGlobal('white')};
				}

				&:last-child {
					color: ${getGlobal('white', 40)};
				}
			}
		}

		time {
			color: ${getGlobal('white', 40)};
		}
	`
);
