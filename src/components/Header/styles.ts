// Imports
// ------------
import { bp, Header, getGap } from '@tackl';
import {} from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Header)(
	props => css`
		position: fixed;
		z-index: 999;
		inset: 0 0 auto 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: ${getGap('m')};

		${bp.m`
			padding: ${getGap('l')};
		`}

		${bp.l`
			padding: ${getGap('xl')};
		`}
	`
);
