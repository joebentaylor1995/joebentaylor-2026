// Imports
// ------------

import { getGlobal } from '@tackl';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled.svg(
	_props => css`
		--aspect-ratio: 68/24;

		width: auto;
		height: 2.4rem;

		fill: ${getGlobal('white')};
	`
);
