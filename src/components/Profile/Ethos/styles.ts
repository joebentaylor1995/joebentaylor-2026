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
	getFontWeight,
} from '@tackl';
import { bodyL, titleL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		position: relative;
		padding-block: ${getGap('xl')};
		overflow: clip;

		${bp.l`
			padding-block: ${getGap('uber')};
		`}
	`
);

export const Content = styled(Div)(
	props => css`
		position: relative;
		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};
	`
);

export const Heading = styled.h3(
	props => css`
		${titleL}
		color: ${getGlobal('white')};
		text-wrap: balance;
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

			mark {
				position: relative;
				background: none;
				color: ${getGlobal('white', 40)};
				overflow: hidden;
			}
		}
	`
);
