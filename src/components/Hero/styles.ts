// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Section,
	Div,
	P,
	Footer,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
} from '@tackl';
import { bodyL, bodyS } from '@tackl/type';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		width: 100%;
		height: 100dvh;

		waffl-grid {
			align-items: center;
			height: 100%;
		}
	`
);

export const Background = styled.div(
	props => css`
		--unicorn-width: 100%;
		--unicorn-height: 100%;

		position: fixed;
		inset: 0;
		z-index: -1;

		&:after {
			${bp.l`
        content: '';
        position: absolute;
        inset: 0 0 0 50%;
        background: linear-gradient(270deg, ${getGlobal('black', 60)} 0%, ${getGlobal('black', 0)} 100%);
      `}
		}
	`
);

export const Texts = styled(Div)(
	props => css`
		position: relative;
		display: flex;
		flex-direction: column;
		gap: ${getGap('sm')};
	`
);

export const Text = styled(P)(
	props => css`
		${bodyL}
		color: ${getGlobal('white')};
	`
);

export const CenterContent = styled(Div)(
	props => css`
		position: relative;
		height: 100%;
	`
);

export const BottomContent = styled(Footer)(
	props => css`
		--offset: ${getGap('m')};

		position: absolute;
		inset: auto 0 var(--offset) 0;

		${bp.m`
      --offset: ${getGap('l')};
    `}

		${bp.l`
      --offset: ${getGap('xl')};
    `}

    waffl-grid {
			align-items: flex-end;
		}
	`
);

export const Copyright = styled(Div)(
	props => css`
		${bodyS}
		color: ${getGlobal('white', 40)};

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: ${getGap('sm')};

		hr {
			flex: 1;
			height: 1px;
			background-color: ${getGlobal('white', 10)};
			border: none;
		}
	`
);

export const VideoPreview = styled(Div)(
	props => css`
		width: 14.4rem;
		aspect-ratio: 3/4;
		height: 100%;
		position: relative;
		overflow: hidden;
		border-radius: ${getRadius('s')};

		mux-player {
			--media-object-fit: cover;
			--controls: none;

			width: 100%;
			height: 100%;
		}
	`
);
