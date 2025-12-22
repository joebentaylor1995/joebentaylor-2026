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
	getRadius,
} from '@tackl';
import { bodyL, bodyM } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Div)<{ $cssAreaName: string }>(
	props => css`
		position: relative;
		grid-area: ${props.$cssAreaName};
		overflow: hidden;

		padding-top: ${getGap('xl')};
		border: 1px solid ${getBrand('bc3')};
		border-radius: ${getRadius('s')};
	`
);

export const Texts = styled(Div)<{ $isLast: boolean }>(
	props => css`
		position: relative;
		display: flex;
		flex-direction: ${props.$isLast ? 'row' : 'column'};
		justify-content: ${props.$isLast ? 'space-between' : 'flex-start'};
		align-items: flex-start;
		gap: ${getGap('s')};

		padding: ${getGap('xl')};

		h2 {
			${bodyL}
			color: ${getGlobal('white')};
		}

		p {
			--padCalc: calc(${getGap('xl')} + ${getGap('xs')});

			${bodyM}
			color: ${getGlobal('white', 40)};
			width: 100%;
			max-width: ${props.$isLast ? '50%' : '100%'};
			padding-left: ${props.$isLast ? `var(--padCalc)` : '0'};
		}
	`
);
