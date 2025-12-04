declare module 'lenis/react' {
	import { ComponentType, RefObject } from 'react';
	import Lenis from 'lenis';

	export interface LenisRef {
		wrapper?: HTMLElement;
		content?: HTMLElement;
		lenis?: Lenis;
	}

	export interface ReactLenisProps {
		root?: boolean;
		options?: ConstructorParameters<typeof Lenis>[0];
		autoRaf?: boolean;
		rafPriority?: number;
		className?: string;
		children?: React.ReactNode;
		ref?: RefObject<LenisRef | null>;
	}

	export const ReactLenis: ComponentType<ReactLenisProps>;
	export function useLenis(callback?: (lenis: Lenis) => void, deps?: unknown[]): Lenis | undefined;
}

