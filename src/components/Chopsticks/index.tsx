'use client';

// Imports
// ------------
import { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '@parts/Contexts';
import { useAnimation } from '@/utils/useAnimation';
import { gsap } from 'gsap';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Chopsticks = ({}: I.ChopsticksProps) => {
	// Context
	const { setMenuOpen, menuOpen } = useContext(GlobalContext);

	// Refs
	const jacketRef = useRef<HTMLButtonElement>(null);
	const topRef = useRef<HTMLSpanElement>(null);
	const bottomRef = useRef<HTMLSpanElement>(null);

	// Event Handlers
	const handleClick = () => {
		setMenuOpen(!menuOpen);
	};

	// Animations
	useEffect(() => {
		const topTL = gsap.timeline();
		const bottomTL = gsap.timeline();

		topTL
			.to(topRef.current, {
				rotation: menuOpen ? -5 : 0,
				ease: 'cubic-bezier(0.8, 0, 0.2, 1)',
				duration: 0.2,
			})
			.to(topRef.current, {
				rotation: menuOpen ? 225 : 0,
				xPercent: menuOpen ? -50 : 0,
				scaleX: menuOpen ? 0.68 : 1,
				y: menuOpen ? -5 : 0,
				ease: 'cubic-bezier(0.5,0,0,1)',
				duration: 0.25,
				delay: 0.1,
			});

		bottomTL
			.to(bottomRef.current, {
				rotation: menuOpen ? 5 : 0,
				ease: 'cubic-bezier(0.8, 0, 0.2, 1)',
				duration: 0.2,
			})
			.to(bottomRef.current, {
				rotation: menuOpen ? -225 : 0,
				xPercent: menuOpen ? -50 : 0,
				scaleX: menuOpen ? 0.68 : 1,
				y: menuOpen ? 5 : 0,
				ease: 'cubic-bezier(0.5,0,0,1)',
				duration: 0.25,
				delay: 0.1,
			});
	}, [menuOpen]);

	return (
		<S.Jacket $isOpen={menuOpen} onClick={handleClick} ref={jacketRef}>
			<span ref={topRef} />
			<span ref={bottomRef} />
		</S.Jacket>
	);
};

// Exports
// ------------
Chopsticks.displayName = 'Chopsticks';
export default Chopsticks;
