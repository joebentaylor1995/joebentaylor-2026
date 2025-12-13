// Imports
// ------------
import { bp, Header, getGap, Div } from '@tackl';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Header)(
	props => css`
		position: fixed;
		z-index: 100;
		inset: 0 0 auto 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: ${getGap('m')};

		${bp.m`
			padding-block: ${getGap('l')};
		`}

		${bp.l`
			padding-block: ${getGap('xl')};
		`}
	`
);

export const Col = styled(Div)<{ $isRight?: boolean }>(props => css``);

export const LogoWrapper = styled.div(
	props => css`
		position: relative; /* Needed for magnetic transform */
		display: inline-block; /* Keep logo inline but allow transforms */
	`
);

export const Hamburger = styled.div(
	props => css`
		display: flex;
		justify-content: flex-end;

		${bp.m` display: none; `}
	`
);
