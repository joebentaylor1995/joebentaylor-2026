'use client';

// Imports
// ------------
import Grid from '@waffl';
import Carousel from './Carousel';
import StarHeading from '@parts/StarHeading';
import { StructuredText } from 'react-datocms';

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
	// console.log(reviews);

	return (
		<S.Jacket>
			<Grid $lCols={columnOverride} $noMargin>
				<S.Content $l='1/5'>
					<StarHeading text='Reviews' semantic='h2' />

					<S.Desc>
						<StructuredText data={reviewsDesc} />
					</S.Desc>

					<S.Helper>Drag + Slide to Navigate</S.Helper>
				</S.Content>

				<S.Carousel $l='5/9'>
					<Carousel reviews={reviews} isActive={isActive} />
				</S.Carousel>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Reviews.displayName = 'Reviews';
export default Reviews;
