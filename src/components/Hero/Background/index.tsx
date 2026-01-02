'use client';

// Imports
// ------------
import UnicornScene from 'unicornstudio-react/next';
import { use } from 'react';
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

	// Context
	const { setUnicornSceneLoaded, menuOpen, profileOpen } = use(GlobalContext);

	// Handler to set the unicorn scene loaded state
	const handleLoad = () => {
		setUnicornSceneLoaded(true);
	};

	return (
		<S.Jacket $isMenuOpen={menuOpen} $isProfileOpen={profileOpen}>
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
