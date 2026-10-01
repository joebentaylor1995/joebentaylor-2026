// Imports
// ------------

import { bp, Div, getBrand, getGap, getGlobal, getRadius } from '@tackl';
import { bodyL, bodyM, captionL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'article' })(
	_props => css`
		display: flex;
		flex-flow: column;
		align-items: flex-start;
		justify-content: space-between;
		gap: ${getGap('sm')};
		padding: ${getGap('m')};
		width: calc(100vw - 2 * ${getGap('m')});

		aspect-ratio: 5/6;

		background: ${getBrand('bc3')};
		border-radius: ${getRadius('s')};

		${bp.l`
            gap: ${getGap('m')};
            padding: ${getGap('xl')};
            width: 28.9vw; // 4 Columns + 3 Gaps (CBA to work out)
        `}

		header {
			blockquote {
				p {
					${bodyL}
				}
			}
		}

		footer {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: ${getGap('sm')};
		}
	`
);

export const Pics = styled(Div)(
	_props => css`
		position: relative;
		width: var(--size);
		height: var(--size);

		picture {
			display: block;
			width: 100%;
			height: 100%;
			border-radius: ${getRadius('round')};

			&:first-child {
				--size: 4.8rem;

				width: var(--size);
				height: var(--size);
			}

			&:last-child {
				--size: 1.8rem;

				position: absolute;
				bottom: 0;
				right: 0;
				width: var(--size);
				height: var(--size);
				outline: 2px solid ${getBrand('bc3')};
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				user-select: none;
				pointer-events: none;

				border-radius: ${getRadius('round')};
			}
		}
	`
);

export const Texts = styled(Div)(
	_props => css`
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: ${getGap('xs')};

		h4 {
			${bodyM}
			color: ${getGlobal('white', 40)};
		}

		p {
			${captionL}
		}
	`
);
