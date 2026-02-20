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
	const headingSplitRef = useRef<SplitText | null>(null);
	const descSplitRef = useRef<SplitText | null>(null);
	const headingTlRef = useRef<gsap.core.Timeline | null>(null);
	const descTlRef = useRef<gsap.core.Timeline | null>(null);

	// Split text and animate on scroll
	useAnimation(
		({ isDesktop }) => {
			if (!textRef.current || !wrapperRef?.current || !descRef.current)
				return;

			// Revert and kill previous instances
			if (headingTlRef.current) {
				headingTlRef.current.kill();
				headingTlRef.current = null;
			}
			if (headingSplitRef.current) {
				headingSplitRef.current.revert();
				headingSplitRef.current = null;
			}
			if (descTlRef.current) {
				descTlRef.current.kill();
				descTlRef.current = null;
			}
			if (descSplitRef.current) {
				descSplitRef.current.revert();
				descSplitRef.current = null;
			}

			// Heading animation
			headingSplitRef.current = new SplitText(textRef.current, {
				type: 'words, chars',
				autoSplit: true,
				onSplit(self) {
					headingTlRef.current = gsap.timeline({
						scrollTrigger: {
							scrub: true,
							trigger: textRef.current,
							scroller: wrapperRef?.current,
							start: 'top 90%',
							end: 'center 50%',
						},
					});

					headingTlRef.current.from(self.chars, {
						autoAlpha: 0,
						stagger: 0.1,
						ease: 'linear',
					});
				},
			});

			// Description animation (only if mark exists)
			const boldTextOnly = descRef.current.querySelector('mark');
			if (boldTextOnly) {
				descSplitRef.current = new SplitText(boldTextOnly, {
					type: 'words, chars',
					mask: 'chars',
					autoSplit: true,
					onSplit(self) {
						descTlRef.current = gsap.timeline({
							scrollTrigger: {
								scrub: true,
								trigger: descRef.current,
								scroller: wrapperRef?.current,
								start: 'top 70%',
								end: 'center 40%',
							},
						});

						descTlRef.current.from(self.chars, {
							autoAlpha: 0,
							stagger: 0.1,
							ease: 'linear',
						});
					},
				});
			}

			return () => {
				if (headingTlRef.current) {
					headingTlRef.current.kill();
					headingTlRef.current = null;
				}
				if (headingSplitRef.current) {
					headingSplitRef.current.revert();
					headingSplitRef.current = null;
				}
				if (descTlRef.current) {
					descTlRef.current.kill();
					descTlRef.current = null;
				}
				if (descSplitRef.current) {
					descSplitRef.current.revert();
					descSplitRef.current = null;
				}
			};
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
