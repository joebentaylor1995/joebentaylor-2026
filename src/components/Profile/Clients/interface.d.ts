// Imports
// ------------
import { StructuredText, SRCImage } from 'react-datocms';

// Exports
// ------------
export interface ClientsProps {
    isActive?: boolean;
    wrapperRef?: React.RefObject<HTMLElement | null>;
    columnOverride?: number;
    clientsDesc?: StructuredText;
    clients?: ClientProps[];

}

export interface ClientProps {
    id: string;
    name: string;
    logo: ClientLogoProps;
}

export interface ClientLogoProps {
    responsiveImage: SRCImage;
}