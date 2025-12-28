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
	AwardsProps
{
}


export interface SmoothScrollProps {
	wrapperRef: React.RefObject<HTMLDivElement | null>;
	contentRef: React.RefObject<HTMLDivElement | null>;
	isActive: boolean;
}