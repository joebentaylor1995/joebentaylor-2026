// Imports
// ------------
import { SRCImage } from 'react-datocms';

// Exports
// ------------
export interface MarqueeProps {
    wrapperRef?: React.RefObject<HTMLElement | null>;
    clients?: {
        id: string;
        name: string;
        logo: {
            responsiveImage: SRCImage;
        };
    }[];
}