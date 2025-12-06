'use client';

// Imports
// ------------
import Lenis from 'lenis';
import { createContext, useRef, useState, useMemo, useEffect } from 'react';
import { PerformanceProvider } from './Performance';

// Context Type Definition
// ------------
export interface GlobalContextType {
	lenis: React.RefObject<Lenis | null>;
	menuOpen: boolean;
	setMenuOpen: (value: boolean) => void;
	imagesLoaded: boolean;
	setImagesLoaded: (value: boolean) => void;
	componentsLoaded: boolean;
	setComponentsLoaded: (value: boolean) => void;
	pageLoaded: boolean;
	unicornSceneLoaded: boolean;
	setUnicornSceneLoaded: (value: boolean) => void;
	requiresUnicornScene: boolean;
	setRequiresUnicornScene: (value: boolean) => void;
	setPageLoaded: (value: boolean) => void;
	loaderFinished: boolean;
	setLoaderFinished: (value: boolean) => void;
}

// Context Definition
// ------------
export const GlobalContext = createContext<GlobalContextType>({
	lenis: { current: null } as React.RefObject<Lenis | null>,
	menuOpen: false,
	setMenuOpen: () => {},
	imagesLoaded: false,
	setImagesLoaded: () => {},
	componentsLoaded: false,
	setComponentsLoaded: () => {},
	unicornSceneLoaded: false,
	setUnicornSceneLoaded: () => {},
	requiresUnicornScene: false,
	setRequiresUnicornScene: () => {},
	pageLoaded: false,
	setPageLoaded: () => {},
	loaderFinished: false,
	setLoaderFinished: () => {},
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
	const [pageLoaded, setPageLoaded] = useState<boolean>(false);
	const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
	const [componentsLoaded, setComponentsLoaded] = useState<boolean>(false);
	const [unicornSceneLoaded, setUnicornSceneLoaded] =
		useState<boolean>(false);
	const [requiresUnicornScene, setRequiresUnicornScene] =
		useState<boolean>(false);
	const [loaderFinished, setLoaderFinished] = useState<boolean>(false);

	// Memoize context value to prevent unnecessary re-renders
	// Only recreate when actual state values change
	const contextValue = useMemo(
		() => ({
			lenis,
			menuOpen,
			setMenuOpen,
			imagesLoaded,
			setImagesLoaded,
			componentsLoaded,
			setComponentsLoaded,
			pageLoaded,
			setPageLoaded,
			unicornSceneLoaded,
			setUnicornSceneLoaded,
			requiresUnicornScene,
			setRequiresUnicornScene,
			loaderFinished,
			setLoaderFinished,
		}),
		[
			menuOpen,
			pageLoaded,
			imagesLoaded,
			componentsLoaded,
			unicornSceneLoaded,
			requiresUnicornScene,
			loaderFinished,
			// lenis ref is stable, setState functions are stable, so they don't need to be in deps
		]
	);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		// If page requires unicorn scene, wait for all three
		// Otherwise, only wait for components and images
		const unicornReady = requiresUnicornScene ? unicornSceneLoaded : true; // If not required, consider it "ready"

		if (componentsLoaded && imagesLoaded && unicornReady) {
			timer = setTimeout(() => {
				setPageLoaded(true);
			}, 1000);
		}

		return () => clearTimeout(timer);
	}, [
		componentsLoaded,
		imagesLoaded,
		unicornSceneLoaded,
		requiresUnicornScene,
	]);

	return (
		<GlobalContext.Provider value={contextValue}>
			<PerformanceProvider>{children}</PerformanceProvider>
		</GlobalContext.Provider>
	);
};

// Exports
// ------------
export default Contexts;
