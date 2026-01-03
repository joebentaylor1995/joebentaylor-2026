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
	const { contactLenis } = use(GlobalContext);

	useEffect(() => {
		if (!isActive) {
			// Wait for modal exit animation, then scroll to top and cleanup when inactive
			if (contactLenis.current) {
				// Wait 1s for modal exit animation to complete, then scroll to top instantly
				const scrollTimeout = setTimeout(() => {
					if (contactLenis.current) {
						// Scroll to top instantly after 1s delay
						contactLenis.current.scrollTo(0, {
							immediate: true,
						});
						// Clean up and destroy immediately after scrolling
						contactLenis.current.off(
							'scroll',
							ScrollTrigger.update
						);
						if (wrapperRef.current) {
							ScrollTrigger.scrollerProxy(wrapperRef.current, {});
						}
						contactLenis.current.destroy();
						contactLenis.current = null;
						ScrollTrigger.refresh();
					}
				}, 1000);
				return () => {
					clearTimeout(scrollTimeout);
				};
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
			contactLenis.current = new Lenis({
				wrapper: wrapperRef.current,
				content: contentRef.current,
			});

			// GSAP ticker integration
			updateFn = (time: number) => {
				contactLenis.current?.raf(time * 1000);
			};

			gsap.ticker.add(updateFn);

			// ScrollTrigger scrollerProxy integration
			ScrollTrigger.scrollerProxy(wrapperRef.current, {
				scrollTop(value?: number) {
					if (
						arguments.length &&
						value !== undefined &&
						contactLenis.current
					) {
						contactLenis.current.scrollTo(value, {
							immediate: true,
						});
					}
					return contactLenis.current?.scroll ?? 0;
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
			contactLenis.current.on('scroll', ScrollTrigger.update);
		}, 0);

		return () => {
			clearTimeout(timeoutId);
			if (updateFn) {
				gsap.ticker.remove(updateFn);
			}
			// Only cleanup listeners - don't scroll or destroy here
			// The !isActive block will handle scroll/destroy with the 1s delay
			// This prevents immediate scrolling when transitioning to inactive
			if (contactLenis.current) {
				// Remove scroll listener
				contactLenis.current.off('scroll', ScrollTrigger.update);
				// Revert scrollerProxy
				if (wrapperRef.current) {
					ScrollTrigger.scrollerProxy(wrapperRef.current, {});
				}
				// Don't scroll or destroy - let !isActive block handle it with delay
			}
		};
	}, [isActive, wrapperRef, contentRef]);

	return null;
};

// Exports
// ------------
SmoothScroll.displayName = 'SmoothScroll';
export default SmoothScroll;
