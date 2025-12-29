'use client';

// Imports
// ------------

// Styles
// ------------
import * as S from './styles';

// Component
// ------------
const ProgressiveBlur = ({ size = 'small' }) => {
	const blurLayers = [
		{ blur: 0.5, stops: ['0%', '12.5%', '25%', '37.5%'] },
		{ blur: 0.5625, stops: ['12.5%', '25%', '37.5%', '50%'] },
		{ blur: 1.125, stops: ['25%', '37.5%', '50%', '62.5%'] },
		{ blur: 2.25, stops: ['37.5%', '50%', '62.5%', '75%'] },
		{ blur: 4.5, stops: ['50%', '62.5%', '75%', '87.5%'] },
		{ blur: 9, stops: ['62.5%', '75%', '87.5%', '100%'] },
		{ blur: 18, stops: ['75%', '87.5%', '100%'] },
		{ blur: 36, stops: ['87.5%', '100%'] },
	];

	return (
		<S.Jacket>
			{blurLayers.map((layer, i) => (
				<S.BlurLayer
					key={i}
					$blur={layer.blur}
					$stops={layer.stops}
					$index={i}
				/>
			))}
		</S.Jacket>
	);
};

// Exports
// ------------
ProgressiveBlur.displayName = 'ProgressiveBlur';
export default ProgressiveBlur;
