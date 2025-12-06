// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Aside, getBrand, getGlobal, getEase, getGap } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Aside)(
	props => css`
		position: fixed;
		inset: 0;
		z-index: 10000;
		background: ${getGlobal('white')};
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100dvh;
		width: 100dvw;
	`
);
