'use client';

// Imports
// ------------
import SkillBox from './SkillBox';
import Grid from '@waffl';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Skills = ({
	skills,
	isActive,
	wrapperRef,
	columnOverride,
}: I.SkillsProps) => {
	// Strip text of spaces and return first 3 letters
	const conversion = (text: string): string => {
		return text.toLowerCase().replace(' ', '').slice(0, 3);
	};

	// Create CSS areas for the skills
	const cssAreaOne = conversion(skills?.[0]?.heading || '');
	const cssAreaTwo = conversion(skills?.[1]?.heading || '');
	const cssAreaThree = conversion(skills?.[2]?.heading || '');

	return (
		<S.Jacket>
			<Grid $lCols={columnOverride}>
				<S.CustomLayout
					$cssAreaOne={cssAreaOne}
					$cssAreaTwo={cssAreaTwo}
					$cssAreaThree={cssAreaThree}
				>
					{skills?.map((skill, index) => {
						// Assign CSS area for the skill
						const cssArea = conversion(skill.heading);

						return (
							<SkillBox
								wrapperRef={wrapperRef}
								isActive={isActive}
								key={skill.id}
								cssAreaName={cssArea}
								heading={skill.heading}
								description={skill.desc}
								tools={skill.tools}
								isLast={index === skills.length - 1}
							/>
						);
					})}
				</S.CustomLayout>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Skills.displayName = 'Skills';
export default Skills;
