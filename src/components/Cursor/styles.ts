// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getGlobal, getRadius } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Div)(
	props => css`
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
