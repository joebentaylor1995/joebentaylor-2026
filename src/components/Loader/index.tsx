'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Loader = ({}: I.LoaderProps) => {
	const { setLoaderFinished, pageLoaded } = use(GlobalContext);

	return (
		<S.Jacket
			style={{
				opacity: pageLoaded ? '0' : '1',
				transition: 'opacity 1s ease-in-out',
			}}
		>
			{/*  */}
			{/*  */}
			{/*  */}
		</S.Jacket>
	);
};

// Exports
// ------------
Loader.displayName = 'Loader';
export default Loader;
