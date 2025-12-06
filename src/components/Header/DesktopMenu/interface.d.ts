// Imports
// ------------

// Exports
// ------------
export interface DesktopMenuProps {
    magneticOptions?: {
        radius?: number;
        strength?: number;
    };
    navItems: readonly { label: string }[];
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}