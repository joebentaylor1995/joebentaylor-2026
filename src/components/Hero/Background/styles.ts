// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getGlobal, getEase } from '@tackl';

// Interfaces
interface JacketInterface {
	$isMenuOpen?: boolean;
	$isProfileOpen?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<JacketInterface>(
	({ $isMenuOpen, $isProfileOpen }) => css`
		--unicorn-width: 100%;
		--unicorn-height: 100%;

		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;

		transform: translateX(${$isProfileOpen ? -25 : 0}%);
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

			transform: translateY(${$isMenuOpen ? 25 : 0}%);
			transition: transform 0.5s ${getEase('bezzy3')};

			${bp.m`
				width: 100%;
			`}
		}
	`
);
