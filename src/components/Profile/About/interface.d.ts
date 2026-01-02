// Imports
// ------------
import { SRCImage, StructuredText } from 'react-datocms';

// Exports
// ------------
export interface AboutProps {
    isActive?: boolean;
    wrapperRef?: React.RefObject<HTMLElement | null>;
    columnOverride?: number;
    aboutImage: {
        responsiveImage: SRCImage;
    };
    aboutDesc: StructuredText;
    aboutMarquee: {
        id: string;
        responsiveImage: SRCImage;
    }[];
}