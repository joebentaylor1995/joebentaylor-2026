// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Div,
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
export const Jacket = styled(Div)(
	props => css`
		cursor: grab;
		width: 100%;
		padding-left: ${getGap('m')};

		${bp.l` padding-left: 0; `}
	`
);

export const Collection = styled(Div)(
	props => css`
		position: relative;

		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
	`
);

export const List = styled.ul(
	props => css`
		flex: none;
		position: relative;

		display: flex;
		flex-flow: row;
		align-items: center;
		justify-content: flex-start;
	`
);

export const ListItem = styled.li(
	props => css`
		flex: none;
		margin-right: ${getGap('s')};

		${bp.l` margin-right: ${getGap('m')}; `}
	`
);
