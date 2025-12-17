// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Aside,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
} from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Aside)(
	props => css`
		position: fixed;
		inset: 0 0 auto auto;
		width: calc((8.333vw * 8) - 0.6rem);
		z-index: 100;
		background: ${getBrand('bc3')};
		border-radius: ${getRadius('s')} 0 0 ${getRadius('s')};
		overflow: hidden;
		height: 100dvh;
		visibility: hidden;
	`
);

export const Content = styled.div(
	props => css`
		width: 100%;
		height: auto;
		min-height: 100%;
	`
);

export const BackgroundOverlay = styled.aside<{ $isProfileOpen: boolean }>(
	props => css`
		position: fixed;
		inset: 0;
		background: ${getGlobal('black', 60)};
		z-index: 98;

		display: ${props.$isProfileOpen ? 'block' : 'none'};
		pointer-events: ${props.$isProfileOpen ? 'auto' : 'none'};
	`
);
