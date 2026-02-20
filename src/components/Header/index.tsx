'use client';

import { bezzy2 } from '@parts/AnimationPlugins/Curves';
import Chopsticks from '@parts/Chopsticks';
import { GlobalContext } from '@parts/Contexts';
import Logo from '@parts/Logo';
import { useMagnetic } from '@utils/useMagnetic';
import { useIsDesktop, useIsTablet } from '@utils/useResponsive';
import Grid from '@waffl';
import { gsap } from 'gsap';
// Imports
// ------------
import { use, useEffect, useLayoutEffect, useRef } from 'react';
import DesktopMenu from './DesktopMenu';
// Styles + Interfaces
// ------------
import type * as I from './interface';
import MobileMenu from './MobileMenu';
import * as S from './styles';

// Constants
// ------------
const NAV_ITEMS = [
	{ label: 'Home' },
	{ label: 'Profile' },
	{ label: 'Projects', comingSoon: true },
	{ label: "Let's Talk" },
] as const;

const MAGNETIC_RADIUS = 48; // pixels
const MAGNETIC_STRENGTH = 0.4; // 0-1, how much the button moves (30% of distance)

// Component
// ------------
const Header = ({ socials }: I.HeaderProps) => {
	// refs
	const logoRef = useRef<HTMLDivElement>(null);
	const jacketRef = useRef<HTMLElement>(null);

	// Context
	const { loaderFinishing, setProfileOpen, setContactOpen } =
		use(GlobalContext);

	// Check if desktop
	const isDesktop = useIsDesktop();
	const isTablet = useIsTablet();

	// Apply magnetic effect to logo (desktop only)
	useMagnetic(logoRef, {
		radius: MAGNETIC_RADIUS,
		strength: MAGNETIC_STRENGTH,
		enabled: isDesktop,
	});

	// Hide header initially until loader finishes
	useLayoutEffect(() => {
		if (!jacketRef.current) return;

		// Set initial state immediately (CSS already hides it, this ensures GSAP control)
		gsap.set(jacketRef.current, {
			autoAlpha: 0,
			yPercent: -100,
			immediateRender: true,
		});
	}, []);

	// Fade in Header when loader finishes
	useEffect(() => {
		if (!loaderFinishing || !jacketRef.current) return;

		// Fade in
		gsap.to(jacketRef.current, {
			autoAlpha: 1,
			yPercent: 0,
			duration: 1,
			ease: bezzy2,
		});
	}, [loaderFinishing]);

	// Event Handlers
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// Use currentTarget to get the button element, not the child that was clicked
		const button = e.currentTarget as HTMLButtonElement;

		if (button?.dataset.label === 'Profile') {
			setProfileOpen(true);
		}

		if (button?.dataset.label === "Let's Talk") {
			setContactOpen(true);
		}
	};

	return (
		<>
			<S.Jacket ref={jacketRef}>
				<Grid>
					<S.Col $s='1/2' $m='1/4' $l='1/8'>
						<S.LogoWrapper ref={logoRef}>
							<Logo />
						</S.LogoWrapper>
					</S.Col>

					<S.Col $s='2/3' $m='4/7' $l='8/13'>
						{isDesktop || isTablet ? (
							<DesktopMenu
								magneticOptions={{
									radius: MAGNETIC_RADIUS,
									strength: MAGNETIC_STRENGTH,
								}}
								index={0}
								navItems={NAV_ITEMS}
								handleClick={handleClick}
							/>
						) : (
							<S.Hamburger>
								<Chopsticks />
							</S.Hamburger>
						)}
					</S.Col>
				</Grid>
			</S.Jacket>

			{!isDesktop && (
				<MobileMenu
					navItems={NAV_ITEMS}
					socials={socials}
					handleClick={handleClick}
				/>
			)}
		</>
	);
};

// Exports
// ------------
Header.displayName = 'Header';
export default Header;
