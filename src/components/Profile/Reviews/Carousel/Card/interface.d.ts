// Imports
// ------------
import { SRCImage } from 'react-datocms';

// Exports
// ------------
export interface CardProps {
    id: string;
    quote: string;
    authorName: string;
    authorRole: string;
    authorPicture?: {
        responsiveImage: SRCImage;
    };
    authorCompany?: {
        responsiveImage: SRCImage;
    };
}