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
	type?: React.HTMLInputTypeAttribute;
	disabled?: boolean;
	$isFinished?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Aside)<StylesInterface>(
	({ $isFinished }) => css`
		--offset: ${getGap('m')};
		--speed: 0.5s;

		position: fixed;
		inset: auto var(--offset) var(--offset) var(--offset);
		transform: translateY(${$isFinished ? 200 : 0}%);

		display: flex;
		align-items: center;
		gap: ${getGap('m')};
		height: 6rem;
		transition: transform var(--speed) ${getEase('bezzy2')};

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
	`
);

export const Input = styled.input<StylesInterface>(
	({}) => css`
		${bodyM}

		flex: 1;
		height: 100%;
		padding-inline: ${getGap('m')};

		color: ${getGlobal('white')};
		background: ${getBrand('bc3')};
		border: 1px solid ${getGlobal('white', 5)};
		border-radius: ${getRadius('round')};

		&::placeholder {
			color: ${getGlobal('white', 40)};
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	`
);

export const RadioGroup = styled.div<StylesInterface>(
	({}) => css`
		position: absolute;
		bottom: 100%;
		right: 0;
		margin-bottom: ${getGap('s')};

		display: flex;
		align-items: center;
		gap: ${getGap('xs')};
		flex-shrink: 0;
	`
);

export const ResetButton = styled.button<StylesInterface>(
	({ $isFinished }) => css`
		--size: 6rem;
		--offset: ${getGap('m')};
		--speed: 0.5s;

		${bodyM}

		position: fixed;
		bottom: var(--offset);
		left: 50%;
		transform: translateX(-50%) translateY(${$isFinished ? 0 : 200}%);

		display: grid;
		place-items: center;

		width: var(--size);
		height: var(--size);

		background: ${getBrand('bc3')};
		border: 1px solid ${getGlobal('white', 5)};
		border-radius: ${getRadius('round')};

		cursor: pointer;
		transition:
			transform var(--speed) ${getEase('bezzy2')},
			background var(--speed) ${getEase('bezzy2')};

		${bp.l`
			--offset: ${getGap('xl')};
		`}

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background: ${getGlobal('white', 10)};
			}
		}

		svg {
			--size: 1.8rem;

			width: var(--size);
			height: var(--size);

			fill: none;
			stroke: ${getGlobal('white')};
		}
	`
);
