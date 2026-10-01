// Imports
// ------------
import type { SocialProps } from '@parts/Header/MobileMenu/Social/interface';
import type { LoaderProps } from '@parts/Loader/interface';

// Exports
// ------------
// NOTE • Shape of the GET_GLOBAL payload consumed by the app shell
export interface GlobalData {
	loader?: {
		largeImages?: LoaderProps['images'];
	};
	allSocialMediaLinks?: SocialProps[];
}

// NOTE • Shape of the GET_HOME payload — CMS blocks stay loosely typed;
// component interfaces narrow them at the point of use
export interface HomeData {
	// biome-ignore-start lint/suspicious/noExplicitAny: CMS payload blocks are validated by component prop interfaces
	home?: any;
	profile?: any;
	skills?: any;
	services?: any;
	clients?: any;
	awards?: any;
	reviews?: any;
	// biome-ignore-end lint/suspicious/noExplicitAny: CMS payload blocks are validated by component prop interfaces
}
