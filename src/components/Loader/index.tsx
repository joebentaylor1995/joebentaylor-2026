'use client';

// Imports
// ------------
import { useState, useLayoutEffect, useRef, use } from 'react';
import { SRCImage } from 'react-datocms';
import { useAnimation } from '@/utils/useAnimation';
import { gsap } from 'gsap';
import { bezzy4, bezzy3 } from '@parts/AnimationPlugins/Curves';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

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

			// Get bounding info of last item
			const lastItem = items[items.length - 1];
			const lastItemRect = lastItem.getBoundingClientRect();
			const listRect = list.getBoundingClientRect();
			const viewportHeight = window.innerHeight;

			// Calculate current center of last item and required delta to put it in viewport center
			const lastItemCenter = lastItemRect.top + lastItemRect.height / 2;
			const viewportCenter = viewportHeight / 2;
			const deltaY = viewportCenter - lastItemCenter;

			// Get all ImageScale elements for parallax effect
			const imageScales = items
				.map(item => item.querySelector('[data-image-scale]'))
				.filter((el): el is HTMLElement => el !== null);

			// Set initial parallax offset for images
			if (imageScales.length > 0) {
				gsap.set(imageScales, {
					yPercent: -12, // Start at -6% offset
				});
			}

			// Set initial position of list offscreen
			gsap.set(list, {
				y: window.innerHeight - listRect.top, // start completely out of view + buffer
			});

			// Calculate the deltaY for each item (same movement for all, but staggered)
			const itemDeltaY = deltaY - (window.innerHeight - listRect.top);

			// Set initial y position for items (they start at 0 relative to list)
			gsap.set(items, {
				y: 0,
			});

			// Create timeline for coordinated animations
			const tl = gsap.timeline({
				delay: 0.3,
				onComplete: () => {
					// Fade out the loader before unrendering
					if (jacketRef.current) {
						gsap.to(jacketRef.current, {
							autoAlpha: 0,
							duration: 0.5,
							ease: bezzy3,
							onComplete: () => {
								// Unrender after fade out completes
								setLoaderFinished(true);
								setShouldUnrender(true);
							},
						});
					} else {
						setLoaderFinished(true);
						setShouldUnrender(true);
					}
				},
			});

			// Animate counter from 0% to 100%
			if (counterRef.current) {
				const counterSpan = counterRef.current.querySelector('span');
				const counterObj = { value: 0 };
				tl.to(counterObj, {
					value: 100,
					duration: 2,
					ease: bezzy4,
					onUpdate: () => {
						if (counterSpan) {
							counterSpan.textContent = `${Math.round(counterObj.value)}%`;
						}
					},
				});
			}

			// Animate each item individually with stagger (starts after counter completes)
			tl.to(
				items,
				{
					y: `+=${itemDeltaY}`,
					ease: bezzy4,
					duration: 2,
					stagger: 0.05, // Stagger each item's movement by 0.05s
				}
				// No position parameter - starts after previous animation (counter) completes
			);

			// Fade out counter simultaneously with list animations
			if (counterRef.current) {
				tl.to(
					counterRef.current,
					{
						autoAlpha: 0, // Fade out (opacity + visibility)
						duration: 1,
						ease: bezzy4,
					},
					'<' // Start at the same time as the previous animation (list)
				);
			}

			// Add parallax effect to images - animate from -12% to 0% during list animation
			if (imageScales.length > 0) {
				tl.to(
					imageScales,
					{
						yPercent: 0, // Finish at 0% (natural position)
						duration: 2.4,
						ease: bezzy4,
					},
					'<0.5' // Start 0.5s after the previous animation (list) starts
				);
			}

			// Get the last item's Image container (the outer 20vw container) for scaling to fullscreen
			const lastItemImageContainer =
				lastItem.firstElementChild as HTMLElement | null;

			// Get the last item's ImageClip element for clip-path animation
			const lastItemImageClip = lastItem.querySelector(
				'[data-image-clip]'
			) as HTMLElement | null;

			// Get the last item's ImageScale element for scaling animation
			const lastItemImageScale = lastItem.querySelector(
				'[data-image-scale]'
			) as HTMLElement | null;

			// Get all items except the last one for fade out
			const otherItems = items.slice(0, -1);

			// After animation completes, scale last item's Image container to 5 and animate clip-path
			if (lastItemImageContainer) {
				tl.to(
					lastItemImageContainer,
					{
						scale: 5, // 20vw * 5 = 100vw (fullscreen)
						ease: bezzy4,
						duration: 1.5,
					},
					'-=1' // Start slightly before previous animations complete
				);

				// Animate clip-path simultaneously with scaling
				if (lastItemImageClip) {
					tl.to(
						lastItemImageClip,
						{
							clipPath: 'inset(0% round 0rem)', // Remove border radius
							ease: bezzy4,
							duration: 1.5,
						},
						'<' // Start at the same time as the previous animation (scale)
					);
				}

				// Scale ImageScale to 1 simultaneously with other animations
				if (lastItemImageScale) {
					tl.to(
						lastItemImageScale,
						{
							scale: 1, // Scale from 1.4 to 1
							ease: bezzy4,
							duration: 1.5,
							onStart: () => setLoaderFinishing(true),
						},
						'<' // Start at the same time as the other animations
					);
				}

				// Fade out all other items simultaneously with last item animation
				if (otherItems.length > 0) {
					tl.to(
						otherItems,
						{
							autoAlpha: 0, // Fade out (opacity + visibility)
							ease: bezzy4,
							duration: 1,
						},
						'<' // Start at the same time as the last item animations
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
		<>
			<S.Jacket ref={jacketRef}>
				<S.Counter ref={counterRef}>
					<span>0%</span>
				</S.Counter>

				<ul ref={listRef}>
					{images.map(({ responsiveImage }, i) => {
						return (
							<li
								key={i}
								ref={el => {
									listItemRefs.current[i] = el;
								}}
							>
								<S.Image>
									<S.ImageClip data-image-clip>
										<S.ImageScale data-image-scale>
											<SRCImage
												data={responsiveImage}
												priority
											/>
										</S.ImageScale>
									</S.ImageClip>
								</S.Image>
							</li>
						);
					})}
				</ul>
			</S.Jacket>
		</>
	);
};

// Exports
// ------------
Loader.displayName = 'Loader';
export default Loader;
