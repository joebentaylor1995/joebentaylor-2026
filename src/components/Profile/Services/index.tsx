'use client';

// Imports
// ------------
import Grid from '@waffl';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Services = ({
	services,
	isActive,
	wrapperRef,
	columnOverride,
}: I.ServicesProps) => {
	return (
		<S.Jacket>
			<Grid $lCols={columnOverride}>
				{/*  */}
				{/* TODO • Work */}
				{/*  */}
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Services.displayName = 'Services';
export default Services;
