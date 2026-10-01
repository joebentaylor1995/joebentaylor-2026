// Imports
// ------------

import { bp, Div, getEase, getGap, getGlobal } from '@tackl';
import { captionL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface JacketInterface {
	$hasAnimation?: boolean;
	$hasRotation?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<JacketInterface>(
	({ $hasRotation, $hasAnimation }) => css`
		--gap: ${getGap('s')};

		opacity: ${$hasAnimation ? 0 : 1};
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

			${
				$hasRotation &&
				css`
				animation: spin 3s ${getEase('bezzy3')} infinite;
			`
			}

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
