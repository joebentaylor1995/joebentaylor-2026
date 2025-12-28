// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap } from '@tackl';
import { bodyL } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		/*  */
	`
);

export const Sticky = styled(Div)(
	props => css`
		position: relative;
		margin-bottom: ${getGap('m')};

		${bp.l` margin-bottom: ${getGap('xs')};`}

		> div {
			${bp.m`
				position: sticky;
				top: calc(100% - ${getGap('xl')});
				left: 0;
				
			`}
		}
	`
);

export const Desc = styled(Div)(
	props => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};

		p {
			${bodyL}
			color: ${getGlobal('white', 40)};
			text-wrap: pretty;
		}
	`
);

export const ClientList = styled(Div)(
	props => css`
		margin-top: ${getGap('xl')};

		${bp.l`
            margin-top: ${getGap('uber')};
        `}
	`
);
