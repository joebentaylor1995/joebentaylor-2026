'use client';

// Imports
// ------------
import Socials from './Socials';
import StarHeading from '@/components/StarHeading';
import Background from './Background';
import Grid from '@waffl';
import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react';
import { useAnimation } from '@utils/useAnimation';
import { useCurrentTime } from '@utils/useCurrentTime';

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
	socials,
}: I.FooterProps) => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
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

			tl.to(jacketRef.current, {
				clipPath: 'inset(0rem 0rem round 0rem)',
				ease: 'none',
			});
		},
		{ scope: jacketRef, dependencies: [isActive, wrapperRef] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<Background
				imageUrls={imageUrls}
				rows={7}
				itemsPerRow={7}
				rowRefs={rowRefs}
				gridRef={gridRef}
				isActive={isActive}
			/>

			<S.Content>
				<header>
					<h2>Let's Talk</h2>
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
