'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const MobileModalClose = ({ onClick, isOpen }: I.MobileModalCloseProps) => (
	<S.Jacket onClick={onClick} $isOpen={isOpen}>
		Close
	</S.Jacket>
);

// Exports
// ------------
MobileModalClose.displayName = 'MobileModalClose';
export default MobileModalClose;
