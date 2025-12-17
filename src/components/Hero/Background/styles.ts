// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getEase, getGap } from '@tackl';
import {} from '@tackl/type';

// Exports
// ------------
export const Jacket = styled(Div)<{
	$isMenuOpen: boolean;
	$isProfileOpen: boolean;
}>(
	props => css`
		--unicorn-width: 100%;
		--unicorn-height: 100%;

		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;

		transform: ${props.$isProfileOpen
			? 'translateX(-25%)'
			: 'translateX(0)'};
		transition: transform 1s ${getEase('bezzy2')};

		&:after {
			${bp.l`
				content: '';
				position: absolute;
				inset: 0 0 0 50%;
				background: linear-gradient(270deg, ${getGlobal('black', 60)} 0%, ${getGlobal('black', 0)} 100%);
			`}
		}

		video {
			--media-object-fit: cover;
			--controls: none;

			opacity: 0.4;
			width: 200%;
			height: 100%;
			object-fit: cover;

			transform: ${props.$isMenuOpen
				? 'translateY(25%)'
				: 'translateY(0)'};
			transition: transform 0.5s ${getEase('bezzy3')};

			${bp.m`
				width: 100%;
			`}
		}
	`
);
