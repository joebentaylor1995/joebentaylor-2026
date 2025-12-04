// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getEase, getGap } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled.svg(
	props => css`
		--aspect-ratio: 68/24;

		width: auto;
		height: 2.4rem;

		fill: ${getGlobal('white')};
	`
);
