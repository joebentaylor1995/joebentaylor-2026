'use client';

// Imports
// ------------
import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { useAnimation } from '@/utils/useAnimation';
import { SRCImage } from 'react-datocms';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Marquee = ({ images, isRight }: I.MarqueeProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const collectionRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);
	const marqueeLoopRef = useRef<gsap.core.Tween | null>(null);
	const marqueeObserverRef = useRef<Observer | null>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
	const cleanupRef = useRef<(() => void) | null>(null);

	useAnimation(
		({ isDesktop }) => {
			const wrapper = wrapperRef.current;
			const collection = collectionRef.current;
			const list = listRef.current;

			if (!wrapper || !collection || !list) return;

			// Cleanup function
			const cleanup = () => {
				// Kill animation
				if (marqueeLoopRef.current) {
					marqueeLoopRef.current.kill();
					marqueeLoopRef.current = null;
				}

				// Kill observer
				if (marqueeObserverRef.current) {
					marqueeObserverRef.current.kill();
					marqueeObserverRef.current = null;
				}

				// Kill scroll trigger
				if (scrollTriggerRef.current) {
					scrollTriggerRef.current.kill();
					scrollTriggerRef.current = null;
				}

				// Remove cloned elements
				const clones = collection.querySelectorAll(
					'[data-draggable-marquee-clone]'
				);
				clones.forEach(clone => clone.remove());

				// Reset collection position
				gsap.set(collection, { x: 0 });
			};

			// Initialize function
			const initialize = () => {
				// Cleanup first
				cleanup();

				if (!wrapper || !collection || !list) return;

				const getNumberAttr = (
					el: HTMLElement,
					name: string,
					fallback: number
				): number => {
					const value = parseFloat(el.getAttribute(name) || '');
					return Number.isFinite(value) ? value : fallback;
				};

				const duration = getNumberAttr(wrapper, 'data-duration', 20);
				const multiplier = getNumberAttr(
					wrapper,
					'data-multiplier',
					40
				);
				const sensitivity = getNumberAttr(
					wrapper,
					'data-sensitivity',
					0.01
				);

				const wrapperWidth = wrapper.getBoundingClientRect().width;
				const listWidth =
					list.scrollWidth || list.getBoundingClientRect().width;
				if (!wrapperWidth || !listWidth) return;

				// Make enough duplicates to cover screen
				const minRequiredWidth = wrapperWidth + listWidth + 2;
				while (collection.scrollWidth < minRequiredWidth) {
					const listClone = list.cloneNode(true) as HTMLElement;
					listClone.setAttribute('data-draggable-marquee-clone', '');
					listClone.setAttribute('aria-hidden', 'true');
					collection.appendChild(listClone);
				}

				const wrapX = gsap.utils.wrap(-listWidth, 0);

				gsap.set(collection, { x: 0 });

				const marqueeLoop = gsap.to(collection, {
					x: -listWidth,
					duration,
					ease: 'none',
					repeat: -1,
					onReverseComplete: () => {
						marqueeLoop.progress(1);
					},
					modifiers: {
						x: x => wrapX(parseFloat(x)) + 'px',
					},
				});

				marqueeLoopRef.current = marqueeLoop;

				// Direction can be used for css + set initial direction on load
				const initialDirectionAttr = (
					wrapper.getAttribute('data-direction') || 'left'
				).toLowerCase();
				const baseDirection = initialDirectionAttr === 'right' ? -1 : 1;

				const timeScale = { value: 1 };

				timeScale.value = baseDirection;
				wrapper.setAttribute(
					'data-direction',
					baseDirection < 0 ? 'right' : 'left'
				);

				if (baseDirection < 0) marqueeLoop.progress(1);

				function applyTimeScale() {
					marqueeLoop.timeScale(timeScale.value);
					if (wrapper) {
						wrapper.setAttribute(
							'data-direction',
							timeScale.value < 0 ? 'right' : 'left'
						);
					}
				}

				applyTimeScale();

				// Drag observer
				const marqueeObserver = Observer.create({
					target: wrapper,
					type: 'pointer,touch',
					preventDefault: true,
					debounce: false,
					onChangeX: observerEvent => {
						let velocityTimeScale =
							observerEvent.velocityX * -sensitivity;
						velocityTimeScale = gsap.utils.clamp(
							-multiplier,
							multiplier,
							velocityTimeScale
						);

						gsap.killTweensOf(timeScale);

						const restingDirection = velocityTimeScale < 0 ? -1 : 1;

						gsap.timeline({ onUpdate: applyTimeScale })
							.to(timeScale, {
								value: velocityTimeScale,
								duration: 0.1,
								overwrite: true,
							})
							.to(timeScale, {
								value: restingDirection,
								duration: 1.0,
							});
					},
				});

				marqueeObserverRef.current = marqueeObserver;

				// Pause marquee when scrolled out of view
				const scrollTrigger = ScrollTrigger.create({
					trigger: wrapper,
					start: 'top bottom',
					end: 'bottom top',
					onEnter: () => {
						marqueeLoop.resume();
						applyTimeScale();
						marqueeObserver.enable();
					},
					onEnterBack: () => {
						marqueeLoop.resume();
						applyTimeScale();
						marqueeObserver.enable();
					},
					onLeave: () => {
						marqueeLoop.pause();
						marqueeObserver.disable();
					},
					onLeaveBack: () => {
						marqueeLoop.pause();
						marqueeObserver.disable();
					},
				});

				scrollTriggerRef.current = scrollTrigger;
			};

			// Initial initialization
			initialize();
			cleanupRef.current = cleanup;

			// Resize handler
			let resizeTimeout: NodeJS.Timeout;
			const handleResize = () => {
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(() => {
					initialize();
				}, 150); // Debounce resize
			};

			window.addEventListener('resize', handleResize, { passive: true });

			return () => {
				window.removeEventListener('resize', handleResize);
				clearTimeout(resizeTimeout);
				if (cleanupRef.current) {
					cleanupRef.current();
				}
			};
		},
		{ scope: wrapperRef }
	);

	return (
		<S.Jacket
			ref={wrapperRef}
			data-interactive
			data-direction={isRight ? 'right' : 'left'}
			data-duration='20'
			data-multiplier='35'
			data-sensitivity='0.01'
			data-hover
		>
			<S.Collection
				ref={collectionRef}
				data-draggable-marquee-collection=''
			>
				<S.List ref={listRef} data-draggable-marquee-list=''>
					{images.map(({ responsiveImage }, i) => (
						<li key={i}>
							<SRCImage data={responsiveImage} />
						</li>
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
