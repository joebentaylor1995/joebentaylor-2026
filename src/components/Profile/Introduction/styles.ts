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
	Section,
	Header,
	Footer,
} from '@tackl';
import { bodyL, bodyM, displayL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		padding-bottom: ${getGap('uber')};
	`
);

export const Top = styled(Header)(
	props => css`
		position: relative;
		height: 100lvh;

		> waffl-grid {
			height: 100%;
		}
	`
);

export const TopContent = styled(Div)(
	props => css`
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
	props => css`
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
	props => css`
		display: none;

		${bp.l`
			${bodyM}
			color: ${getGlobal('white', 100)};
			position: absolute;
			bottom: ${getGap('xl')};
			right: ${getGap('xl')};

			animation: shine 0.5s linear infinite;

			@keyframes shine {
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

export const Bottom = styled(Footer)(
	props => css`
		overflow: unset;
		padding-top: ${getGap('uber')};
	`
);

export const BottomSubheading = styled(Div)(
	props => css`
		position: relative;

		> div {
			position: sticky;
			top: calc(100% - ${getGap('xl')});
			left: 0;
		}
	`
);

export const BottomContent = styled(Div)(
	props => css`
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
