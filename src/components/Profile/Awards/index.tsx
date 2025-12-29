'use client';

// Imports
// ------------
import Grid from '@waffl';
import Counter from './Counter';
import StarHeading from '@parts/StarHeading';
import { StructuredText } from 'react-datocms';
import { useRef } from 'react';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Awards = ({
	isActive,
	wrapperRef,
	columnOverride,
	awardsDesc,
	awards,
}: I.AwardsProps) => {
	// Refs
	const awardItemRefs = useRef<HTMLElement[]>([]);

	return (
		// Refs
		<S.Jacket>
			<Grid $lCols={columnOverride}>
				<S.Sticky $m='1/3' $l='1/4'>
					<StarHeading text='Awards' semantic='h2' />
				</S.Sticky>

				<S.Desc $m='3/7' $l='4/9'>
					<StructuredText data={awardsDesc} />
				</S.Desc>
			</Grid>

			<Grid $lCols={columnOverride}>
				<S.AwardsList>
					{awards?.map(({ id, title, count }, index) => (
						<S.AwardItem
							key={id}
							ref={(el: HTMLElement | null) => {
								if (el) {
									awardItemRefs.current[index] = el;
								}
							}}
						>
							<Counter
								wrapperRef={wrapperRef}
								isActive={isActive}
								count={count}
								id={`award-count-${id}`}
								parentRef={awardItemRefs.current[index]}
							/>
							<S.AwardItemTitle>{title}</S.AwardItemTitle>
						</S.AwardItem>
					))}
				</S.AwardsList>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Awards.displayName = 'Awards';
export default Awards;
