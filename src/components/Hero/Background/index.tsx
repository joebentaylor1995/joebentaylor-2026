'use client';

import { GlobalContext } from '@parts/Contexts';
import { useResponsive } from '@utils/useResponsive';
import { use } from 'react';
// Imports
// ------------
import UnicornScene from 'unicornstudio-react/next';

// Styles + Interfaces
// ------------
import * as S from './styles';

// Component
// ------------
const Background = () => {
	// Responsive Breakpoints
	const { isMobile } = useResponsive();

	// Context
	const { setUnicornSceneLoaded, menuOpen, profileOpen, contactOpen } = use(GlobalContext);

	// Handler to set the unicorn scene loaded state
	const handleLoad = () => {
		setUnicornSceneLoaded(true);
	};

	return (
		<S.Jacket $isMenuOpen={menuOpen} $isModalOpen={profileOpen || contactOpen}>
			{isMobile ? (
				<video src='/video.mp4' autoPlay muted loop playsInline onCanPlay={handleLoad} />
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
