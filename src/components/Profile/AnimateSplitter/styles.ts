// Imports
// ------------

import { bp, Div, getBrand, getGap } from '@tackl';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'section' })(
	_props => css`
		position: relative;
		padding-block: ${getGap('xl')};

		${bp.l`
			padding-block: ${getGap('uber')};
		`}
	`
);

export const Col = styled(Div)(
	_props => css`
		width: 100%;
	`
);

export const Line = styled.hr(
	_props => css`
		display: block;
		width: 100%;
		height: 1px;
		background: ${getBrand('bc3')};
		border: none;

		transform-origin: left center;
		transform: scaleX(0);
	`
);
