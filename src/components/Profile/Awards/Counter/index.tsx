'use client';

// Imports
// ------------
import { useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { animateNeonFlicker } from '@utils/animateNeonFlicker';

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
	const splitTextRef = useRef<SplitText | null>(null);

	// Animation
	useAnimation(
		({ isDesktop }) => {
			if (!jacketRef.current || !parentRef || !isActive) return;

			const element = jacketRef.current;
			const targetText = count < 10 ? `0${count}` : `${count}`;

			// Revert any previous split
			if (splitTextRef.current) {
				splitTextRef.current.revert();
				splitTextRef.current = null;
			}

			// Set initial text for splitting
			element.textContent = '00';

			// Split the text into characters before animation
			splitTextRef.current = SplitText.create(element, {
				type: 'chars',
				charsClass: 'char++',
			});

			if (
				!splitTextRef.current.chars ||
				splitTextRef.current.chars.length === 0
			) {
				return;
			}

			// Set initial state - characters visible
			gsap.set(splitTextRef.current.chars, { autoAlpha: 1 });

			// Create timeline with ScrollTrigger
			const tl = gsap.timeline({
				scrollTrigger: {
					scroller: wrapperRef?.current || undefined,
					trigger: parentRef,
					start: 'top 90%',
					toggleActions: 'play reverse play reverse',
				},
			});

			// Start neon flicker animation immediately
			animateNeonFlicker(splitTextRef.current.chars, tl);

			// Counting animation - update characters' textContent during counting
			const countObj = { value: 0 };
			tl.to(
				countObj,
				{
					value: count,
					duration: 1.2,
					ease: 'power2.out',
					snap: { value: 1 },
					onUpdate: function () {
						const currentVal = Math.ceil(countObj.value);
						const formattedCount =
							currentVal < 10
								? `0${currentVal}`
								: `${currentVal}`;

						// Update each character's textContent
						splitTextRef.current?.chars?.forEach((char, index) => {
							if (char) {
								char.textContent = formattedCount[index] || '';
							}
						});
					},
					onComplete: function () {
						// Ensure final text is set
						splitTextRef.current?.chars?.forEach((char, index) => {
							if (char) {
								char.textContent = targetText[index] || '';
							}
						});
					},
				},
				0 // Start at the same time as flicker
			);
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
