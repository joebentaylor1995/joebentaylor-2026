// Imports
// ------------
import { IntroductionProps } from './Introduction/interface';
import { ServicesProps } from './Services/interface';
import { StatementProps } from './Statement/interface';
import { SkillsProps } from './Skills/interface';
import { AboutProps } from './About/interface';
import { ClientsProps } from './Clients/interface';
import { EthosProps } from './Ethos/interface';
import { AwardsProps } from './Awards/interface';
import { ReviewsProps } from './Reviews/interface';
import { SocialsProps } from './Footer/Socials/interface';

// Exports
// ------------
export interface ProfileProps extends
	IntroductionProps,
	ServicesProps,
	StatementProps,
	SkillsProps,
	AboutProps,
	ClientsProps,
	EthosProps,
	AwardsProps,
	ReviewsProps,
	SocialsProps
{
}


export interface SmoothScrollProps {
	wrapperRef: React.RefObject<HTMLDivElement | null>;
	contentRef: React.RefObject<HTMLDivElement | null>;
	isActive: boolean;
}