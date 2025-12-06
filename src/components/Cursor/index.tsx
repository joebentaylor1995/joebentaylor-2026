'use client';

// Imports
// ------------
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsDesktop } from '@utils/useResponsive';

// Styles + Interfaces
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Cursor = () => {
	// NOTE • Configuration
	const CURSOR_SPEED = 0.25; // Lower = faster (0.1 = very fast, 1.0 = slow)
	const STRETCH_SENSITIVITY = 400; // Higher = less sensitive to movement
	const MAX_STRETCH = 0.25; // Maximum stretch amount (0.1 = subtle, 0.5 = dramatic)
	const HOVER_SCALE = 1.5; // Scale multiplier when hovering over data-hover elements

	// NOTE • Refs
	const jellyRef = useRef<HTMLDivElement>(null);
	const pos = useRef({ x: 0, y: 0 });
	const vel = useRef({ x: 0, y: 0 });
	const animationRef = useRef<gsap.core.Tween | null>(null);
	const isHoveringRef = useRef(false);
	const hoverScaleRef = useRef({ value: 1 });
	const scaleAnimationRef = useRef<gsap.core.Tween | null>(null);

	// NOTE • Window Size
	const isDesktop = useIsDesktop();

	// NOTE • Animate Jelly Blob
	useEffect(() => {
		if (!isDesktop) return;

		const getAngle = (diffX: number, diffY: number) =>
			(Math.atan2(diffY, diffX) * 180) / Math.PI;

		const getScale = (diffX: number, diffY: number) => {
			const distance = Math.sqrt(diffX * diffX + diffY * diffY);
			return Math.min(distance / STRETCH_SENSITIVITY, MAX_STRETCH);
		};

		const updateJellyBlob = () => {
			if (!jellyRef.current) return;

			const rotation = getAngle(vel.current.x, vel.current.y);
			const stretchScale = getScale(vel.current.x, vel.current.y);
			const baseScale = hoverScaleRef.current.value;

			gsap.set(jellyRef.current, {
				x: pos.current.x,
				y: pos.current.y,
				rotate: rotation,
				scaleX: baseScale * (1 + stretchScale),
				scaleY: baseScale * (1 - stretchScale),
			});
		};

		const handleMouseMove = (e: MouseEvent) => {
			const newX = e.clientX;
			const newY = e.clientY;

			// Kill previous animation to prevent buildup
			if (animationRef.current) {
				animationRef.current.kill();
			}

			const updateVelocity = () => {
				vel.current.x = newX - pos.current.x;
				vel.current.y = newY - pos.current.y;
				updateJellyBlob();
			};

			animationRef.current = gsap.to(pos.current, {
				x: newX,
				y: newY,
				duration: CURSOR_SPEED,
				ease: 'power3.out',
				onUpdate: updateVelocity,
			});
		};

		window.addEventListener('mousemove', handleMouseMove, {
			passive: true,
		});

		// Handle hover over elements with data-hover attribute
		const handleHoverEnter = () => {
			isHoveringRef.current = true;
			// Kill any existing scale animation
			if (scaleAnimationRef.current) {
				scaleAnimationRef.current.kill();
			}
			// Animate scale up
			scaleAnimationRef.current = gsap.to(hoverScaleRef.current, {
				value: HOVER_SCALE,
				duration: 0.3,
				ease: 'power2.out',
				onUpdate: updateJellyBlob,
			});
		};

		const handleHoverLeave = () => {
			isHoveringRef.current = false;
			// Kill any existing scale animation
			if (scaleAnimationRef.current) {
				scaleAnimationRef.current.kill();
			}
			// Animate scale down
			scaleAnimationRef.current = gsap.to(hoverScaleRef.current, {
				value: 1,
				duration: 0.3,
				ease: 'power2.out',
				onUpdate: updateJellyBlob,
			});
		};

		// Find all elements with data-hover attribute
		const hoverElements = document.querySelectorAll('[data-hover]');
		hoverElements.forEach(element => {
			element.addEventListener('mouseenter', handleHoverEnter);
			element.addEventListener('mouseleave', handleHoverLeave);
		});

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			// Kill any running animations on cleanup
			if (animationRef.current) {
				animationRef.current.kill();
			}
			if (scaleAnimationRef.current) {
				scaleAnimationRef.current.kill();
			}
			// Remove hover event listeners
			hoverElements.forEach(element => {
				element.removeEventListener('mouseenter', handleHoverEnter);
				element.removeEventListener('mouseleave', handleHoverLeave);
			});
		};
	}, [isDesktop]);

	// Don't render on mobile/tablet
	if (!isDesktop) return null;

	return <Jacket ref={jellyRef} aria-hidden='true' />;
};

// Exports
// ------------
Cursor.displayName = 'Cursor';
export default Cursor;
