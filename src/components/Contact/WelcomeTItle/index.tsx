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
const WelcomeTitle = ({
	text = 'Hello',
	shouldAnimate = false,
}: I.WelcomeTitleProps) => {
	// Refs
	const jacketRef = useRef<HTMLHeadingElement>(null);
	const splitTextRef = useRef<SplitText | null>(null);

	// Animation
	useAnimation(
		() => {
			if (!shouldAnimate || !jacketRef.current) return;

			const heading = jacketRef.current;

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

			// Create timeline with delay and animate neon flicker
			const tl = gsap.timeline({ delay: 0.5 });
			animateNeonFlicker(chars, tl);

			// Cleanup
			return () => {
				if (splitTextRef.current) {
					splitTextRef.current.revert();
					splitTextRef.current = null;
				}
			};
		},
		{ scope: jacketRef, dependencies: [shouldAnimate, text] }
	);

	return <S.Jacket ref={jacketRef}>{text}</S.Jacket>;
};

// Exports
// ------------
WelcomeTitle.displayName = 'WelcomeTitle';
export default WelcomeTitle;
