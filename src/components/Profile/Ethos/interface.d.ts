// Imports
// ------------
import { StructuredText } from 'react-datocms';

// Exports
// ------------
export interface EthosProps {
    ethosHeading: string;
    ethosText: StructuredText;
    columnOverride?: number;
    wrapperRef?: React.RefObject<HTMLElement | null>;
    isActive?: boolean;
}