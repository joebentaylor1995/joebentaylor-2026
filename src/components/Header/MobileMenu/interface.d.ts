// Imports
// ------------
import { SocialProps } from './Social/interface';

// Exports
// ------------
export interface MobileMenuProps {
    navItems: readonly { label: string, comingSoon?: boolean }[];
    socials: SocialProps[];
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}