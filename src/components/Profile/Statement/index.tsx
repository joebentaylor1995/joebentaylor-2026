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
	text,
	columnOverride,
	wrapperRef,
	isActive,
}: I.StatementProps) => {
	if (!text) return null;

	// Refs
	const textRef = useRef<HTMLElement>(null);
	const jacketRef = useRef<HTMLElement>(null);

	// Split text and animate on scroll
	useAnimation(
		({ isDesktop }) => {
			if (!textRef.current || !wrapperRef?.current) return;

			new SplitText(textRef.current, {
				type: 'words, chars',
				autoSplit: true,
				onSplit(self) {
					let tl = gsap.timeline({
						scrollTrigger: {
							scrub: true,
							trigger: textRef.current,
							scroller: wrapperRef?.current,
							start: 'top 90%',
							end: 'center 50%',
						},
					});

					tl.from(self.chars, {
						autoAlpha: 0.2,
						stagger: 0.1,
						ease: 'linear',
					});
				},
			});
		},
		{ scope: jacketRef, dependencies: [text, wrapperRef, isActive] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<Grid $lCols={columnOverride}>
				<S.Text $m='1/5' $l='1/7' ref={textRef}>
					{text}
				</S.Text>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Statement.displayName = 'Statement';
export default Statement;
