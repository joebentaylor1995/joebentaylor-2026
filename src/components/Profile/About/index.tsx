'use client';

import StarHeading from '@parts/StarHeading';
import { useAnimation } from '@utils/useAnimation';
// Imports
// ------------
import Grid from '@waffl';
import gsap from 'gsap';
import { useRef } from 'react';
import { SRCImage, StructuredText } from 'react-datocms';
// Styles + Interfaces
// ------------
import type * as I from './interface';
import Marquee from './Marquee';
import * as S from './styles';

// Component
// ------------
const About = ({ aboutImage, aboutDesc, aboutMarquee, isActive, wrapperRef, columnOverride }: I.AboutProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	// Animation
	useAnimation(
		() => {
			if (!isActive) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: contentRef.current,
					scroller: wrapperRef?.current,
					start: '0% bottom',
					end: '100% top',
					scrub: 0.5,
				},
			});

			tl.to(imageRef.current, {
				yPercent: -20,
				autoAlpha: 0,
				ease: 'none',
			});
		},
		{ scope: jacketRef, dependencies: [isActive] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Background ref={backgroundRef}>
				<S.BackgroundImage ref={imageRef}>
					<SRCImage data={aboutImage?.responsiveImage} />
				</S.BackgroundImage>
			</S.Background>

			<Grid $lCols={columnOverride} ref={contentRef}>
				<S.Sticky $m='1/3' $l='1/4'>
					<StarHeading text='About Me' semantic='h2' />
				</S.Sticky>

				<S.Desc $m='3/7' $l='4/9'>
					<StructuredText data={aboutDesc} />
				</S.Desc>
			</Grid>

			<S.Marquees>
				<Marquee images={aboutMarquee.slice(0, Math.ceil(aboutMarquee.length / 2))} />
				<Marquee images={aboutMarquee.slice(Math.ceil(aboutMarquee.length / 2))} isRight />
			</S.Marquees>
		</S.Jacket>
	);
};

// Exports
// ------------
About.displayName = 'About';
export default About;
