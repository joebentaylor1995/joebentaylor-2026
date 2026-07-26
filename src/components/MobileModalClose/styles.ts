// Imports
// ------------

import { bp, getEase, getGap, getGlobal } from '@tackl';
import { bodyM } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface StylesInterface {
	$isOpen?: boolean;
}

// Exports
// ------------
export const Jacket = styled.button<StylesInterface>(
	({ $isOpen }) => css`
		${bodyM}

		--time: 1s;
		--offset: ${getGap('s')};

		user-select: none;
		position: fixed;
		z-index: 101;
		top: var(--offset);
		right: var(--offset);

		padding: var(--offset);
		color: ${getGlobal('white', 40)};
		opacity: ${$isOpen ? 1 : 0};
		pointer-events: ${$isOpen ? 'auto' : 'none'};
		transform: translateX(${$isOpen ? 0 : 100}%);
		transition:
			opacity var(--time) ${getEase('bezzy2')},
			transform var(--time) ${getEase('bezzy3')};

		&:active {
			transform: scale(0.95);
			opacity: 0.5;
		}

		${bp.l` display: none; `}
	`
);
