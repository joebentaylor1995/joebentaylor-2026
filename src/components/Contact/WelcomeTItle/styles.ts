// Imports
// ------------
import styled, { css } from 'styled-components';
import { displayL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {}

// Exports
// ------------
export const Jacket = styled.h3<StylesInterface>(
	({}) => css`
		${displayL}
	`
);
