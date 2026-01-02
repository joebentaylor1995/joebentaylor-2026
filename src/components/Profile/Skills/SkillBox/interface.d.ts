// Imports
// ------------
import { ToolProps } from '../../interface';

// Exports
// ------------
export interface SkillBoxProps {
    heading: string;
    description: string;
    cssAreaName: string;
    isLast: boolean;
    isActive?: boolean;
    tools: ToolProps[];
}