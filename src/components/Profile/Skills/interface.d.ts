// Imports
// ------------
import { SkillProps } from '../interface';

// Exports
// ------------
export interface SkillsProps {
    isActive?: boolean;
    wrapperRef?: React.RefObject<HTMLElement | null>;
    columnOverride?: number;
    skills?: SkillProps[];
}