// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getRadius, getGap, Form } from '@tackl';
import { bodyM } from '@tackl/type';

// Interface
// ------------
interface StylesInterface {}

// Exports
// ------------
export const Jacket = styled(Form)<StylesInterface>(
	({}) => css`
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};
		cursor:
			url('/close-cursor.svg') 12 12,
			auto;
	`
);

const sharedStyles = css`
	border-radius: 2.4rem;
	padding: ${getGap('s')} ${getGap('m')};
	width: max-content;
	max-width: 36rem;
`;

export const Statement = styled.p<StylesInterface>(
	({}) => css`
		${bodyM}
		${sharedStyles}
		color: ${getGlobal('white')};
		margin: 0;
		background: ${getGlobal('white', 10)};
		border-bottom-left-radius: 0;
	`
);

export const Question = styled.p<StylesInterface>(
	({}) => css`
		${bodyM}
		${sharedStyles}
		color: ${getGlobal('white')};
		margin: 0;
		background: ${getGlobal('white', 10)};
		border-top-left-radius: 0;
	`
);

export const Answer = styled.p<StylesInterface>(
	({}) => css`
		${bodyM}
		${sharedStyles}
		align-self: flex-end;
		color: ${getGlobal('white')};
		margin: 0;
		text-align: right;

		background: linear-gradient(
			to bottom,
			${getBrand('bc1')},
			${getBrand('bc1', 60)}
		);
		border-bottom-right-radius: 0;
	`
);

export const Chatlog = styled.div<StylesInterface>(
	({}) => css`
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-bottom: calc(6rem + ${getGap('xl')});
		gap: ${getGap('m')};
		flex: 1;
		overflow-y: scroll;
	`
);

export const Robot = styled.div<StylesInterface>(
	({}) => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('xs')};
		align-self: flex-start;
		width: 50%;
	`
);

export const User = styled.div<StylesInterface>(
	({}) => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('s')};
		align-self: flex-end;
		width: 50%;
	`
);
