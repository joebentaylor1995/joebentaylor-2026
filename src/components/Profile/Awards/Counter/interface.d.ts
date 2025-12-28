// Imports
// ------------

// Exports
// ------------
export interface CounterProps {
    count: number;
    id: string;
    title?: string;
    wrapperRef?: React.RefObject<HTMLElement | null>;
    isActive?: boolean;
    parentRef?: HTMLElement | null;
}