'use client';

// Imports
// ------------
import Grid from '@waffl';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useAnimation } from '@utils/useAnimation';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const AnimatedSplitter = ({
	columnOverride,
	wrapperRef,
	isActive,
}: I.AnimatedSplitterProps) => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const lineRef = useRef<HTMLHRElement>(null);

	// Animation
	useAnimation(
		({ isDesktop }) => {
			if (!lineRef.current || !wrapperRef?.current) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: lineRef.current,
					scroller: wrapperRef?.current,
					start: 'top 100%',
					end: 'bottom 60%',
					scrub: 0.5,
					markers: false,
				},
			});

			tl.to(lineRef.current, { scaleX: 1, ease: 'none' });
		},
		{ scope: jacketRef, dependencies: [isActive] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<Grid $lCols={columnOverride}>
				<S.Col>
					<S.Line ref={lineRef} />
				</S.Col>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
AnimatedSplitter.displayName = 'AnimatedSplitter';
export default AnimatedSplitter;
