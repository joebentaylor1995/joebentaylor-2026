// Imports
// ------------

import { getGlobal } from '@tackl';
import { displayL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled.p(
	_props => css`
		${displayL}

		color: ${getGlobal('white')};
	`
);
