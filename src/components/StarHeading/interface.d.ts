// Imports
// ------------

// Exports
// ------------
export interface StarHeadingProps {
    text: string;
    hasRotation?: boolean;
    semantic: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
    passedRef?: React.Ref<HTMLElement>;
    iconOverride?: string;
}