'use client';

// Imports
// ------------
import '@parts/AnimationPlugins';
import Contact from '@parts/Contact';
import Contexts, { GlobalContext } from '@parts/Contexts';
import Cursor from '@parts/Cursor';
import GridExposer from '@parts/GridExposer';
import { GlobalStyle, theme } from '@theme';
import StyledComponentsRegistry from '@utils/registry';
import { usePageTitle } from '@utils/usePageTitle';
import { gsap } from 'gsap';
import { ReactLenis, useLenis } from 'lenis/react';
import { use, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

// LenisBridge
// ------------
// NOTE • Publishes the root Lenis instance into GlobalContext (so the
// Profile/Contact drawers can stop/start the page scroll behind them) and
// drives it from the GSAP ticker so scroll and animations stay in sync
const LenisBridge = () => {
	const { lenis } = use(GlobalContext);
	const instance = useLenis();

	useEffect(() => {
		if (!instance) return;

		lenis.current = instance;

		const update = (time: number) => instance.raf(time * 1000);
		gsap.ticker.add(update);

		return () => {
			gsap.ticker.remove(update);
			lenis.current = null;
		};
	}, [instance, lenis]);

	return null;
};

// Component
// ------------
// NOTE • Client-side providers only — the document shell (html/body) and
// server-fetched chrome (Loader, Header) live in layout.tsx, so page
// content stays server-rendered. The page scrolls on window via ReactLenis
// root; the Profile and Contact drawers manage their own nested instances.
const Providers = ({ children }: { children: React.ReactNode }) => {
	// NOTE • Page Title (changes when tab is hidden/visible)
	usePageTitle('✦ 𝗚𝗘𝗧 𝗙𝗥𝗘𝗘 𝗗𝗘𝗦𝗜𝗚𝗡 𝗪𝗢𝗥𝗞!', '𝗧𝗥𝗜𝗖𝗞𝗘𝗗 𝗬𝗔! 😃');

	return (
		<StyledComponentsRegistry>
			<ThemeProvider theme={theme}>
				<GlobalStyle />

				{/* GridExposer only rendered in development environment */}
				{process.env.NODE_ENV === 'development' && <GridExposer />}

				<Contexts>
					<Cursor />

					<ReactLenis root options={{ autoRaf: false }}>
						<LenisBridge />
						{children}
						<Contact />
					</ReactLenis>
				</Contexts>
			</ThemeProvider>
		</StyledComponentsRegistry>
	);
};

// Exports
// ------------
Providers.displayName = 'Providers';
export default Providers;
