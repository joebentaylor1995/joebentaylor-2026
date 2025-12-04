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

	// NOTE • Refs
	const jellyRef = useRef<HTMLDivElement>(null);
	const pos = useRef({ x: 0, y: 0 });
	const vel = useRef({ x: 0, y: 0 });
	const animationRef = useRef<gsap.core.Tween | null>(null);

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
			const scale = getScale(vel.current.x, vel.current.y);

			gsap.set(jellyRef.current, {
				x: pos.current.x,
				y: pos.current.y,
				rotate: rotation,
				scaleX: 1 + scale,
				scaleY: 1 - scale,
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

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			// Kill any running animations on cleanup
			if (animationRef.current) {
				animationRef.current.kill();
			}
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
