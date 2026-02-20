// Imports
// ------------

// Exports
// ------------
export interface DesktopMenuProps {
    magneticOptions?: {
        radius?: number;
        strength?: number;
    };
    index: number;
    navItems: readonly { label: string, comingSoon?: boolean }[];
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}