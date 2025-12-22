'use client';

// Imports
// ------------
import SkillMarquee from './SkillMarquee';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SkillBox = ({
	heading,
	description,
	tools,
	cssAreaName,
	isLast,
	isActive,
}: I.SkillBoxProps) => {
	return (
		<S.Jacket $cssAreaName={cssAreaName}>
			<SkillMarquee tools={tools} isActive={isActive} />

			<S.Texts $isLast={isLast}>
				<h2>{heading}</h2>
				<p>{description}</p>
			</S.Texts>
		</S.Jacket>
	);
};

// Exports
// ------------
SkillBox.displayName = 'SkillBox';
export default SkillBox;
