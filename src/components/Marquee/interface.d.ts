// Imports
// ------------

// Exports
// ------------
export interface MarqueeProps {
    children: React.ReactNode;
    direction?: 'left' | 'right';
    speed?: number;
    autoClone?: boolean;
    cloneCount?: number;
}