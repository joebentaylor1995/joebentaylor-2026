// Imports
// ------
import { breakpointUp as bp } from '@/theme/tackl/breakpoints';
import { theme } from '@theme';
import { css } from 'styled-components';
import { getFont, getFontWeight } from '@tackl';

export const displayL: ReturnType<typeof css> = css`
	font-family: ${getFont('body')};
	font-weight: ${getFontWeight('light')};

	display: block;
	font-style: normal;
	font-size: 7.2rem;
	line-height: 1.12;
	letter-spacing: 2px;

	${bp.l`
		font-size: 12rem;
	`}
`;

export const titleL: ReturnType<typeof css> = css`
	font-family: ${getFont('body')};
	font-weight: ${getFontWeight('regular')};

	font-size: 3.2rem;
	line-height: 1.32;

	${bp.l` font-size: 4.8rem; `}
`;

const sharedBodyStyles: ReturnType<typeof css> = css`
	font-family: ${getFont('body')};
	font-weight: ${getFontWeight('regular')};

	display: block;
	font-style: normal;
	line-height: 1.32;
`;

export const bodyL: ReturnType<typeof css> = css`
	${sharedBodyStyles}
	font-size: 2.2rem;

	${bp.sm` font-size: 2.4rem; `}
	${bp.l` font-size: 2.6rem; `}
`;

export const bodyM: ReturnType<typeof css> = css`
	${sharedBodyStyles}

	font-size: 1.6rem;
	letter-spacing: 0.5px;

	${bp.sm` font-size: 1.7rem; `}
	${bp.l` font-size: 1.8rem; `}
`;

export const bodyS: ReturnType<typeof css> = css`
	${sharedBodyStyles}

	font-size: 1.2rem;
	letter-spacing: 0.5px;

	${bp.sm` font-size: 1.3rem; `}
	${bp.l` font-size: 1.4rem; `}
`;

export const captionL: ReturnType<typeof css> = css`
	font-family: ${getFont('heading')};
	font-weight: ${getFontWeight('regular')};

	display: block;
	font-style: normal;
	font-size: 0.8rem;
	line-height: 1.2;
	letter-spacing: 1px;
	text-transform: uppercase;

	${bp.sm` font-size: 0.9rem; `}
	${bp.l` font-size: 1rem; `}
`;

export const captionS: ReturnType<typeof css> = css`
	font-family: ${getFont('body')};
	font-weight: ${getFontWeight('regular')};

	display: block;
	font-style: normal;
	font-size: 0.8rem;
	line-height: 1.2;
	letter-spacing: 0.2px;

	${bp.sm` font-size: 0.9rem; `}
	${bp.l` font-size: 1rem; `}
`;
