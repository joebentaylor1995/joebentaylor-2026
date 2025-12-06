import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Interfaces
// ------------
export interface UseMagneticOptions {
	radius?: number; // Magnetic radius in pixels
	strength?: number; // Magnetic strength (0-1)
	enabled?: boolean; // Whether the effect is enabled
	pullDuration?: number; // Animation duration when pulling
	releaseDuration?: number; // Animation duration when releasing
	ease?: string; // GSAP easing function
}

// Hook
// ------------
/**
 * Hook that applies a magnetic cursor effect to an element
 * @param ref - React ref to the element that should have the magnetic effect
 * @param options - Configuration options for the magnetic effect
 * @returns void
 *
 * @example
 * ```tsx
 * const elementRef = useRef<HTMLButtonElement>(null);
 * useMagnetic(elementRef, { radius: 48, strength: 0.4 });
 * ```
 */
export const useMagnetic = <T extends HTMLElement>(
	ref: React.RefObject<T | null>,
	options: UseMagneticOptions = {}
) => {
	const {
		radius = 48,
		strength = 0.4,
		enabled = true,
		pullDuration = 0.3,
		releaseDuration = 0.5,
		ease = 'power2.out',
	} = options;

	const mousePos = useRef({ x: 0, y: 0 });
	const animationRef = useRef<gsap.core.Tween | null>(null);

	useEffect(() => {
		if (!enabled || !ref.current) return;

		const element = ref.current;

		const handleMouseMove = (e: MouseEvent) => {
			mousePos.current = { x: e.clientX, y: e.clientY };

			if (!element) return;

			// Get element center position
			const rect = element.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			// Calculate distance from cursor to element center
			const dx = mousePos.current.x - centerX;
			const dy = mousePos.current.y - centerY;
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Kill any existing animation
			if (animationRef.current) {
				animationRef.current.kill();
			}

			if (distance < radius) {
				// Within magnetic radius - apply pull
				const pullX = dx * strength;
				const pullY = dy * strength;

				animationRef.current = gsap.to(element, {
					x: pullX,
					y: pullY,
					duration: pullDuration,
					ease,
				});
			} else {
				// Outside magnetic radius - return to original position
				animationRef.current = gsap.to(element, {
					x: 0,
					y: 0,
					duration: releaseDuration,
					ease,
				});
			}
		};

		window.addEventListener('mousemove', handleMouseMove, {
			passive: true,
		});

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			// Kill animation and reset position
			animationRef.current?.kill();
			if (element) {
				gsap.set(element, { x: 0, y: 0 });
			}
		};
	}, [enabled, radius, strength, pullDuration, releaseDuration, ease, ref]);
};

/**
 * Hook that applies magnetic cursor effect to multiple elements
 * @param elementsRef - Ref to an array of elements that should have the magnetic effect
 * @param options - Configuration options for the magnetic effect
 * @returns void
 *
 * @example
 * ```tsx
 * const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
 * useMagneticMultiple(buttonRefs, { radius: 48, strength: 0.4 });
 * ```
 */
export const useMagneticMultiple = <T extends HTMLElement>(
	elementsRef: React.MutableRefObject<(T | null)[]>,
	options: UseMagneticOptions = {}
) => {
	const {
		radius = 48,
		strength = 0.4,
		enabled = true,
		pullDuration = 0.3,
		releaseDuration = 0.5,
		ease = 'power2.out',
	} = options;

	const mousePos = useRef({ x: 0, y: 0 });
	const animationRefs = useRef<(gsap.core.Tween | null)[]>([]);

	useEffect(() => {
		if (!enabled) return;

		const handleMouseMove = (e: MouseEvent) => {
			mousePos.current = { x: e.clientX, y: e.clientY };

			elementsRef.current.forEach((element, index) => {
				if (!element) return;

				// Get element center position
				const rect = element.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;

				// Calculate distance from cursor to element center
				const dx = mousePos.current.x - centerX;
				const dy = mousePos.current.y - centerY;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Kill any existing animation for this element
				if (animationRefs.current[index]) {
					animationRefs.current[index]?.kill();
				}

				if (distance < radius) {
					// Within magnetic radius - apply pull
					const pullX = dx * strength;
					const pullY = dy * strength;

					animationRefs.current[index] = gsap.to(element, {
						x: pullX,
						y: pullY,
						duration: pullDuration,
						ease,
					});
				} else {
					// Outside magnetic radius - return to original position
					animationRefs.current[index] = gsap.to(element, {
						x: 0,
						y: 0,
						duration: releaseDuration,
						ease,
					});
				}
			});
		};

		window.addEventListener('mousemove', handleMouseMove, {
			passive: true,
		});

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			// Kill all animations and reset positions
			animationRefs.current.forEach((anim, index) => {
				anim?.kill();
				if (elementsRef.current[index]) {
					gsap.set(elementsRef.current[index]!, { x: 0, y: 0 });
				}
			});
		};
	}, [
		enabled,
		radius,
		strength,
		pullDuration,
		releaseDuration,
		ease,
		elementsRef,
	]);
};
