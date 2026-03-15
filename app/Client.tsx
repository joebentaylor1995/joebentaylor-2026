'use client';

// Imports
// ------------
import '@parts/AnimationPlugins';
import Contact from '@parts/Contact';
import Contexts from '@parts/Contexts';
import Cursor from '@parts/Cursor';
// import CookieBar from '@parts/CookieBar';
import GridExposer from '@parts/GridExposer';
import { GlobalStyle, theme } from '@theme';
import { ppNeueMontreal, sequel } from '@theme/fonts';
import StyledComponentsRegistry from '@utils/registry';
import { usePageTitle } from '@utils/usePageTitle';
import { ViewTransitions } from '@utils/viewTransitions';
import { gsap } from 'gsap';
import { type LenisRef, ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';

// Component
// ------------
const Client = ({ children }: { children: React.ReactNode }) => {
	// NOTE • Lenis Setup
	const lenisRef = useRef<LenisRef>(null);

	// NOTE • Page Title (changes when tab is hidden/visible)
	usePageTitle('✦ 𝗚𝗘𝗧 𝗙𝗥𝗘𝗘 𝗗𝗘𝗦𝗜𝗚𝗡 𝗪𝗢𝗥𝗞!', '𝗧𝗥𝗜𝗖𝗞𝗘𝗗 𝗬𝗔! 😃');

	// NOTE •   Lenis + GSAP
	useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(time * 1000);
		}

		gsap.ticker.add(update);

		return () => gsap.ticker.remove(update);
	}, []);

	return (
		<ViewTransitions>
			<html lang='en' suppressHydrationWarning>
				<body className={`${sequel.variable} ${ppNeueMontreal.variable}`}>
					<StyledComponentsRegistry>
						<ThemeProvider theme={theme} key='themeprovider'>
							<GlobalStyle />

							{/* GridExposer only rendered in development environment */}
							{process.env.NODE_ENV === 'development' && <GridExposer />}

							{/* CookieBar only rendered in production environment */}
							{/* {process.env.NODE_ENV === 'production' && (
								<CookieBar />
							)} */}

							<Contexts>
								<Cursor />

								<ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
									{children}
									<Contact />
								</ReactLenis>
							</Contexts>
						</ThemeProvider>
					</StyledComponentsRegistry>
				</body>
			</html>
		</ViewTransitions>
	);
};

// Exports
// ------------
Client.displayName = 'Client';
export default Client;
