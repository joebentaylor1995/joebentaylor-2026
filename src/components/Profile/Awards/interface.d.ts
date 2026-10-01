// Imports
// ------------

import { StructuredText } from 'react-datocms';
import { CounterProps } from './Counter/interface';

// Exports
// ------------
export interface AwardsProps {
	isActive?: boolean;
	wrapperRef?: React.RefObject<HTMLElement | null>;
	columnOverride?: number;
	awardsDesc?: StructuredText;
	awards?: CounterProps[];
}
