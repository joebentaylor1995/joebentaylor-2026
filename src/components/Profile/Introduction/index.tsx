'use client';

// Imports
// ------------
import StarHeading from '@parts/StarHeading';
import Grid from '@waffl';
import { StructuredText } from 'react-datocms';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Constants
// ------------
const COL_OVERRIDE = 8;

// Component
// ------------
const Introduction = ({
	introSubheading,
	introHeading,
	introText,
}: I.IntroductionProps) => {
	return (
		<S.Jacket>
			<S.Top>
				<Grid $lCols={COL_OVERRIDE}>
					<S.TopContent $l='1/9'>
						<StarHeading text={introSubheading} semantic='h2' />
						<S.Title>
							{introHeading.map(({ heading }) => (
								<span key={heading}>{heading}</span>
							))}
						</S.Title>
					</S.TopContent>
				</Grid>

				<S.Scroll>Scroll</S.Scroll>
			</S.Top>

			<S.Bottom>
				<Grid $lCols={COL_OVERRIDE}>
					<S.BottomSubheading $l='1/4'>
						<StarHeading text='Introduction' semantic='h2' />
					</S.BottomSubheading>

					<S.BottomContent $l='4/9'>
						<StructuredText data={introText} />
					</S.BottomContent>
				</Grid>
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
Introduction.displayName = 'Introduction';
export default Introduction;
