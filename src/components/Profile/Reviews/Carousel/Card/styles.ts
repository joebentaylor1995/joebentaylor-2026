// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Div,
	Article,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
} from '@tackl';
import { bodyM, captionL, bodyL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Article)(
	props => css`
		display: flex;
		flex-flow: column;
		align-items: flex-start;
		justify-content: space-between;
		gap: ${getGap('m')};

		padding: ${getGap('xl')};
		width: 28.9vw; // 4 Columns + 3 Gaps (CBA to work out)
		aspect-ratio: 5/6;

		background: ${getBrand('bc3')};
		border-radius: ${getRadius('s')};

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
	props => css`
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
	props => css`
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
