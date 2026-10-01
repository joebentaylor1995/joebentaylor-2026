// Imports
// ------------
import { SRCImage, StructuredText } from 'react-datocms';

// Exports
// ------------
export interface ServicesProps {
	isActive?: boolean;
	wrapperRef?: React.RefObject<HTMLElement | null>;
	columnOverride?: number;
	services?: ServiceProps[];
	servicesText?: StructuredText;
}

export interface ServiceProps {
	id: string;
	title: string;
	image: {
		responsiveImage: SRCImage;
	};
}
