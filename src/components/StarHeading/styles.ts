// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getEase, getGap } from '@tackl';
import { captionL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Div)<{ $hasAnimation: boolean }>(
	props => css`
		--gap: ${getGap('s')};

		opacity: ${props.$hasAnimation ? 0 : 1};
		display: flex;
		align-items: center;
		gap: var(--gap);

		svg {
			@keyframes spin {
				to {
					transform: rotate(360deg);
				}
			}

			--size: 1rem;

			width: var(--size);
			height: var(--size);
			fill: ${getGlobal('white')};
			animation: spin 3s ${getEase('bezzy3')} infinite;

			${bp.l`
                --size: 1.2rem;
            `}
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		span {
			${captionL}
			color: ${getGlobal('white')};
		}
	`
);
