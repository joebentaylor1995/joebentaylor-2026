// Imports
// ------------
import styled, { css } from 'styled-components';
import { getGlobal } from '@tackl';
import { displayL } from '@tackl/type';

// Exports
// ------------
export const Jacket = styled.p(
	props => css`
		${displayL}

		color: ${getGlobal('white')};
	`
);
