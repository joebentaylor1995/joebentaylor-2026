// Imports
// ------------
import { ReactNode } from 'react';
import { SocialProps } from './Socials/interface';

// Exports
// ------------
export interface FooterProps {
	isActive?: boolean;
	wrapperRef?: React.RefObject<HTMLElement | null>;
	columnOverride?: number;
	items?: (string | ReactNode)[];
	gradientColor?: string;
	dribbbleUsername?: string;
	socials: SocialProps[];
}