'use client';

// Imports
// ------------
import { useState, useLayoutEffect, useRef, use } from 'react';
import { SRCImage } from 'react-datocms';
import { useAnimation } from '@/utils/useAnimation';
import { gsap } from 'gsap';
import { bezzy4, bezzy3, bezzy2 } from '@parts/AnimationPlugins/Curves';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Constants
// ------------
const ANIMATION_DELAY = 0.3;
const COUNTER_DURATION = 2;
const LIST_DURATION = 2;
const PARALLAX_DURATION = 2.6;
const SCALE_DURATION = 1.5;
const FADE_DURATION = 1;
const FADE_OUT_DURATION = 0.75;
const STAGGER_DELAY = 0.05;
const INITIAL_PARALLAX_OFFSET = 12;
const FULLSCREEN_SCALE = 5;

// Component
// ------------
const Loader = ({ images }: I.LoaderProps) => {
	// Context
	const { setLoaderFinished, setLoaderFinishing } = use(GlobalContext);

	// State
	const [shouldUnrender, setShouldUnrender] = useState(false);

	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const listRef = useRef<HTMLUListElement>(null);
	const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
	const counterRef = useRef<HTMLDivElement>(null);

	// Set initial position offscreen synchronously before paint
	useLayoutEffect(() => {
		if (listRef.current) {
			const listRect = listRef.current.getBoundingClientRect();
			gsap.set(listRef.current, {
				y: window.innerHeight - listRect.top,
				immediateRender: true,
			});
		}
	}, []);

	useAnimation(
		({ isDesktop }) => {
			if (!listRef.current || !listItemRefs.current.length) return;

			const list = listRef.current;
			const items = listItemRefs.current.filter(
				Boolean
			) as HTMLLIElement[];
			if (items.length === 0) return;

			// Cache DOM measurements
			const viewportHeight = window.innerHeight;
			const viewportCenter = viewportHeight / 2;
			const lastItem = items[items.length - 1];
			const lastItemRect = lastItem.getBoundingClientRect();
			const listRect = list.getBoundingClientRect();

			// Calculate movement deltas
			const lastItemCenter = lastItemRect.top + lastItemRect.height / 2;
			const deltaY = viewportCenter - lastItemCenter;
			const listOffsetY = window.innerHeight - listRect.top;
			const itemDeltaY = deltaY - listOffsetY;

			// Cache DOM queries
			const imageScales = items
				.map(item =>
					item.querySelector<HTMLElement>('[data-image-scale]')
				)
				.filter(Boolean);
			const lastItemImageContainer =
				lastItem.firstElementChild as HTMLElement | null;
			const lastItemImageClip =
				lastItem.querySelector<HTMLElement>('[data-image-clip]');
			const lastItemImageScale =
				lastItem.querySelector<HTMLElement>('[data-image-scale]');
			const otherItems = items.slice(0, -1);

			// Set initial positions
			gsap.set(list, { y: listOffsetY });
			gsap.set(items, { y: 0 });
			if (imageScales.length > 0) {
				gsap.set(imageScales, { yPercent: INITIAL_PARALLAX_OFFSET });
			}

			// Handle completion callback
			const handleComplete = () => {
				if (jacketRef.current) {
					gsap.to(jacketRef.current, {
						autoAlpha: 0,
						scale: 1.2,
						duration: FADE_OUT_DURATION,
						ease: bezzy2,
						onComplete: () => {
							setLoaderFinished(true);
							setShouldUnrender(true);
						},
					});
				} else {
					setLoaderFinished(true);
					setShouldUnrender(true);
				}
			};

			// Create timeline for coordinated animations
			const tl = gsap.timeline({
				delay: ANIMATION_DELAY,
				onComplete: handleComplete,
			});

			// Animate counter from 0% to 100%
			if (counterRef.current) {
				const counterSpan = counterRef.current.querySelector('span');
				const counterObj = { value: 0 };
				tl.to(counterObj, {
					value: 100,
					duration: COUNTER_DURATION,
					ease: bezzy4,
					onUpdate: () => {
						if (counterSpan) {
							counterSpan.textContent = `${Math.round(counterObj.value)}%`;
						}
					},
				});
			}

			// Animate each item individually with stagger (starts after counter completes)
			tl.to(items, {
				y: `+=${itemDeltaY}`,
				ease: bezzy4,
				duration: LIST_DURATION,
				stagger: STAGGER_DELAY,
			});

			// Fade out counter simultaneously with list animations
			if (counterRef.current) {
				tl.to(
					counterRef.current,
					{
						autoAlpha: 0,
						duration: FADE_DURATION,
						ease: bezzy4,
					},
					'<'
				);
			}

			// Add parallax effect to images - animate from 12% to 0% during list animation
			if (imageScales.length > 0) {
				tl.to(
					imageScales,
					{
						yPercent: 0,
						duration: PARALLAX_DURATION,
						ease: bezzy4,
					},
					'0'
				);
			}

			// Scale last item to fullscreen and fade out others
			if (lastItemImageContainer) {
				tl.to(
					lastItemImageContainer,
					{
						scale: FULLSCREEN_SCALE,
						ease: bezzy4,
						duration: SCALE_DURATION,
					},
					'-=1'
				);

				if (lastItemImageClip) {
					tl.to(
						lastItemImageClip,
						{
							clipPath: 'inset(0% round 0rem)',
							ease: bezzy4,
							duration: SCALE_DURATION,
						},
						'<'
					);
				}

				if (lastItemImageScale) {
					tl.to(
						lastItemImageScale,
						{
							scale: 1,
							ease: bezzy4,
							duration: SCALE_DURATION,
							onStart: () => setLoaderFinishing(true),
						},
						'<'
					);
				}

				// Fade out all other items simultaneously with last item animation
				if (otherItems.length > 0) {
					tl.to(
						otherItems,
						{
							autoAlpha: 0,
							ease: bezzy4,
							duration: FADE_DURATION,
						},
						'<'
					);
				}
			}
		},
		{ scope: jacketRef }
	);

	// Unrender after fade out completes
	if (shouldUnrender) {
		return null;
	}

	return (
		<S.Jacket ref={jacketRef}>
			<S.Counter ref={counterRef}>
				<span>0%</span>
			</S.Counter>

			<ul ref={listRef}>
				{images.map(({ responsiveImage }, i) => (
					<li
						key={i}
						ref={el => {
							listItemRefs.current[i] = el;
						}}
					>
						<S.Image>
							<S.ImageClip data-image-clip>
								<S.ImageScale data-image-scale>
									<SRCImage data={responsiveImage} priority />
								</S.ImageScale>
							</S.ImageClip>
						</S.Image>
					</li>
				))}
			</ul>
		</S.Jacket>
	);
};

// Exports
// ------------
Loader.displayName = 'Loader';
export default Loader;
