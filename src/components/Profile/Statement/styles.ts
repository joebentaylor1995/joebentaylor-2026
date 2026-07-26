// Imports
// ------------

import { bp, Div, getGap } from '@tackl';
import { titleL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'section' })(
	_props => css`
		padding-block: ${getGap('xl')};

		${bp.l` padding-block: ${getGap('uber')} `}
	`
);

export const Text = styled(Div).attrs({ as: 'p' })(
	_props => css`
		${titleL}
		text-wrap: pretty;
	`
);
