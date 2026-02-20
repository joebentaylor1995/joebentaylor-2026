'use client';

// Imports
// ------------
import Socials from './Socials';
import StarHeading from '@/components/StarHeading';
import Background from './Background';
import Grid from '@waffl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { useRef, useEffect, useState } from 'react';
import { useAnimation } from '@utils/useAnimation';
import { useCurrentTime } from '@utils/useCurrentTime';
import { animateNeonFlicker } from '@utils/animateNeonFlicker';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Footer = ({
	isActive,
	wrapperRef,
	columnOverride,
	items = [],
	dribbbleUsername,
	socials = [],
}: I.FooterProps) => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const introSectionRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const splitTextRef = useRef<SplitText | null>(null);
	const flickerTimelineRef = useRef<gsap.core.Timeline | null>(null);
	const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
	const gradientRef = useRef<HTMLDivElement>(null);
	const mouseXRef = useRef<number>(
		typeof window !== 'undefined' ? window.innerWidth / 2 : 0
	);

	// State for Dribbble images
	const [dribbbleImages, setDribbbleImages] = useState<string[]>([]);

	// Constants
	const totalItems = 49;

	// Fetch Dribbble shots
	useEffect(() => {
		if (!dribbbleUsername) return;

		let isCancelled = false;

		fetch(`/api/dribbble?per_page=${totalItems}`)
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then(data => {
				if (isCancelled) return;

				if (
					data.imageUrls &&
					Array.isArray(data.imageUrls) &&
					data.imageUrls.length > 0
				) {
					setDribbbleImages(data.imageUrls);
				}
			})
			.catch(err => {
				if (!isCancelled) {
					console.error('Error fetching Dribbble shots:', err);
				}
			});

		return () => {
			isCancelled = true;
		};
	}, [dribbbleUsername, totalItems]);

	// Get image URLs: prioritize props, then Dribbble images
	const imageUrls =
		items.length > 0
			? items
					.filter(
						(item): item is string =>
							typeof item === 'string' && item.startsWith('http')
					)
					.slice(0, totalItems)
			: dribbbleImages.slice(0, totalItems);

	// Current time (updates every second)
	const currentTime = useCurrentTime({
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});

	// Animation
	useAnimation(
		() => {
			if (!isActive) return;

			gsap.ticker.lagSmoothing(0);

			const handleMouseMove = (e: MouseEvent): void => {
				mouseXRef.current = e.clientX;
			};

			const updateMotion = (): void => {
				const maxMoveAmount = 300;
				const baseDuration = 0.8;
				const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

				rowRefs.current.forEach((row, index) => {
					if (row) {
						const direction = index % 2 === 0 ? 1 : -1;
						const moveAmount =
							((mouseXRef.current / window.innerWidth) *
								maxMoveAmount -
								maxMoveAmount / 2) *
							direction;

						gsap.to(row, {
							x: moveAmount,
							duration:
								baseDuration +
								inertiaFactors[index % inertiaFactors.length],
							ease: 'power3.out',
							overwrite: 'auto',
						});
					}
				});
			};

			const removeAnimationLoop = gsap.ticker.add(updateMotion);
			window.addEventListener('mousemove', handleMouseMove, {
				passive: true,
			});

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				removeAnimationLoop();
				// Reset row positions
				rowRefs.current.forEach(row => {
					if (row) {
						gsap.set(row, { x: 0 });
					}
				});
			};
		},
		{ scope: jacketRef, dependencies: [isActive] }
	);

	// Jacket animation
	useAnimation(
		({ isDesktop }) => {
			if (!isActive || !wrapperRef?.current || !jacketRef.current) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					scroller: wrapperRef?.current,
					trigger: jacketRef.current,
					start: 'top 100%',
					end: 'bottom 100%',
					scrub: 1,
					markers: false,
				},
			});

			gsap.set(jacketRef.current, {
				clipPath: `inset(0rem ${isDesktop ? 4.8 : 2.4}rem round 1.2rem)`,
			});

			gsap.set(gradientRef.current, {
				scaleY: 1.2,
			});

			tl.to(
				jacketRef.current,
				{
					clipPath: 'inset(0rem 0rem round 0rem)',
					ease: 'none',
				},
				0
			);

			tl.to(
				gradientRef.current,
				{
					scaleY: 1,
					ease: 'none',
				},
				0
			);
		},
		{ scope: jacketRef, dependencies: [isActive, wrapperRef] }
	);

	// Intro section animation
	useAnimation(
		({ isDesktop }) => {
			if (!isActive || !wrapperRef?.current || !jacketRef.current) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					scroller: wrapperRef?.current,
					trigger: jacketRef.current,
					start: 'top 100%',
					end: 'center 100%',
					scrub: 0.5,
					markers: false,
				},
			});

			gsap.set(introSectionRef.current, {
				autoAlpha: 0,
				scale: 1.2,
			});

			tl.to(introSectionRef.current, {
				autoAlpha: 1,
				scale: 1,
				ease: 'none',
			});
		},
		{ scope: jacketRef, dependencies: [isActive, wrapperRef] }
	);

	// Neon flicker animation on scroll and hover
	useAnimation(
		() => {
			if (!isActive || !headingRef.current || !wrapperRef?.current)
				return;

			const heading = headingRef.current;

			// Revert any previous split
			if (splitTextRef.current) {
				splitTextRef.current.revert();
				splitTextRef.current = null;
			}

			// Split text into characters
			splitTextRef.current = SplitText.create(heading, {
				type: 'chars',
				charsClass: 'char++',
			});

			if (
				!splitTextRef.current.chars ||
				splitTextRef.current.chars.length === 0
			) {
				return;
			}

			const chars = splitTextRef.current.chars;

			// Set initial state - characters hidden
			gsap.set(chars, { autoAlpha: 0 });

			// Function to trigger neon flicker animation
			const triggerFlicker = (resetFirst = false) => {
				// Kill any existing timeline
				if (flickerTimelineRef.current) {
					flickerTimelineRef.current.kill();
				}

				// Create new timeline
				const tl = gsap.timeline();
				flickerTimelineRef.current = tl;

				// Reset characters to hidden if needed (for hover replay)
				if (resetFirst) {
					gsap.set(chars, { autoAlpha: 0 });
				}

				// Animate neon flicker
				animateNeonFlicker(chars, tl);
			};

			// Scroll-triggered animation using ScrollTrigger callbacks
			const scrollTrigger = ScrollTrigger.create({
				scroller: wrapperRef.current,
				trigger: heading,
				start: 'top 90%',
				onEnter: () => triggerFlicker(true), // Reset and play when entering
				onEnterBack: () => triggerFlicker(true), // Reset and play when entering back
				markers: false,
			});

			// Hover event to replay animation
			const handleMouseEnter = () => {
				triggerFlicker(true); // Reset first, then animate
			};

			heading.addEventListener('mouseenter', handleMouseEnter);

			return () => {
				heading.removeEventListener('mouseenter', handleMouseEnter);

				// Kill timelines
				if (flickerTimelineRef.current) {
					flickerTimelineRef.current.kill();
				}
				scrollTrigger.kill();

				// Revert split on cleanup
				if (splitTextRef.current) {
					splitTextRef.current.revert();
					splitTextRef.current = null;
				}
			};
		},
		{ scope: headingRef, dependencies: [isActive, wrapperRef] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Gradient ref={gradientRef} />

			<Background
				imageUrls={imageUrls}
				rows={7}
				itemsPerRow={7}
				rowRefs={rowRefs}
				gridRef={gridRef}
				introSectionRef={introSectionRef}
				isActive={isActive}
			/>

			<S.Content>
				<header>
					<h2 ref={headingRef}>Let's Talk</h2>
				</header>

				<footer>
					<Grid $lCols={columnOverride}>
						<S.Left $l='1/4'>
							<StarHeading text='Connect' semantic='h3' />

							<S.Location>
								<p>
									<span>Doncaster</span>
									<span>United Kingdom</span>
								</p>

								<time>{currentTime}</time>
							</S.Location>
						</S.Left>

						<S.Right $l='6/9'>
							<Socials socials={socials} />
						</S.Right>
					</Grid>
				</footer>
			</S.Content>
		</S.Jacket>
	);
};

// Exports
// ------------
Footer.displayName = 'Footer';
export default Footer;
