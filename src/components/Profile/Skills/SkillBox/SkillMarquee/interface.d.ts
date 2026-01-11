// Imports
// ------------
import { SRCImage } from 'react-datocms';

// Exports
// ------------
export interface SkillMarqueeProps {
    tools: ToolProps[];
	isHidden?: boolean;
	isPlaying?: boolean;
    isActive?: boolean;
}

export interface ToolProps {
    id: string;
	logoIcon: LogoIconProps;
}

export interface LogoIconProps {
	url: string;
	alt: string;
	mimeType: string;
	title: string;
	responsiveImage: SRCImage;
}