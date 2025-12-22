// Imports
// ------------

// Exports
// ------------
export interface ServicesProps {
    isActive?: boolean;
    wrapperRef?: React.RefObject<HTMLElement | null>;
    columnOverride?: number;
    services?: ServiceProps[];
}

export interface ServiceProps {
    id: string;
    heading: string;
    description: string;
}