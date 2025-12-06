// Imports
// ------------
import '@/theme/tackl/waffl/WebComponent';
import Client from './Client';
import Server from './Server';
import type { Viewport, Metadata } from 'next';

// Styles
// ------------
import '@css/global.css';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
};

export const metadata: Metadata = {
	appleWebApp: {
		title: 'JBT',
	},
	icons: {
		icon: [
			{ url: '/icon1.png', sizes: '32x32', type: 'image/png' },
			{ url: '/icon0.svg', type: 'image/svg+xml' },
			{ url: '/favicon.ico', sizes: 'any' },
		],
		apple: [
			{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
		],
	},
	manifest: '/manifest.json',
};

// Component
// ------------
const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Client>
			<Server>{children}</Server>
		</Client>
	);
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
