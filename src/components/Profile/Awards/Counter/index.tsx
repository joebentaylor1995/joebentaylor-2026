'use client';

// Imports
// ------------
import { useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Counter = ({
	count,
	id,
	wrapperRef,
	isActive,
	parentRef,
}: I.CounterProps) => {
	// Refs
	const jacketRef = useRef<HTMLParagraphElement | null>(null);

	// Animation
	useAnimation(
		({ isDesktop }) => {
			if (!jacketRef.current || !parentRef || !isActive) return;

			// Set element's textContent to target count (gsap.from animates FROM 0 TO this value)
			jacketRef.current.textContent = String(count);

			gsap.from(jacketRef.current, {
				textContent: 0,
				duration: 1.2,
				ease: 'power2.out',
				snap: { textContent: 1 },
				immediateRender: false,
				scrollTrigger: {
					scroller: wrapperRef?.current || undefined,
					trigger: parentRef,
					start: 'top 90%', // when top of trigger hits 90% of viewport
					toggleActions: 'play none none reverse',
				},
				onUpdate: function () {
					const textContent = (this.targets()[0] as HTMLElement)
						.textContent;
					const val = Math.ceil(Number(textContent) || 0);
					const formattedCount = val < 10 ? `0${val}` : `${val}`;
					(this.targets()[0] as HTMLElement).textContent =
						formattedCount;
				},
			});
		},
		{
			scope: jacketRef,
			dependencies: [count, wrapperRef, isActive, parentRef],
		}
	);

	// Initial value is 00 so animation can work
	return (
		<S.Jacket ref={jacketRef} id={id}>
			00
		</S.Jacket>
	);
};

// Exports
// ------------
Counter.displayName = 'Counter';
export default Counter;
