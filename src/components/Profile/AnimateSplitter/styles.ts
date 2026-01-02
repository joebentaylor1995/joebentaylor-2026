// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGap } from '@tackl';

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

export const Col = styled(Div)(
	props => css`
		width: 100%;
	`
);

export const Line = styled.hr(
	props => css`
		display: block;
		width: 100%;
		height: 1px;
		background: ${getBrand('bc3')};
		border: none;

		transform-origin: left center;
		transform: scaleX(0);
	`
);
