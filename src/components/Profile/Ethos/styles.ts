// Imports
// ------------

import { bp, Div, getGap, getGlobal } from '@tackl';
import { bodyL, titleL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'section' })(
	_props => css`
		position: relative;
		padding-block: ${getGap('xl')};
		overflow: clip;

		${bp.l`
			padding-block: ${getGap('uber')};
		`}
	`
);

export const Content = styled(Div)(
	_props => css`
		position: relative;
		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};
	`
);

export const Heading = styled.h3(
	_props => css`
		${titleL}
		color: ${getGlobal('white')};
		text-wrap: balance;
	`
);

export const Desc = styled(Div)(
	_props => css`
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
