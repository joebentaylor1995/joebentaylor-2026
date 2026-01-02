// Imports
// ------------
import { CounterProps } from './Counter/interface';
import { StructuredText } from 'react-datocms';

// Exports
// ------------
export interface AwardsProps {
    isActive?: boolean;
    wrapperRef?: React.RefObject<HTMLElement | null>;
    columnOverride?: number;
    awardsDesc?: StructuredText;
    awards?: CounterProps[];
}