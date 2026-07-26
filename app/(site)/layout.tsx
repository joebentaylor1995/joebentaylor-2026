// Imports
// ------------
import { fetchContent, GET_GLOBAL } from '@cms';
import Header from '@parts/Header';
import Loader from '@parts/Loader';
import { ppNeueMontreal, sequel } from '@theme/fonts';
import { ViewTransitions } from '@utils/viewTransitions';
import type { Metadata, Viewport } from 'next';
import { siteUrl } from '@/config';
import type { GlobalData } from '@/types/home';
import Providers from './Providers';

// Styles
// ------------
import '@css/global.css';

// SEO
// ------------
// NOTE • Site-wide defaults — override per route with `metadata` or `generateMetadata`
export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: 'Joe Ben Taylor',
		template: '%s — Joe Ben Taylor',
	},
	description:
		'Web designer and developer based in Doncaster, United Kingdom — building modern, performant websites with Next.js, React and cutting-edge animation.',
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: 'website',
		siteName: 'Joe Ben Taylor',
	},
	appleWebApp: {
		title: 'JBT',
	},
	manifest: '/manifest.json',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	themeColor: '#121212',
};

// Data fetching at build time
// ------------
// NOTE • fetchContent returns null (never throws) when the CMS is missing
// or unconfigured, so the shell can't crash the route
async function getGlobalData() {
	return await fetchContent<GlobalData>(GET_GLOBAL);
}

// Component
// ------------
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const data = await getGlobalData();

	return (
		<ViewTransitions>
			<html lang='en' className={`${sequel.variable} ${ppNeueMontreal.variable}`} suppressHydrationWarning>
				<body>
					<Providers>
						<Loader images={data?.loader?.largeImages} />
						<Header socials={data?.allSocialMediaLinks} />
						{children}
					</Providers>
				</body>
			</html>
		</ViewTransitions>
	);
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
