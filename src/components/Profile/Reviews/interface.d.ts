// Imports
// ------------
import { StructuredText } from 'react-datocms';
import { CarouselProps } from './Carousel/interface';

// Exports
// ------------
export interface ReviewsProps {
	isActive?: boolean;
	wrapperRef?: React.RefObject<HTMLElement | null>;
	columnOverride?: number;
	reviewsDesc?: StructuredText;
	reviews?: CarouselProps['reviews'];
}
