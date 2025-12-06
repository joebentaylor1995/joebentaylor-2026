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
const Social = ({ url, name, icon }: I.SocialProps) => {
	return (
		<S.Jacket href={url}>
			<Icon type={icon} />
			<span>{name}</span>
		</S.Jacket>
	);
};

// Exports
// ------------
Social.displayName = 'Social';
export default Social;
