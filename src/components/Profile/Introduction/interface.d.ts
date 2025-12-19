// Imports
// ------------

// Exports
// ------------
export interface IntroductionProps {
    isActive?: boolean;
    introSubheading: string;
    introHeading: {
        heading: string;
    }[];
    introText: {
        value: string;
    };
    columnOverride?: number;
}