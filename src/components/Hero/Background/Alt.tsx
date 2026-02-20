'use client';

// Imports
// ------------
import UnicornScene from 'unicornstudio-react/next';
import { use, useRef, useEffect } from 'react';
import { useResponsive } from '@utils/useResponsive';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Background = ({}: I.BackgroundProps) => {
	// Responsive Breakpoints
	const { isMobile } = useResponsive();

	const videoRef = useRef<HTMLVideoElement>(null);

	// Context
	const {
		setUnicornSceneLoaded,
		menuOpen,
		profileOpen,
		contactOpen,
		loaderFinishing,
		loaderFinished,
	} = use(GlobalContext);

	// Handler to set the unicorn scene loaded state
	const handleLoad = () => {
		setUnicornSceneLoaded(true);
	};

	useEffect(() => {
		if (!videoRef.current) return;

		let timer: NodeJS.Timeout | undefined;

		if (loaderFinishing) {
			timer = setTimeout(() => {
				videoRef.current?.play();
			}, 500);
		}

		return () => clearTimeout(timer);
	}, [loaderFinishing]);

	return (
		<S.Jacket
			$isMenuOpen={menuOpen}
			$isModalOpen={profileOpen || contactOpen}
		>
			{isMobile ? (
				<video
					src='/video.mp4'
					autoPlay
					muted
					loop
					playsInline
					onCanPlay={handleLoad}
				/>
			) : (
				// <UnicornScene
				// 	jsonFilePath='/scene.json'
				// 	dpi={1.5}
				// 	fps={120}
				// 	lazyLoad={false}
				// 	production={true}
				// 	onLoad={handleLoad}
				// 	ariaLabel='Animated background scene'
				// 	altText='Interactive 3D scene'
				// />
				<video
					ref={videoRef}
					src='/new-video-test.mp4'
					preload='auto'
					muted
					playsInline
				/>
			)}
		</S.Jacket>
	);
};

// Exports
// ------------
Background.displayName = 'Background';
export default Background;
