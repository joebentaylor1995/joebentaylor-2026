// Imports
// ------------

import { bp, Div, getGap, getGlobal } from '@tackl';
import { bodyL, bodyM, displayL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'section' })(
	() => css`
		padding-bottom: ${getGap('xl')};

		${bp.l`
			padding-bottom: ${getGap('uber')};
		`}
	`
);

export const Top = styled(Div).attrs({ as: 'header' })(
	() => css`
		position: relative;
		height: 100svh;

		content-visibility: auto;
		contain-intrinsic-size: 100svh;

		> waffl-grid {
			height: 100%;
		}
	`
);

export const TopContent = styled(Div)(
	() => css`
		align-self: flex-end;
		display: flex;
		flex-direction: column;
		gap: ${getGap('sm')};

		padding-bottom: ${getGap('m')};

		${bp.l`
			gap: ${getGap('m')};
			padding-bottom: ${getGap('xl')};
		`}
	`
);

export const Title = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('s')};
		transform-style: preserve-3d;
		perspective: 1000px;

		span {
			${displayL}
			transform-style: preserve-3d;
		}

		.char {
			display: inline-block;
			transform-style: preserve-3d;
		}
	`
);

export const Scroll = styled.span(
	() => css`
		display: none;

		${bp.l`
			${bodyM}
			color: ${getGlobal('white')};
			position: absolute;
			inset: auto ${getGap('xl')} ${getGap('xl')} auto;

			animation: intro-shine 0.5s linear infinite;

			@keyframes intro-shine {
				0%,
				100% {
					opacity: 0.4;
				}
				50% {
					opacity: 0.6;
				}
			}
		`}
	`
);

export const Bottom = styled(Div).attrs({ as: 'footer' })(
	() => css`
		overflow: unset;
		padding-top: ${getGap('huge')};

		${bp.l`
			padding-top: ${getGap('uber')};
		`}
	`
);

export const BottomSubheading = styled(Div)(
	() => css`
		position: relative;
		margin-bottom: ${getGap('m')};
		display: none;

		${bp.m`
			display: block;
			margin-bottom: ${getGap('xs')};
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

export const BottomContent = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('l')};
		height: 100%;
		user-select: none;

		p {
			${bodyL}
			color: ${getGlobal('white', 40)};
			text-wrap: pretty;
		}
	`
);
