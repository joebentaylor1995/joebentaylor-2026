// Imports
// ------------

// Exports
// ------------
export interface ButtonProps {
    href: string;
    target?: string;
    label: string;
    rel?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link';
}