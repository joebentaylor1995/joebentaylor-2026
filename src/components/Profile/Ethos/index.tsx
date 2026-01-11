'use client';

// Imports
// ------------
import Grid from '@waffl';
import StarHeading from '@parts/StarHeading';
import { StructuredText } from 'react-datocms';
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
const Ethos = ({
	ethosHeading,
	ethosText,
	columnOverride,
	wrapperRef,
	isActive,
}: I.EthosProps) => {
	// Refs
	const textRef = useRef<HTMLHeadingElement>(null);
	const jacketRef = useRef<HTMLElement>(null);
	const descRef = useRef<HTMLElement>(null);

	// Split text and animate on scroll
	useAnimation(
		({ isDesktop }) => {
			if (!textRef.current || !wrapperRef?.current || !descRef.current)
				return;

			// Heading animation
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
						autoAlpha: 0,
						stagger: 0.1,
						ease: 'linear',
					});
				},
			});

			// Description animation
			const boldTextOnly = descRef.current.querySelector('mark');

			new SplitText(boldTextOnly, {
				type: 'words, chars',
				mask: 'chars',
				autoSplit: true,
				onSplit(self) {
					let tl = gsap.timeline({
						scrollTrigger: {
							scrub: true,
							trigger: descRef.current,
							scroller: wrapperRef?.current,
							start: 'top 70%',
							end: 'center 40%',
						},
					});

					tl.from(self.chars, {
						autoAlpha: 0,
						stagger: 0.1,
						ease: 'linear',
					});
				},
			});
		},
		{ scope: jacketRef, dependencies: [ethosHeading, wrapperRef, isActive] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<Grid $lCols={columnOverride}>
				<S.Content $m='1/7' $l='1/7'>
					<StarHeading text='My Ethos' semantic='h2' />

					<S.Heading ref={textRef}>{ethosHeading}</S.Heading>

					<S.Desc ref={descRef}>
						<StructuredText data={ethosText} />
					</S.Desc>
				</S.Content>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Ethos.displayName = 'Ethos';
export default Ethos;
