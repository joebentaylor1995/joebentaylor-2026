// Imports
// ------------

import { IntroductionProps } from './Introduction/interface';

// Exports
// ------------
export interface ProfileProps extends IntroductionProps {
    statement?: string;
}

export interface SmoothScrollProps {
	wrapperRef: React.RefObject<HTMLDivElement | null>;
	contentRef: React.RefObject<HTMLDivElement | null>;
	isActive: boolean;
}