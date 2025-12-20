'use client';

// Imports
// ------------

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
}: I.SkillBoxProps) => {
	return (
		<S.Jacket $cssAreaName={cssAreaName}>
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
