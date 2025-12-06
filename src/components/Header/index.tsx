'use client';

// Imports
// ------------
import { useRef } from 'react';
import Icon from '@parts/Icon';
import Logo from '@parts/Logo';
import Grid from '@waffl';
import Social from './Social';
import Chopsticks from '@parts/Chopsticks';
import { useIsDesktop } from '@utils/useResponsive';
import { useMagnetic, useMagneticMultiple } from '@utils/useMagnetic';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';
import Link from 'next/link';

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
	// Refs
	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const logoRef = useRef<HTMLDivElement>(null);

	// Check if desktop
	const isDesktop = useIsDesktop();

	// Apply magnetic effect to logo (desktop only)
	useMagnetic(logoRef, {
		radius: MAGNETIC_RADIUS,
		strength: MAGNETIC_STRENGTH,
		enabled: isDesktop,
	});

	// Apply magnetic effect to all buttons (desktop only)
	useMagneticMultiple(buttonRefs, {
		radius: MAGNETIC_RADIUS,
		strength: MAGNETIC_STRENGTH,
		enabled: isDesktop,
	});

	// Event Handlers
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('click');
	};

	return (
		<>
			<S.Jacket>
				<Grid>
					<S.Col $s='1/2' $m='1/4' $l='1/8'>
						<S.LogoWrapper ref={logoRef}>
							<Logo />
						</S.LogoWrapper>
					</S.Col>

					<S.Col $s='2/3' $m='4/7' $l='8/13'>
						{isDesktop && (
							<S.Navigation>
								{NAV_ITEMS.map((item, index) => (
									<S.Button
										ref={el => {
											buttonRefs.current[index] = el;
										}}
										data-hover
										$isFirst={index === 0}
										key={item.label}
										onClick={e => handleClick(e)}
										aria-label={`Navigate to ${item.label}`}
									>
										<span>
											{item.label
												.split('')
												.map((char, idx) => (
													<span
														key={idx}
														className='letter'
													>
														{char === ' '
															? '\u00A0'
															: char}
													</span>
												))}
										</span>
									</S.Button>
								))}
							</S.Navigation>
						)}

						<S.Hamburger>
							<Chopsticks />
						</S.Hamburger>
					</S.Col>
				</Grid>
			</S.Jacket>

			{!isDesktop && (
				<S.MobileMenu>
					<ul>
						{NAV_ITEMS.map(({ label }) => (
							<li key={label}>
								<button onClick={e => handleClick(e)}>
									{label}
								</button>
							</li>
						))}
					</ul>

					<ul>
						{socials?.map(
							({ url, name, isEnabled }) =>
								isEnabled && (
									<li key={name}>
										<Social
											url={url}
											name={name}
											icon={name.toLowerCase()}
											isEnabled={isEnabled}
										/>
									</li>
								)
						)}
					</ul>
				</S.MobileMenu>
			)}
		</>
	);
};

// Exports
// ------------
Header.displayName = 'Header';
export default Header;
