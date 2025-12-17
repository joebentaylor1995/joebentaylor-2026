'use client';

// Imports
// ------------
import { use, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlobalContext } from '@parts/Contexts';
import 'lenis/dist/lenis.css';

// Interfaces
// ------------
import * as I from './interface';

// Component
// ------------
const SmoothScroll = ({
	wrapperRef,
	contentRef,
	isActive,
}: I.SmoothScrollProps) => {
	// Context
	const { profileLenis } = use(GlobalContext);

	useEffect(() => {
		if (!isActive) {
			// Cleanup when inactive
			if (profileLenis.current) {
				profileLenis.current.destroy();
				profileLenis.current = null;
			}
			return;
		}

		let updateFn: ((time: number) => void) | null = null;
		let timeoutId: NodeJS.Timeout;

		// Wait for next frame to ensure refs are set
		timeoutId = setTimeout(() => {
			if (!wrapperRef.current || !contentRef.current) {
				console.error('Lenis refs not available');
				return;
			}

			// Create Lenis instance for the modal
			profileLenis.current = new Lenis({
				wrapper: wrapperRef.current,
				content: contentRef.current,
				duration: 1.2,
				easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				orientation: 'vertical',
				gestureOrientation: 'vertical',
				smoothWheel: true,
				wheelMultiplier: 1,
				touchMultiplier: 2,
			});

			// GSAP ticker integration
			updateFn = (time: number) => {
				profileLenis.current?.raf(time * 1000);
			};

			gsap.ticker.add(updateFn);

			// ScrollTrigger scrollerProxy integration
			ScrollTrigger.scrollerProxy(wrapperRef.current, {
				scrollTop(value?: number) {
					if (
						arguments.length &&
						value !== undefined &&
						profileLenis.current
					) {
						profileLenis.current.scrollTo(value, {
							immediate: true,
						});
					}
					return profileLenis.current?.scroll ?? 0;
				},
				getBoundingClientRect() {
					return {
						top: 0,
						left: 0,
						width: wrapperRef.current?.clientWidth || 0,
						height: wrapperRef.current?.clientHeight || 0,
					};
				},
				pinType: wrapperRef.current?.style.transform
					? 'transform'
					: 'fixed',
			});

			// Refresh ScrollTrigger when Lenis scrolls
			profileLenis.current.on('scroll', ScrollTrigger.update);
		}, 0);

		return () => {
			clearTimeout(timeoutId);
			if (updateFn) {
				gsap.ticker.remove(updateFn);
			}
			if (profileLenis.current) {
				// Remove scroll listener
				profileLenis.current.off('scroll', ScrollTrigger.update);
				// Revert scrollerProxy
				if (wrapperRef.current) {
					ScrollTrigger.scrollerProxy(wrapperRef.current, {});
				}
				// Destroy Lenis instance
				profileLenis.current.destroy();
				profileLenis.current = null;
			}
			// Refresh ScrollTrigger after cleanup
			ScrollTrigger.refresh();
		};
	}, [isActive, wrapperRef, contentRef]);

	return null;
};

// Exports
// ------------
SmoothScroll.displayName = 'SmoothScroll';
export default SmoothScroll;
