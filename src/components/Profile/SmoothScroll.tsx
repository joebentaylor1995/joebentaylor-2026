'use client';

// Imports
// ------------
import { use, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlobalContext } from '@parts/Contexts';
import 'lenis/dist/lenis.css';

// Constants
// ------------
const MODAL_CLOSE_DURATION_MS = 1000;

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

	// Ref updated each render so cleanup can tell if we're transitioning to inactive
	const isActiveRef = useRef(isActive);
	isActiveRef.current = isActive;

	useEffect(() => {
		if (!isActive) {
			// Wait for modal exit animation, then scroll to top and cleanup when inactive
			if (profileLenis.current) {
				// Wait 1s for modal exit animation to complete, then scroll to top instantly
				const scrollTimeout = setTimeout(() => {
					if (profileLenis.current) {
						// Scroll to top instantly after 1s delay
						profileLenis.current.scrollTo(0, {
							immediate: true,
						});
						// Clean up and destroy immediately after scrolling
						profileLenis.current.off(
							'scroll',
							ScrollTrigger.update
						);
						if (wrapperRef.current) {
							ScrollTrigger.scrollerProxy(wrapperRef.current, {});
						}
						profileLenis.current.destroy();
						profileLenis.current = null;
						ScrollTrigger.refresh();
					}
				}, MODAL_CLOSE_DURATION_MS);
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
			profileLenis.current = new Lenis({
				wrapper: wrapperRef.current,
				content: contentRef.current,
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
				profileLenis.current.off('scroll', ScrollTrigger.update);
				if (wrapperRef.current) {
					ScrollTrigger.scrollerProxy(wrapperRef.current, {});
				}
				// Only destroy when unmounting. When closing modal (isActive -> false),
				// the !isActive branch scrolls to top after the close animation, then destroys.
				if (isActiveRef.current) {
					profileLenis.current.destroy();
					profileLenis.current = null;
					ScrollTrigger.refresh();
				}
			}
		};
	}, [isActive, wrapperRef, contentRef]);

	return null;
};

// Exports
// ------------
SmoothScroll.displayName = 'SmoothScroll';
export default SmoothScroll;
