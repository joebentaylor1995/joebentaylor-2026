'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Chopsticks = ({}: I.ChopsticksProps) => {
	// Context
	const { setMenuOpen, menuOpen } = use(GlobalContext);

	// Event Handlers
	const handleClick = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<S.Jacket $isOpen={menuOpen} onClick={handleClick}>
			<span className='open' />
			<span className='close' />
		</S.Jacket>
	);
};

// Exports
// ------------
Chopsticks.displayName = 'Chopsticks';
export default Chopsticks;
