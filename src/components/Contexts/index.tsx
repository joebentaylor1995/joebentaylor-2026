'use client';

// Imports
// ------------
import Lenis from 'lenis';
import { createContext, useRef, useState } from 'react';
import { PerformanceProvider } from './Performance';

// Context Type Definition
// ------------
export interface GlobalContextType {
	lenis: React.RefObject<Lenis | null>;
	menuOpen: boolean;
	setMenuOpen: (value: boolean) => void;
}

// Context Definition
// ------------
export const GlobalContext = createContext<GlobalContextType>({
	lenis: { current: null } as React.RefObject<Lenis | null>,
	menuOpen: false,
	setMenuOpen: () => {},
});

// Component
// ------------
/**
 * Global context provider component that manages shared application state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the context
 */
const Contexts = ({ children }: { children: React.ReactNode }) => {
	// Create a stable reference for the lenis smooth scroll instance
	const lenis = useRef<Lenis | null>(null);

	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const contextValue = {
		lenis,
		menuOpen,
		setMenuOpen,
	};

	return (
		<GlobalContext.Provider value={contextValue}>
			<PerformanceProvider>{children}</PerformanceProvider>
		</GlobalContext.Provider>
	);
};

// Exports
// ------------
export default Contexts;
