'use client';

import StarHeading from '@parts/StarHeading';
import { useAnimation } from '@utils/useAnimation';
import { useResponsive } from '@utils/useResponsive';
// Imports
// ------------
import Grid from '@waffl';
import gsap from 'gsap';
import { useRef } from 'react';
import { StructuredText } from 'react-datocms';
import Carousel from './Carousel';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Reviews = ({ isActive, wrapperRef, columnOverride, reviewsDesc, reviews }: I.ReviewsProps) => {
	// Responsive Hook
	const { isDesktop } = useResponsive();

	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);

	// DRY Render
	const helperRender = (isMobile: boolean) => {
		return <S.Helper $isMobile={isMobile}>Drag + Slide to Navigate</S.Helper>;
	};

	// Animation
	useAnimation(
		() => {
			const checkRef = !carouselRef.current || !jacketRef.current || !wrapperRef?.current;
			if (checkRef) return;

			gsap.set(carouselRef.current, {
				xPercent: 100,
				autoAlpha: 0,
			});

			gsap.to(carouselRef.current, {
				xPercent: 0,
				autoAlpha: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: wrapperRef?.current,
					start: 'top 100%',
					end: 'top 70%',
					scrub: 0.5,
				},
			});
		},
		{ scope: jacketRef, dependencies: [isActive] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<Grid $lCols={columnOverride} $noMargin>
				<S.Content $l='1/5'>
					<StarHeading text='Reviews' semantic='h2' />

					<S.Desc>
						<StructuredText data={reviewsDesc} />
					</S.Desc>

					{isDesktop && helperRender(false)}
				</S.Content>

				<S.Carousel $l='5/9' ref={carouselRef}>
					<Carousel reviews={reviews} isActive={isActive} />
					{!isDesktop && helperRender(true)}
				</S.Carousel>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Reviews.displayName = 'Reviews';
export default Reviews;
