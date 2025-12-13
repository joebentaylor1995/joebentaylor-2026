'use client';

// Imports
// ------------
import { useRef, useEffect, use } from 'react';
import Grid from '@waffl';
import Logo from '@parts/Logo';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import Chopsticks from '@parts/Chopsticks';
import { useIsDesktop } from '@utils/useResponsive';
import { useMagnetic } from '@utils/useMagnetic';
import { GlobalContext } from '@parts/Contexts';
import { gsap } from 'gsap';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Constants
// ------------
const NAV_ITEMS = [
	{ label: 'Home' },
	{ label: 'Profile' },
	{ label: 'Projects' },
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
	const { loaderFinished } = use(GlobalContext);

	// Check if desktop
	const isDesktop = useIsDesktop();

	// Apply magnetic effect to logo (desktop only)
	useMagnetic(logoRef, {
		radius: MAGNETIC_RADIUS,
		strength: MAGNETIC_STRENGTH,
		enabled: isDesktop,
	});

	// Fade in Header when loader finishes
	useEffect(() => {
		if (!loaderFinished || !jacketRef.current) return;

		// Set initial opacity
		gsap.set(jacketRef.current, { opacity: 0 });

		// Fade in
		gsap.to(jacketRef.current, {
			opacity: 1,
			duration: 0.8,
			delay: 0.75,
			ease: 'power2.out',
		});
	}, [loaderFinished]);

	// Event Handlers
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('click');
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
						{isDesktop ? (
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
