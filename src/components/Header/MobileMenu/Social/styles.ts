// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Div,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getFont,
	getFontWeight,
} from '@tackl';
import { bodyM } from '@tackl/type';
import Link from 'next/link';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Link)(
	props => css`
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
