'use client';

// Imports
// ------------
import Grid from '@waffl';
import SplitText from 'gsap/SplitText';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useAnimation } from '@utils/useAnimation';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Statement = ({
	statement,
	columnOverride,
	wrapperRef,
	isActive,
}: I.StatementProps) => {
	if (!statement) return null;

	// Refs
	const textRef = useRef<HTMLElement>(null);
	const jacketRef = useRef<HTMLElement>(null);
	const splitRef = useRef<SplitText | null>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	// Split text and animate on scroll
	useAnimation(
		({ isDesktop }) => {
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
