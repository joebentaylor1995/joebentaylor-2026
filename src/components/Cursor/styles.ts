// Imports
// ------------

import { bp, Div, getGlobal, getRadius } from '@tackl';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Div)(
	_props => css`
		--size: 4.8rem;

		display: none;
		position: fixed;
		z-index: 101;
		top: calc(var(--size) / 2 * -1);
		left: calc(var(--size) / 2 * -1);

		width: var(--size);
		height: var(--size);

		border: 1px solid ${getGlobal('white')};
		border-radius: ${getRadius('round')};

		pointer-events: none;

		${bp.l` display: block; `}
	`
);
