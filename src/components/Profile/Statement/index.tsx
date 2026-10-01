'use client';

import { useAnimation } from '@utils/useAnimation';
// Imports
// ------------
import Grid from '@waffl';
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';
import { useRef } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Statement = ({ statement, columnOverride, wrapperRef, isActive }: I.StatementProps) => {
	// Refs
	const textRef = useRef<HTMLParagraphElement>(null);
	const jacketRef = useRef<HTMLDivElement>(null);
	const splitRef = useRef<SplitText | null>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	// Split text and animate on scroll
	useAnimation(
		() => {
			if (!textRef.current || !wrapperRef?.current) return;

			// Revert previous split before creating new one
			if (splitRef.current) {
				splitRef.current.revert();
				splitRef.current = null;
			}
			if (timelineRef.current) {
				timelineRef.current.kill();
				timelineRef.current = null;
			}

			splitRef.current = new SplitText(textRef.current, {
				type: 'words, chars',
				autoSplit: true,
				onSplit(self) {
					timelineRef.current = gsap.timeline({
						scrollTrigger: {
							scrub: true,
							trigger: textRef.current,
							scroller: wrapperRef?.current,
							start: 'top 90%',
							end: 'center 50%',
						},
					});

					timelineRef.current.from(self.chars, {
						autoAlpha: 0.2,
						stagger: 0.1,
						ease: 'linear',
					});
				},
			});

			return () => {
				if (timelineRef.current) {
					timelineRef.current.kill();
					timelineRef.current = null;
				}
				if (splitRef.current) {
					splitRef.current.revert();
					splitRef.current = null;
				}
			};
		},
		{ scope: jacketRef, dependencies: [statement, wrapperRef, isActive] }
	);

	if (!statement) return null;

	return (
		<S.Jacket ref={jacketRef}>
			<Grid $lCols={columnOverride}>
				<S.Text $m='1/5' $l='1/7' ref={textRef}>
					{statement}
				</S.Text>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Statement.displayName = 'Statement';
export default Statement;
