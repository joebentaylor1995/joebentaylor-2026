// Imports
// ------------

import { bp, Div, getGap } from '@tackl';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'section' })(
	_props => css`
		padding-block: ${getGap('xl')};

		${bp.l`
			padding-block: ${getGap('uber')};
		`}
	`
);

export const CustomLayout = styled(Div)<{
	$cssAreaOne: string;
	$cssAreaTwo: string;
	$cssAreaThree: string;
}>(
	props => css`
		display: grid;
		grid-template-areas:
			'${props.$cssAreaOne}'
			'${props.$cssAreaTwo}'
			'${props.$cssAreaThree}';
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		gap: ${getGap('s')};

		${bp.l`
			grid-template-areas:
			'${props.$cssAreaOne} ${props.$cssAreaTwo}'
			'${props.$cssAreaThree} ${props.$cssAreaThree}';
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
		`}
	`
);
