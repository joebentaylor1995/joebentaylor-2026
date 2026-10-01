// Imports
// ------------

import { getGap, getGlobal } from '@tackl';
import { bodyM } from '@tackl/type';
import Link from 'next/link';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Link)(
	_props => css`
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: ${getGap('s')};

		color: ${getGlobal('white')};
		font-size: 2.4rem;
		line-height: 1.32;

		svg {
			--size: 1.8rem;

			width: var(--size);
			height: var(--size);
			fill: ${getGlobal('white')};
		}

		span {
			${bodyM}
			color: ${getGlobal('white')};
		}
	`
);
