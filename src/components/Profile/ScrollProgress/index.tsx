'use client';

// Imports
// ------------
import { useRef, useEffect } from 'react';
import { use } from 'react';
import { gsap } from 'gsap';
import { GlobalContext } from '@parts/Contexts';
import { useAnimation } from '@utils/useAnimation';
import { bezzy, bezzy2 } from '@parts/AnimationPlugins/Curves';

import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const ScrollProgress = ({ isActive, wrapperRef }: I.ScrollProgressProps) => {
	const { profileLenis } = use(GlobalContext);
	const progressRef = useRef<HTMLDivElement>(null);
	const jacketRef = useRef<HTMLDivElement>(null);
	const initializedRef = useRef(false);

	// Set initial state once on mount
	useEffect(() => {
		if (!jacketRef.current || initializedRef.current) return;

		gsap.set(jacketRef.current, {
			scaleX: 0,
		});

		initializedRef.current = true;
	}, []);

	// Use useAnimation hook for fade in/out
	useAnimation(
		() => {
			if (!jacketRef.current) return;

			// Animate to target state based on isActive
			gsap.to(jacketRef.current, {
				scaleX: isActive ? 1 : 0,
				transformOrigin: isActive ? 'left center' : 'right center',
				duration: 0.8,
				delay: isActive ? 0.25 : 0,
				ease: bezzy2,
			});
		},
		{ scope: jacketRef, dependencies: [isActive] }
	);

	useEffect(() => {
		if (!isActive || !progressRef.current || !wrapperRef?.current) return;

		let cleanupFn: (() => void) | null = null;

		const timeoutId = setTimeout(() => {
			if (
				!profileLenis.current ||
				!progressRef.current ||
				!wrapperRef?.current
			)
				return;

			const lenis = profileLenis.current;
			const progress = progressRef.current;
			const wrapper = wrapperRef.current;

			const updateProgress = () => {
				if (!lenis || !progress || !wrapper) return;

				const scrollTop = lenis.scroll || 0;
				const scrollHeight = wrapper.scrollHeight || 1;
				const clientHeight = wrapper.clientHeight || 1;
				const maxScroll = scrollHeight - clientHeight;
				const progressValue = maxScroll > 0 ? scrollTop / maxScroll : 0;

				gsap.to(progress, {
					scaleX: Math.min(1, Math.max(0, progressValue)),
					duration: 0.1,
					ease: 'none',
				});
			};

			lenis.on('scroll', updateProgress);

			updateProgress();

			cleanupFn = () => {
				if (lenis) {
					lenis.off('scroll', updateProgress);
				}
				if (progress) {
					gsap.set(progress, { scaleX: 0 });
				}
			};
		}, 100);

		return () => {
			clearTimeout(timeoutId);
			if (cleanupFn) {
				cleanupFn();
			}
		};
	}, [isActive, profileLenis, wrapperRef]);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Progress ref={progressRef} />
		</S.Jacket>
	);
};

// Exports
// ------------
ScrollProgress.displayName = 'ScrollProgress';
export default ScrollProgress;
