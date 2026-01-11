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
const StarHeading = ({
	text,
	semantic,
	passedRef,
	iconOverride,
	hasRotation = true,
}: I.StarHeadingProps) => {
	const HeadingTag = semantic || 'span';

	return (
		<S.Jacket
			ref={passedRef}
			$hasRotation={hasRotation}
			$hasAnimation={passedRef ? true : false}
			className='star-heading'
		>
			<Icon type={iconOverride ?? 'star'} />
			<HeadingTag>{text}</HeadingTag>
		</S.Jacket>
	);
};

// Exports
// ------------
StarHeading.displayName = 'StarHeading';
export default StarHeading;
