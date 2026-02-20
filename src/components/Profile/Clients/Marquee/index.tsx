'use client';

// Imports
// ------------
import { useRef } from 'react';
import { useAnimation } from '@/utils/useAnimation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SRCImage } from 'react-datocms';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Marquee = ({ clients = [], wrapperRef }: I.MarqueeProps) => {
	const jacketRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const DURATION = 0.9; // Animation DURATION
	const LOOP_DELAY = 1.25; // Loop DURATION

	useAnimation(
		({ isDesktop }) => {
			const root = jacketRef.current;
			const list = listRef.current;

			if (!root || !list || !clients.length) return;

			const shuffleFront =
				root.getAttribute('data-logo-wall-shuffle') !== 'false';

			// Get all item elements
			const items = Array.from(
				list.querySelectorAll<HTMLElement>('[data-logo-wall-item]')
			);

			// Store original targets for cloning
			const originalTargets = items
				.map(item =>
					item.querySelector<HTMLElement>('[data-logo-wall-target]')
				)
				.filter(Boolean) as HTMLElement[];

			if (originalTargets.length === 0) return;

			let visibleItems: HTMLElement[] = [];
			let visibleCount = 0;
			let pool: HTMLElement[] = [];
			let pattern: number[] = [];
			let patternIndex = 0;
			let tl: gsap.core.Timeline | null = null;

			function isVisible(el: HTMLElement): boolean {
				return window.getComputedStyle(el).display !== 'none';
			}

			function shuffleArray<T>(arr: T[]): T[] {
				const a = arr.slice();
				for (let i = a.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[a[i], a[j]] = [a[j], a[i]];
				}
				return a;
			}

			function setup() {
				if (tl) {
					tl.kill();
				}

				visibleItems = items.filter(isVisible);
				visibleCount = visibleItems.length;

				if (visibleCount === 0) return;

				pattern = shuffleArray(
					Array.from({ length: visibleCount }, (_, i) => i)
				);
				patternIndex = 0;

				// Remove all injected targets
				items.forEach(item => {
					item.querySelectorAll('[data-logo-wall-target]').forEach(
						old => old.remove()
					);
				});

				// Clone original targets for the pool
				pool = originalTargets.map(
					n => n.cloneNode(true) as HTMLElement
				);

				let front: HTMLElement[];
				let rest: HTMLElement[];

				if (shuffleFront) {
					const shuffledAll = shuffleArray(pool);
					front = shuffledAll.slice(0, visibleCount);
					rest = shuffleArray(shuffledAll.slice(visibleCount));
				} else {
					front = pool.slice(0, visibleCount);
					rest = shuffleArray(pool.slice(visibleCount));
				}

				pool = front.concat(rest);

				// Append initial targets to visible items
				for (let i = 0; i < visibleCount; i++) {
					const parent =
						visibleItems[i].querySelector<HTMLElement>(
							'[data-logo-wall-target-parent]'
						) || visibleItems[i];
					const target = pool.shift();
					if (target && parent) {
						parent.appendChild(target);
					}
				}

				tl = gsap.timeline({ repeat: -1, repeatDelay: LOOP_DELAY });
				tl.call(swapNext);
				tl.play();
			}

			function swapNext() {
				const nowCount = items.filter(isVisible).length;
				if (nowCount !== visibleCount) {
					setup();
					return;
				}
				if (!pool.length || !tl) return;

				const idx = pattern[patternIndex % visibleCount];
				patternIndex++;

				const container = visibleItems[idx];
				if (!container) return;

				const parent =
					container.querySelector<HTMLElement>(
						'[data-logo-wall-target-parent]'
					) ||
					container.querySelector<HTMLElement>(
						'*:has(> [data-logo-wall-target])'
					) ||
					container;

				if (!parent) return;

				const existing = parent.querySelectorAll(
					'[data-logo-wall-target]'
				);
				if (existing.length > 1) return;

				const current = parent.querySelector<HTMLElement>(
					'[data-logo-wall-target]'
				);
				const incoming = pool.shift();

				if (!incoming) return;

				gsap.set(incoming, { yPercent: 50, autoAlpha: 0 });
				parent.appendChild(incoming);

				if (current) {
					gsap.to(current, {
						yPercent: -50,
						autoAlpha: 0,
						duration: DURATION,
						ease: 'expo.inOut',
						onComplete: () => {
							current.remove();
							pool.push(current);
						},
					});
				}

				gsap.to(incoming, {
					yPercent: 0,
					autoAlpha: 1,
					duration: DURATION,
					delay: 0.1,
					ease: 'expo.inOut',
				});
			}

			setup();

			// Handle visibility changes
			const handleVisibilityChange = () => {
				if (document.hidden) {
					tl?.pause();
				} else {
					tl?.play();
				}
			};

			document.addEventListener(
				'visibilitychange',
				handleVisibilityChange
			);

			// ScrollTrigger to pause/resume
			const scrollTrigger = ScrollTrigger.create({
				trigger: root,
				scroller: wrapperRef?.current,
				start: 'top bottom',
				end: 'bottom top',
				onEnter: () => tl?.play(),
				onLeave: () => tl?.pause(),
				onEnterBack: () => tl?.play(),
				onLeaveBack: () => tl?.pause(),
			});

			// Cleanup
			return () => {
				document.removeEventListener(
					'visibilitychange',
					handleVisibilityChange
				);
				scrollTrigger.kill();
				if (tl) {
					tl.kill();
				}
			};
		},
		{ scope: jacketRef, dependencies: [clients] }
	);

	return (
		<S.Jacket
			ref={jacketRef}
			data-logo-wall-shuffle='false'
			data-logo-wall-cycle-init=''
			className='logo-wall'
		>
			<S.Collection>
				<S.List ref={listRef} data-logo-wall-list=''>
					{clients.map((client, i) => (
						<S.ListItem key={client.id || i} data-logo-wall-item=''>
							<S.LogoWall data-logo-wall-target-parent=''>
								<S.LogoBefore className='logo-wall__logo-before' />

								<S.LogoTarget data-logo-wall-target=''>
									<SRCImage
										data={client.logo?.responsiveImage}
										usePlaceholder={false}
									/>
								</S.LogoTarget>
							</S.LogoWall>
						</S.ListItem>
					))}
				</S.List>
			</S.Collection>
		</S.Jacket>
	);
};

// Exports
// ------------
Marquee.displayName = 'Marquee';
export default Marquee;
