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

	if (pageLoaded) {
		setTimeout(() => {
			return null;
		}, 5000);
	}

	return (
		<S.Jacket style={{ display: pageLoaded ? 'none' : 'flex' }}>
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
