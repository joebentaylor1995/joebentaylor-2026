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
	Aside,
	getRadius,
} from '@tackl';
import { bodyM } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

// Exports
// ------------
export const Jacket = styled(Aside)(
	props => css`
		--offset: ${getGap('m')};

		position: fixed;
		inset: auto var(--offset) var(--offset) var(--offset);

		height: 6rem;

		${bp.l`
			--offset: ${getGap('xl')};
		`}

		&:before {
			content: '';
			position: absolute;
			z-index: -1;
			inset: 50% 2.4rem 0 2.4rem;

			border-radius: ${getRadius('round')};
			background: ${getGlobal('black', 20)};
			filter: blur(2.4rem);
		}

		input {
			${bodyM}

			width: 100%;
			height: 100%;
			padding-inline: ${getGap('m')};

			color: ${getGlobal('white')};
			background: ${getBrand('bc3')};
			border: 1px solid ${getGlobal('white', 5)};
			border-radius: ${getRadius('round')};

			&::placeholder {
				color: ${getGlobal('white', 40)};
			}
		}
	`
);

export const RadioGroup = styled.div(
	props => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('s')};
		width: 100%;
	`
);

export const RadioOption = styled.div(
	props => css`
		display: flex;
		align-items: center;
		gap: ${getGap('s')};

		input[type='radio'] {
			width: 1.6rem;
			height: 1.6rem;
			cursor: pointer;
			accent-color: ${getGlobal('white')};
		}

		label {
			${bodyM}
			color: ${getGlobal('white')};
			cursor: pointer;
			user-select: none;
		}
	`
);
