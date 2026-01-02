// Imports
// ------------
import { SRCImage } from 'react-datocms';

// Exports
// ------------
export interface MarqueeProps {
    isRight?: boolean;
    images: {
        id: string;
        responsiveImage: SRCImage;
    }[];
}