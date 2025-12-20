// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, getBrand, getGlobal, getEase, getGap, P } from '@tackl';
import { titleL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		padding-block: ${getGap('uber')};
	`
);

export const Text = styled(P)(
	props => css`
		/*  */
		${titleL}
		text-wrap: pretty;
	`
);
