'use client';

// Imports
// ------------
import Icon from '@parts/Icon';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const StarHeading = ({ text, semantic, passedRef }: I.StarHeadingProps) => {
	const HeadingTag = semantic || 'span';

	return (
		<S.Jacket ref={passedRef}>
			<Icon type='star' />
			<HeadingTag>{text}</HeadingTag>
		</S.Jacket>
	);
};

// Exports
// ------------
StarHeading.displayName = 'StarHeading';
export default StarHeading;
