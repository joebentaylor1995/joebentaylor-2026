// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Div)(
	props => css`
		display: none;

		${bp.l`
          display: block;
          position: fixed;
          inset: 95svh 0 0 0;
          z-index: 999; /* adjust if needed */
          pointer-events: none;
          overflow: hidden;
        `}
	`
);

export const BlurLayer = styled.div<{
	$index: number;
	$blur: number;
	$stops: string[];
}>`
	position: absolute;
	inset: 0;
	z-index: ${({ $index }) => $index + 1};
	backdrop-filter: blur(${({ $blur }) => $blur}px) saturate(140%);
	mask-image: ${({ $stops }) => `
    linear-gradient(to bottom,
      rgba(0, 0, 0, 0) ${$stops[0]},
      rgba(0, 0, 0, 1) ${$stops[1]},
      ${$stops[2] ? `rgba(0, 0, 0, 1) ${$stops[2]},` : ''}
      rgba(0, 0, 0, 0) ${$stops[3] || $stops[2] || $stops[1]}
    )
  `};
	border-radius: ${props => props.theme.br.s};
	pointer-events: none;
`;

export const Content = styled.div`
	position: relative;
	z-index: 0;
	width: 100%;
	height: 100%;
`;
