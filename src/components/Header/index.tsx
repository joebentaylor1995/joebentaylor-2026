'use client';

// Imports
// ------------
import Logo from '@parts/Logo';

// Styles
// ------------
import { Jacket } from './styles';

// Interfaces
// ------------
interface HeaderProps {}

// Component
// ------------
const Header = ({}: HeaderProps) => {
	return (
		<Jacket>
			<Logo />
			{/*  */}
			{/*  */}
			{/*  */}
		</Jacket>
	);
};

// Exports
// ------------
Header.displayName = 'Header';
export default Header;
