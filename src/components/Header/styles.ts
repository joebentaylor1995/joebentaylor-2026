// Imports
// ------------
import { bp, Div, getGap } from '@tackl';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'header' })(
	_props => css`
		position: fixed;
		z-index: 100;
		inset: 0 0 auto 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: ${getGap('m')};

		/* Hide initially - GSAP will animate in */
		opacity: 0;
		visibility: hidden;

		${bp.m`
			padding-block: ${getGap('l')};
		`}

		${bp.l`
			padding-block: ${getGap('xl')};
		`}
	`
);

export const Col = styled(Div)<{ $isRight?: boolean }>(_props => css``);

export const LogoWrapper = styled.div(
	_props => css`
		position: relative; /* Needed for magnetic transform */
		display: inline-block; /* Keep logo inline but allow transforms */
	`
);

export const Hamburger = styled.div(
	_props => css`
		display: flex;
		justify-content: flex-end;

		${bp.m` display: none; `}
	`
);
