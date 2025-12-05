'use client';

// Imports
// ------------
import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import Logo from '@parts/Logo';
import Grid from '@waffl';
import { useIsDesktop } from '@utils/useResponsive';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Header = ({}: I.HeaderProps) => {
	// Configuration
	const MAGNETIC_RADIUS = 48; // pixels
	const MAGNETIC_STRENGTH = 0.4; // 0-1, how much the button moves (30% of distance)

	// Refs
	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const logoRef = useRef<HTMLDivElement>(null);
	const mousePos = useRef({ x: 0, y: 0 });
	const animationRefs = useRef<(gsap.core.Tween | null)[]>([]);
	const logoAnimationRef = useRef<gsap.core.Tween | null>(null);

	// Check if desktop
	const isDesktop = useIsDesktop();

	// Event Handlers
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('click');
	};

	// Navigation Items
	const navItems = [
		{
			label: 'Home',
		},
		{
			label: 'Profile',
		},
		{
			label: 'Projects',
		},
		{
			label: "Let's Talk",
		},
	];

	// Magnetic effect
	useEffect(() => {
		if (!isDesktop) return;

		const handleMouseMove = (e: MouseEvent) => {
			mousePos.current = { x: e.clientX, y: e.clientY };

			// Handle Logo magnetic effect
			if (logoRef.current) {
				const rect = logoRef.current.getBoundingClientRect();
				const logoCenterX = rect.left + rect.width / 2;
				const logoCenterY = rect.top + rect.height / 2;

				const dx = mousePos.current.x - logoCenterX;
				const dy = mousePos.current.y - logoCenterY;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (logoAnimationRef.current) {
					logoAnimationRef.current.kill();
				}

				if (distance < MAGNETIC_RADIUS) {
					const pullX = dx * MAGNETIC_STRENGTH;
					const pullY = dy * MAGNETIC_STRENGTH;

					logoAnimationRef.current = gsap.to(logoRef.current, {
						x: pullX,
						y: pullY,
						duration: 0.3,
						ease: 'power2.out',
					});
				} else {
					logoAnimationRef.current = gsap.to(logoRef.current, {
						x: 0,
						y: 0,
						duration: 0.5,
						ease: 'power2.out',
					});
				}
			}

			// Handle button magnetic effects
			buttonRefs.current.forEach((button, index) => {
				if (!button) return;

				// Get button center position
				const rect = button.getBoundingClientRect();
				const buttonCenterX = rect.left + rect.width / 2;
				const buttonCenterY = rect.top + rect.height / 2;

				// Calculate distance from cursor to button center
				const dx = mousePos.current.x - buttonCenterX;
				const dy = mousePos.current.y - buttonCenterY;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Kill any existing animation for this button
				if (animationRefs.current[index]) {
					animationRefs.current[index]?.kill();
				}

				if (distance < MAGNETIC_RADIUS) {
					// Within magnetic radius - apply pull
					const pullX = dx * MAGNETIC_STRENGTH;
					const pullY = dy * MAGNETIC_STRENGTH;

					animationRefs.current[index] = gsap.to(button, {
						x: pullX,
						y: pullY,
						duration: 0.3,
						ease: 'power2.out',
					});
				} else {
					// Outside magnetic radius - return to original position
					animationRefs.current[index] = gsap.to(button, {
						x: 0,
						y: 0,
						duration: 0.5,
						ease: 'power2.out',
					});
				}
			});
		};

		window.addEventListener('mousemove', handleMouseMove, {
			passive: true,
		});

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			// Kill logo animation and reset position
			logoAnimationRef.current?.kill();
			if (logoRef.current) {
				gsap.set(logoRef.current, { x: 0, y: 0 });
			}
			// Kill all button animations and reset positions
			animationRefs.current.forEach((anim, index) => {
				anim?.kill();
				if (buttonRefs.current[index]) {
					gsap.set(buttonRefs.current[index], { x: 0, y: 0 });
				}
			});
		};
	}, [isDesktop]);

	return (
		<S.Jacket>
			<Grid>
				<S.Col $s='1/2' $m='1/4' $l='1/8'>
					<S.LogoWrapper ref={logoRef}>
						<Logo />
					</S.LogoWrapper>
				</S.Col>

				<S.Col $s='2/3' $m='4/7' $l='8/13'>
					<S.Navigation>
						{navItems.map((item, index) => (
							<S.Button
								ref={el => {
									buttonRefs.current[index] = el;
								}}
								data-hover
								$isFirst={index === 0}
								key={index}
								onClick={(
									e: React.MouseEvent<HTMLButtonElement>
								) => handleClick(e)}
								aria-label={`Navigate to ${item.label}`}
							>
								<span>
									{item.label.split('').map((char, idx) => (
										<span key={idx} className='letter'>
											{char === ' ' ? '\u00A0' : char}
										</span>
									))}
								</span>
							</S.Button>
						))}
					</S.Navigation>
				</S.Col>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Header.displayName = 'Header';
export default Header;
