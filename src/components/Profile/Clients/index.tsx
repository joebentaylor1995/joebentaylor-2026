'use client';

// Imports
// ------------
import Grid from '@waffl';
import Marquee from './Marquee';
import StarHeading from '@parts/StarHeading';
import { StructuredText } from 'react-datocms';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Clients = ({
	wrapperRef,
	isActive,
	columnOverride,
	clientsDesc,
	clients,
}: I.ClientsProps) => {
	return (
		<S.Jacket>
			<Grid $lCols={columnOverride}>
				<S.Sticky $m='1/3' $l='1/4'>
					<StarHeading text='Clients' semantic='h2' />
				</S.Sticky>

				<S.Desc $m='3/7' $l='4/9'>
					<StructuredText data={clientsDesc} />
				</S.Desc>
			</Grid>

			<Grid $lCols={columnOverride}>
				<S.ClientList>
					<Marquee clients={clients} wrapperRef={wrapperRef} />
				</S.ClientList>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Clients.displayName = 'Clients';
export default Clients;
