// Imports
// ------
import { Grid } from '@/theme/tackl/waffl';
import { useCallback, useEffect, useState } from 'react';

// Styles
// ------
import { Col, Jacket } from './styles';

// Constants
// ------
const GRID_SIZE = 12;
const MOBILE_COLUMNS = 2;
const TABLET_COLUMNS = 6;

// Component
// ------
const GridExposer = () => {
	// State for grid visibility and color mode
	const [isGridVisible, setIsGridVisible] = useState(false);
	const [useAltColor, setUseAltColor] = useState(true);

	// Toggle handlers
	const toggleGrid = useCallback(() => {
		setIsGridVisible(prev => !prev);
	}, []);

	const toggleColor = useCallback(() => {
		setUseAltColor(prev => !prev);
	}, []);

	// Set up keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.ctrlKey) {
				if (e.key === 'g') {
					e.preventDefault();
					toggleGrid();
				} else if (e.key === 'f') {
					e.preventDefault();
					toggleColor();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [toggleGrid, toggleColor]);

	// No memoization: gridColumns is created on each render
	const gridColumns = Array.from({ length: GRID_SIZE }, (_, i) => (
		<Col
			key={i}
			$isMobile={i < MOBILE_COLUMNS}
			$isTablet={i < TABLET_COLUMNS}
			$altColor={useAltColor}
			style={{ gridColumn: i + 1 }}
		>
			<span />
		</Col>
	));

	return (
		<Jacket $showGrid={isGridVisible} $altColor={useAltColor}>
			<Grid>{gridColumns}</Grid>
		</Jacket>
	);
};

export default GridExposer;
