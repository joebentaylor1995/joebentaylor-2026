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
const ActionButton = ({ isDisabled, onClick }: I.ActionButtonProps) => {
	return (
		<S.Jacket data-interactive data-hover>
			<S.Content disabled={isDisabled} onClick={onClick}>
				<Icon type='arrow-up' />
			</S.Content>
		</S.Jacket>
	);
};

// Exports
// ------------
ActionButton.displayName = 'ActionButton';
export default ActionButton;
