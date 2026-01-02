// Imports
// ------------
import { ReactNode } from 'react';

// Exports
// ------------
export interface IntroductionProps {
    isActive?: boolean;
    wrapperRef?: React.RefObject<HTMLElement | null>;
    introSubheading: string;
    introHeading: {
        heading: string;
    }[];
    introText: {
        value: string;
    };
    columnOverride?: number;
}