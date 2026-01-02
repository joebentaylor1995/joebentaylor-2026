// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, getGap, P } from '@tackl';
import { titleL } from '@tackl/type';

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		padding-block: ${getGap('xl')};

		${bp.l` padding-block: ${getGap('uber')} `}
	`
);

export const Text = styled(P)(
	props => css`
		${titleL}
		text-wrap: pretty;
	`
);
