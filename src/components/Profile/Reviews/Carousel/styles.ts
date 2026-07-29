// Imports
// ------------

import { bp, Div, getGap } from '@tackl';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Div)(
	_props => css`
		cursor: grab;
		width: 100%;
		padding-left: ${getGap('m')};

		${bp.l` padding-left: 0; `}
	`
);

export const Collection = styled(Div)(
	_props => css`
		position: relative;

		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
	`
);

export const List = styled.ul(
	_props => css`
		flex: none;
		position: relative;

		display: flex;
		flex-flow: row;
		align-items: center;
		justify-content: flex-start;
	`
);

export const ListItem = styled.li(
	_props => css`
		flex: none;
		margin-right: ${getGap('s')};

		${bp.l` margin-right: ${getGap('m')}; `}
	`
);
