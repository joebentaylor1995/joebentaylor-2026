'use client';

// Imports
// ------------
import Grid from '@waffl';
import Carousel from './Carousel';
import StarHeading from '@parts/StarHeading';
import { StructuredText } from 'react-datocms';
import { useResponsive } from '@utils/useResponsive';

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

	// DRY Render
	const helperRender = (isMobile: boolean) => {
		return (
			<S.Helper $isMobile={isMobile}>Drag + Slide to Navigate</S.Helper>
		);
	};

	return (
		<S.Jacket>
			<Grid $lCols={columnOverride} $noMargin>
				<S.Content $l='1/5'>
					<StarHeading text='Reviews' semantic='h2' />

					<S.Desc>
						<StructuredText data={reviewsDesc} />
					</S.Desc>

					{isDesktop && helperRender(false)}
				</S.Content>

				<S.Carousel $l='5/9'>
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
