'use client';

import { GlobalContext } from '@parts/Contexts';
// Imports
// ------------
import { use } from 'react';

// Styles + Interfaces
// ------------
import * as S from './styles';

// Component
// ------------
const Chopsticks = () => {
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
