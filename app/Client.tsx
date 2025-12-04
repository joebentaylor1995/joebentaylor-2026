'use client';

// Imports
// ------------
import AnimationPlugins from '@parts/AnimationPlugins';
import Contexts from '@parts/Contexts';
import CookieBar from '@parts/CookieBar';
import GridExposer from '@parts/GridExposer';
import { GlobalStyle, theme } from '@theme';
import { sequel, ppNeueMontreal } from '@theme/fonts';
import StyledComponentsRegistry from '@utils/registry';
import { ViewTransitions } from '@utils/viewTransitions';
import { gsap } from 'gsap';
import type { LenisRef } from 'lenis/react';
import { ReactLenis } from 'lenis/react';
import Cursor from '@parts/Cursor';
import { useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';

// Component
// ------------
const Client = ({ children }: { children: React.ReactNode }) => {
	// NOTE • Font Classes
	const classes = `${sequel.variable} ${ppNeueMontreal.variable}`;

	// NOTE • Lenis Setup
	const lenisRef = useRef<LenisRef>(null);

	// NOTE •   Lenis + GSAP
	useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(time * 1000);
		}

		gsap.ticker.add(update);

		return () => gsap.ticker.remove(update);
	}, []);

	return (
		<ViewTransitions>
			<html lang='en' className={classes} suppressHydrationWarning>
				<body>
					<main id='page' style={{ viewTransitionName: 'page' }}>
						<StyledComponentsRegistry>
							<ThemeProvider theme={theme} key='themeprovider'>
								<GlobalStyle />

								{/* GridExposer only rendered in development environment */}
								{process.env.NODE_ENV === 'development' && (
									<GridExposer />
								)}

								{/* CookieBar only rendered in production environment */}
								{process.env.NODE_ENV === 'production' && (
									<CookieBar />
								)}

								<Contexts>
									<ReactLenis
										root
										options={{ autoRaf: false }}
										ref={lenisRef}
									/>
									<AnimationPlugins />
									<Cursor />
									{children}
								</Contexts>
							</ThemeProvider>
						</StyledComponentsRegistry>
					</main>
				</body>
			</html>
		</ViewTransitions>
	);
};

// Exports
// ------------
Client.displayName = 'Client';
export default Client;
