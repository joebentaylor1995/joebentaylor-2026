'use client';

// Imports
// ------------
import Grid from '@waffl';
import StarHeading from '@parts/StarHeading';
import { StructuredText, SRCImage } from 'react-datocms';
import { useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const About = ({
	aboutImage,
	aboutDesc,
	isActive,
	wrapperRef,
	columnOverride,
}: I.AboutProps) => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLElement>(null);

	// Animation
	useAnimation(
		({ isDesktop }) => {
			if (!isActive) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: wrapperRef?.current,
					start: 'top 0%',
					end: 'bottom 0%',
					scrub: 0.5,
					markers: false,
				},
			});

			tl.to(imageRef.current, {
				yPercent: -20,
				ease: 'none',
			});
		},
		{ scope: jacketRef, dependencies: [isActive] }
	);

	return (
		<>
			<S.Jacket ref={jacketRef}>
				<S.Background>
					<S.BackgroundImage ref={imageRef}>
						<SRCImage data={aboutImage?.responsiveImage} />
					</S.BackgroundImage>
				</S.Background>

				<Grid $lCols={columnOverride}>
					<S.Sticky $m='1/3' $l='1/4'>
						<StarHeading text='About Me' semantic='h2' />
					</S.Sticky>

					<S.Desc $m='3/7' $l='4/9'>
						<StructuredText data={aboutDesc} />
					</S.Desc>
				</Grid>
			</S.Jacket>

			<div style={{ height: '100dvh' }} />
		</>
	);
};

// Exports
// ------------
About.displayName = 'About';
export default About;
