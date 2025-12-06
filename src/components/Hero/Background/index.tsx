'use client';

// Imports
// ------------
import UnicornScene from 'unicornstudio-react/next';
import { useCallback, useRef } from 'react';
import { useResponsive } from '@utils/useResponsive';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Background = ({ setShouldAnimate }: I.BackgroundProps) => {
	// Responsive Breakpoints
	const { isMobile } = useResponsive();
	const hasLoadedRef = useRef(false);

	const handleLoad = useCallback(() => {
		if (hasLoadedRef.current) return; // Prevent double-triggering
		hasLoadedRef.current = true;

		console.log('Scene loaded successfully!');
		// Trigger animations when scene loads
		// Add small delay to ensure text split is ready
		setTimeout(() => setShouldAnimate(true), 500);
	}, [setShouldAnimate]);

	return (
		<S.Jacket>
			{isMobile ? (
				<video
					src='/video.mp4'
					autoPlay
					muted
					loop
					playsInline
					onCanPlay={e => {
						// Use onCanPlay for better Safari compatibility
						// e.currentTarget.playbackRate = 0.5;
						handleLoad();
					}}
				/>
			) : (
				<UnicornScene
					jsonFilePath='/scene.json'
					dpi={1.5}
					fps={120}
					lazyLoad={false}
					production={true}
					onLoad={handleLoad}
					ariaLabel='Animated background scene'
					altText='Interactive 3D scene'
				/>
			)}
		</S.Jacket>
	);
};

// Exports
// ------------
Background.displayName = 'Background';
export default Background;
