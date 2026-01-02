'use client';

// Imports
// ------------
import StarHeading from '@parts/StarHeading';
import Grid from '@waffl';
import { StructuredText } from 'react-datocms';
import { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { animateNeonFlicker } from '@utils/animateNeonFlicker';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Introduction = ({
	columnOverride,
	isActive,
	wrapperRef,
	introSubheading,
	introHeading,
	introText,
}: I.IntroductionProps) => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const topSubRef = useRef<HTMLElement>(null);
	const splitTextRefs = useRef<(SplitText | null)[]>([]);
	const headingRefs = useRef<(HTMLSpanElement | null)[]>(
		new Array(introHeading.length).fill(null)
	);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

	// Split text into characters and prepare for animation
	useLayoutEffect(() => {
		if (!isActive) {
			// Revert splits when inactive
			splitTextRefs.current.forEach(split => split?.revert?.());
			splitTextRefs.current = [];
			return;
		}

		const timeouts: NodeJS.Timeout[] = [];

		// Wait for next frame to ensure refs are set
		const timeoutId = setTimeout(() => {
			// Revert any previous splits
			splitTextRefs.current.forEach(split => split?.revert?.());
			splitTextRefs.current = [];

			// Check if we have any headings
			if (
				headingRefs.current.length === 0 ||
				!headingRefs.current.some(h => h)
			) {
				return;
			}

			if (topSubRef.current) {
				gsap.set(topSubRef.current, { autoAlpha: 0 });
			}

			// Split each heading into characters
			headingRefs.current.forEach((heading, index) => {
				if (!heading) return;

				// Hide the original text
				gsap.set(heading, { opacity: 0 });

				const split = SplitText.create(heading, {
					type: 'chars',
					charsClass: 'char++',
				});

				splitTextRefs.current[index] = split;

				// Set initial state for characters (hidden, in final position)
				if (split.chars && split.chars.length > 0) {
					gsap.set(split.chars, {
						autoAlpha: 0,
					});
				}

				// Show the split text
				gsap.set(heading, { autoAlpha: 1 });
			});

			// Collect all characters from all headings
			const getAllChars = (): Element[] => {
				const allChars: Element[] = [];
				headingRefs.current.forEach((heading, index) => {
					const split = splitTextRefs.current[index];
					if (split && split.chars && split.chars.length > 0) {
						allChars.push(...split.chars);
					}
				});
				return allChars;
			};

			// Function to trigger flicker animation
			const triggerFlicker = (resetFirst = false) => {
				const allChars = getAllChars();
				if (allChars.length === 0) return;

				// Create a timeline for the flicker
				const tl = gsap.timeline();

				// Reset characters to hidden if needed
				if (resetFirst) {
					gsap.set(allChars, { autoAlpha: 0 });
				}

				// Animate all characters with neon flicker effect
				animateNeonFlicker(allChars, tl);
			};

			// Set up ScrollTrigger to control interval based on visibility
			if (wrapperRef?.current && jacketRef.current) {
				let initialAnimationComplete = false;

				const scrollTrigger = ScrollTrigger.create({
					scroller: wrapperRef.current,
					trigger: jacketRef.current,
					start: 'top bottom',
					end: 'bottom top',
					onEnter: () => {
						// Only start interval after initial animation completes
						if (initialAnimationComplete) {
							// Clear any existing interval
							if (intervalRef.current) {
								clearInterval(intervalRef.current);
							}
							// Start interval to replay flicker every 4 seconds
							intervalRef.current = setInterval(() => {
								triggerFlicker(true);
							}, 4000);
						}
					},
					onEnterBack: () => {
						// Only start interval after initial animation completes
						if (initialAnimationComplete) {
							// Clear any existing interval
							if (intervalRef.current) {
								clearInterval(intervalRef.current);
							}
							// Start interval to replay flicker every 4 seconds
							intervalRef.current = setInterval(() => {
								triggerFlicker(true);
							}, 4000);
						}
					},
					onLeave: () => {
						// Stop interval when scrolled out of view
						if (intervalRef.current) {
							clearInterval(intervalRef.current);
							intervalRef.current = null;
						}
					},
					onLeaveBack: () => {
						// Stop interval when scrolled out of view
						if (intervalRef.current) {
							clearInterval(intervalRef.current);
							intervalRef.current = null;
						}
					},
				});

				scrollTriggerRef.current = scrollTrigger;

				// Animate after splits are created
				const animateTimeout = setTimeout(() => {
					// Create a timeline to sequence the animations
					const tl = gsap.timeline({ delay: 0.5 }); // Initial 0.5s delay

					tl.to(topSubRef.current, {
						autoAlpha: 1,
						duration: 0.5,
						delay: 0.25,
					});

					const allChars = getAllChars();

					// Animate all characters with neon flicker effect
					if (allChars.length > 0) {
						animateNeonFlicker(allChars, tl, {
							timelinePosition: 0, // All headings start at the same time
						});

						// Wait for initial animation to complete (estimate ~2 seconds)
						const initialDelay = setTimeout(() => {
							initialAnimationComplete = true;

							// Check if trigger is currently active (in view)
							if (scrollTrigger.isActive) {
								// Clear any existing interval
								if (intervalRef.current) {
									clearInterval(intervalRef.current);
								}
								// Start interval to replay flicker every 4 seconds
								intervalRef.current = setInterval(() => {
									triggerFlicker(true);
								}, 4000);
							}
						}, 2000); // Wait 2 seconds for initial animation to complete

						timeouts.push(initialDelay);
					}
				}, 100); // Small delay to ensure splits are ready

				timeouts.push(animateTimeout);
			}

			// If no wrapperRef, still run initial animation but without interval replay
			if (!wrapperRef?.current || !jacketRef.current) {
				const fallbackTimeout = setTimeout(() => {
					// Create a timeline to sequence the animations
					const tl = gsap.timeline({ delay: 0.5 }); // Initial 0.5s delay

					tl.to(topSubRef.current, {
						autoAlpha: 1,
						duration: 0.5,
						delay: 0.25,
					});

					const allChars = getAllChars();

					// Animate all characters with neon flicker effect
					if (allChars.length > 0) {
						animateNeonFlicker(allChars, tl, {
							timelinePosition: 0, // All headings start at the same time
						});
					}
				}, 100); // Small delay to ensure splits are ready

				timeouts.push(fallbackTimeout);
			}
		}, 0);

		timeouts.push(timeoutId);

		return () => {
			timeouts.forEach(timeout => clearTimeout(timeout));
			// Clear interval
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			// Kill scroll trigger
			if (scrollTriggerRef.current) {
				scrollTriggerRef.current.kill();
				scrollTriggerRef.current = null;
			}
		};
	}, [isActive, introHeading.length, wrapperRef]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			splitTextRefs.current.forEach(split => split?.revert?.());
		};
	}, []);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Top>
				<Grid $lCols={columnOverride}>
					<S.TopContent $l='1/9'>
						<StarHeading
							text={introSubheading}
							semantic='h2'
							passedRef={topSubRef}
						/>
						<S.Title>
							{introHeading.map(({ heading }, index) => (
								<span
									key={heading}
									ref={el => {
										if (el) {
											headingRefs.current[index] = el;
										}
									}}
								>
									{heading}
								</span>
							))}
						</S.Title>
					</S.TopContent>
				</Grid>

				<S.Scroll>Scroll</S.Scroll>
			</S.Top>

			<S.Bottom>
				<Grid $lCols={columnOverride}>
					<S.BottomSubheading $m='1/3' $l='1/4'>
						<StarHeading text='Introduction' semantic='h2' />
					</S.BottomSubheading>

					<S.BottomContent $m='3/7' $l='4/9'>
						<StructuredText data={introText} />
					</S.BottomContent>
				</Grid>
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
Introduction.displayName = 'Introduction';
export default Introduction;
