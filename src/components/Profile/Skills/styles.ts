// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, Section, getBrand, getGlobal, getEase, getGap } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
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
