// Imports
// ------------
import { IntroductionProps } from './Introduction/interface';
import { SRCImage } from 'react-datocms';

// Exports
// ------------
export interface ProfileProps extends IntroductionProps {
    statement?: string;
    skills?: SkillProps[];
}

export interface SkillProps {
    id: string;
    heading: string;
    desc: string;
    tools: ToolProps[];
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
export interface SmoothScrollProps {
	wrapperRef: React.RefObject<HTMLDivElement | null>;
	contentRef: React.RefObject<HTMLDivElement | null>;
	isActive: boolean;
}