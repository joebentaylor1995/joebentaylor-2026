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
		overflow: clip;

		${bp.l`
			margin-top: ${getGap('uber')};
		`}
	`
);

export const Gradient = styled.aside(
	props => css`
		--offset: -2.4rem;

		pointer-events: none;
		user-select: none;
		position: absolute;
		z-index: -1;
		inset: 30% var(--offset) var(--offset) var(--offset);
		transform-origin: bottom;
		filter: blur(calc(var(--offset) * -1));
		background: linear-gradient(
			to bottom,
			${getBrand('bc2', 0)} 0%,
			${getBrand('bc2')} 90%
		);

		${bp.l`
			--offset: -6rem;
		`}
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
