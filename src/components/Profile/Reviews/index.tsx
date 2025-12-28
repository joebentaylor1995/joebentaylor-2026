'use client';

// Imports
// ------------
import Grid from '@waffl';
import Carousel from './Carousel';
import StarHeading from '@parts/StarHeading';
import gsap from 'gsap';
import { StructuredText } from 'react-datocms';
import { useResponsive } from '@utils/useResponsive';
import { useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Reviews = ({
	isActive,
	wrapperRef,
	columnOverride,
	reviewsDesc,
	reviews,
}: I.ReviewsProps) => {
	// Responsive Hook
	const { isDesktop } = useResponsive();

	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);

	// DRY Render
	const helperRender = (isMobile: boolean) => {
		return (
			<S.Helper $isMobile={isMobile}>Drag + Slide to Navigate</S.Helper>
		);
	};

	// Animation
	useAnimation(
		({ isDesktop }) => {
			if (
				!carouselRef.current ||
				!jacketRef.current ||
				!wrapperRef?.current
			)
				return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: wrapperRef?.current,
					start: 'top 100%',
					end: 'top 70%',
					scrub: 0.5,
					markers: false,
				},
			});

			tl.from(carouselRef.current, {
				x: '100%',
				scale: 1.2,
				autoAlpha: 0,
				ease: 'none',
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
