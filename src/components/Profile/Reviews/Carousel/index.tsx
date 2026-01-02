'use client';

// Imports
// ------------
import Card from './Card';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useAnimation } from '@utils/useAnimation';
import { useRef } from 'react';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Carousel = ({ reviews, isActive }: I.CarouselProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const initRef = useRef<HTMLDivElement>(null);
	const wrapRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLUListElement>(null);
	const slideRefs = useRef<(HTMLLIElement | null)[]>([]);

	// Animation
	useAnimation(
		({ isDesktop }) => {
			const init = initRef.current;
			const wrap = wrapRef.current;
			const slider = sliderRef.current;
			const slides = slideRefs.current.filter(
				(slide): slide is HTMLLIElement => slide !== null
			);

			if (!init || !wrap || !slider || !slides.length) return;

			// Attributes with defaults
			const minScale =
				parseFloat(init.getAttribute('data-scale') || '') || 0.45;
			const maxRotation =
				parseFloat(init.getAttribute('data-rotate') || '') || -8;
			const inertia = true;

			wrap.style.touchAction = 'none';
			wrap.style.userSelect = 'none';

			let spacing = 0;
			let slideW = 0;
			let maxDrag = 0;
			let dragX = 0;
			let draggable: Draggable | null = null;

			// Simple clamp that always uses latest maxDrag
			function clamp(value: number): number {
				if (maxDrag <= 0) return 0;
				return Math.min(Math.max(value, 0), maxDrag);
			}

			function update() {
				// Move the whole list
				gsap.set(slider, { x: -dragX });

				// Update each slide's overlap transform
				slides.forEach((slide, i) => {
					const threshold = i * spacing;
					const local = Math.max(0, dragX - threshold);
					const t = spacing > 0 ? Math.min(local / spacing, 1) : 0;

					gsap.set(slide, {
						x: local,
						scale: 1 - (1 - minScale) * t,
						rotation: maxRotation * t,
						transformOrigin: '75% center',
						opacity: 1 - t,
					});
				});
			}

			function recalc() {
				if (!slides.length) return;

				// Measure one slide to get width + margin-right as "gap"
				const style = getComputedStyle(slides[0]);
				const gapRight = parseFloat(style.marginRight) || 0;

				slideW = slides[0].offsetWidth;
				spacing = slideW + gapRight;
				maxDrag = spacing * (slides.length - 1);

				// Keep dragX within new bounds
				dragX = clamp(dragX);
				update();

				if (draggable) {
					draggable.applyBounds({ minX: -maxDrag, maxX: 0 });
				}
			}

			// Create draggable
			draggable = Draggable.create(slider, {
				type: 'x',
				bounds: { minX: -maxDrag, maxX: 0 }, // Will be updated after recalc
				inertia,
				maxDuration: 1,
				snap: (raw: number) => {
					// raw is the x value
					const d = clamp(-raw);
					const idx = spacing > 0 ? Math.round(d / spacing) : 0;
					return -idx * spacing;
				},
				onDrag() {
					dragX = clamp(-this.x);
					update();
				},
				onThrowUpdate() {
					dragX = clamp(-this.x);
					update();
				},
			})[0];

			// Recalc on resize
			const ro = new ResizeObserver(() => {
				recalc();
			});
			ro.observe(init);

			// Keyboard navigation (arrow left/right)
			let active = false;
			let currentIndex = 0;

			// Helper function to switch slides
			function goToSlide(idx: number) {
				idx = Math.max(0, Math.min(idx, slides.length - 1));
				currentIndex = idx;

				const targetX = idx * spacing;

				gsap.to(
					{ value: dragX },
					{
						value: targetX,
						duration: 0.35,
						ease: 'power4.out',
						onUpdate: function () {
							dragX = this.targets()[0].value;
							gsap.set(slider, { x: -dragX });
							update(); // Animate overlap transforms properly
						},
					}
				);

				if (wrap) {
					wrap.setAttribute(
						'aria-label',
						`Slide ${idx + 1} of ${slides.length}`
					);
				}
			}

			// Observe visibility
			const io = new IntersectionObserver(
				entries => {
					active = entries[0].isIntersecting;
				},
				{
					threshold: 0.25, // Slider must be at least 25% visible
				}
			);

			io.observe(init);

			// Aria labels for accessibility
			if (wrap) {
				wrap.setAttribute('role', 'region');
				wrap.setAttribute('aria-roledescription', 'carousel');
				wrap.setAttribute('aria-label', 'Testimonial slider');
			}

			// Key listener
			function onKey(e: KeyboardEvent) {
				if (!active) return; // Only respond when slider in view

				if (e.key === 'ArrowLeft') {
					e.preventDefault();
					goToSlide(currentIndex - 1);
				}

				if (e.key === 'ArrowRight') {
					e.preventDefault();
					goToSlide(currentIndex + 1);
				}
			}

			window.addEventListener('keydown', onKey);

			// Initial layout
			recalc();

			// Cleanup
			return () => {
				if (draggable) {
					draggable.kill();
				}
				ro.disconnect();
				io.disconnect();
				window.removeEventListener('keydown', onKey);
			};
		},
		{
			scope: initRef,
			dependencies: [reviews, isActive],
		}
	);

	if (!reviews || reviews.length === 0) return null;

	return (
		<S.Jacket data-interactive data-overlap-slider-init ref={initRef}>
			<S.Collection ref={wrapRef} data-overlap-slider-collection>
				<S.List ref={sliderRef} data-overlap-slider-list>
					{reviews.map((review, index) => (
						<S.ListItem
							data-overlap-slider-item
							key={review.id}
							ref={el => {
								slideRefs.current[index] = el;
							}}
						>
							<Card
								id={review.id}
								quote={review.quote}
								authorName={review.authorName}
								authorRole={review.authorRole}
								authorPicture={review.authorPicture}
								authorCompany={review.authorCompany}
							/>
						</S.ListItem>
					))}
				</S.List>
			</S.Collection>
		</S.Jacket>
	);
};

// Exports
// ------------
Carousel.displayName = 'Carousel';
export default Carousel;
