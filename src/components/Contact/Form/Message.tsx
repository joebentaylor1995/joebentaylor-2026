'use client';

// Imports
// ------------
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import * as S from './styles';

// Interfaces
// ------------
interface MessageProps {
	children: React.ReactNode;
	type: 'robot' | 'user';
	messageKey: string;
	delay?: number;
}

// Track animated messages globally (shared across all Message instances)
// Export a function to clear this set when form resets
const animatedMessages = new Set<string>();

export const clearAnimatedMessages = () => {
	animatedMessages.clear();
};

// Component
// ------------
const Message = ({ children, type, messageKey, delay = 0 }: MessageProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		// Skip if this message has already been animated
		if (animatedMessages.has(messageKey)) {
			// Make sure it's visible
			gsap.set(ref.current, { autoAlpha: 1, yPercent: 0 });
			// Also set children visible for robot messages
			if (type === 'robot') {
				const statements =
					ref.current.querySelectorAll('[data-statement]');
				const questions =
					ref.current.querySelectorAll('[data-question]');
				gsap.set([...statements, ...questions], {
					autoAlpha: 1,
					yPercent: 0,
				});
			}
			return;
		}

		// Mark as animated immediately to prevent re-animation
		animatedMessages.add(messageKey);

		const el = ref.current;

		// For robot messages, animate statement and question separately with stagger
		if (type === 'robot') {
			const statements = el.querySelectorAll('[data-statement]');
			const questions = el.querySelectorAll('[data-question]');

			// Set initial state for all children
			gsap.set([...statements, ...questions], {
				autoAlpha: 0,
				yPercent: 100,
			});

			// Create timeline for staggered animation
			const tl = gsap.timeline({ delay: delay });

			// Animate statements first
			if (statements.length > 0) {
				tl.to(statements, {
					autoAlpha: 1,
					yPercent: 0,
					duration: 0.6,
					ease: 'power2.out',
					stagger: 0.1,
				});
			}

			// Then animate questions with a slight delay after statements
			if (questions.length > 0) {
				tl.to(
					questions,
					{
						autoAlpha: 1,
						yPercent: 0,
						duration: 0.6,
						ease: 'power2.out',
						stagger: 0.1,
					},
					statements.length > 0 ? '-=0.4' : 0
				);
			}

			// Cleanup on unmount
			return () => {
				tl.kill();
			};
		} else {
			// For user messages, animate the whole message
			gsap.set(el, { autoAlpha: 0, yPercent: 100 });

			const tween = gsap.to(el, {
				autoAlpha: 1,
				yPercent: 0,
				duration: 0.6,
				ease: 'power2.out',
				delay: delay,
				force3D: true,
			});

			// Cleanup on unmount
			return () => {
				tween.kill();
			};
		}
	}, [delay, type, messageKey]);

	const Component = type === 'robot' ? S.Robot : S.User;

	return <Component ref={ref}>{children}</Component>;
};

// Exports
// ------------
Message.displayName = 'Message';
export default Message;
