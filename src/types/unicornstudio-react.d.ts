declare module 'unicornstudio-react/next' {
	import { ComponentType } from 'react';

	interface UnicornSceneProps {
		projectId?: string;
		filePath?: string;
		width?: string | number;
		height?: string | number;
		scale?: number;
		dpi?: number | number[];
		fps?: number;
		altText?: string;
		ariaLabel?: string;
		lazy?: boolean;
		lazyLoad?: boolean;
		production?: boolean;
		className?: string;
		style?: React.CSSProperties;
		onLoad?: () => void;
		onError?: (error: Error) => void;
	}

	const UnicornScene: ComponentType<UnicornSceneProps>;
	export default UnicornScene;
}

