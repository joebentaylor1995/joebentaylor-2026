// Imports
// ------
import { memo } from 'react';

// Styles
// ------
import { Jacket } from './styles';

// Interfaces
// ------------
import { IconProps } from './interface';

/**
 * Icon Component
 *
 * A reusable component for displaying SVG icons with consistent styling.
 * Icons are rendered using predefined SVG paths from ICON_MAP.
 *
 * @component
 * @example
 * // Basic usage
 * <Icon type="facebook" />
 *
 * // With custom class and click handler
 * <Icon
 *   type="codepen"
 *   className="custom-icon"
 *   onClick={() => console.log('Icon clicked')}
 * />
 *
 * @param {Object} props - Component props
 * @param {('facebook'|'codepen')} props.type - The type of icon to display
 * @param {string} [props.className] - Optional CSS class name for styling
 * @param {Function} [props.onClick] - Optional click handler
 * @param {string} [props.size='medium'] - Size of the icon ('small'|'medium'|'large')
 * @param {string} [props.color] - Custom color for the icon
 *
 * @returns {React.Element|null} Returns the icon component or null if type is invalid
 */

// Icon map to avoid repetitive if statements
// ------------
const ICON_MAP: Record<string, { viewBox: string; path: React.ReactNode }> = {
	facebook: {
		viewBox: '0 0 24 24',
		path: (
			<path d='M24,12.072A12,12,0,1,0,10.125,23.926V15.541H7.078V12.072h3.047V9.428c0-3.007,1.792-4.669,4.532-4.669a18.611,18.611,0,0,1,2.687.234V7.947H15.83a1.734,1.734,0,0,0-1.947,1.49,1.71,1.71,0,0,0-.008.385v2.25H17.2l-.532,3.469h-2.8v8.385A12,12,0,0,0,24,12.072Z' />
		),
	},
	codepen: {
		viewBox: '0 0 24 24',
		path: (
			<path d='M24,8.2C24,8.2,24,8.2,24,8.2c0-0.1,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0,0,0-0.1c0,0,0,0,0-0.1 c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0l-11-7.3 c-0.3-0.2-0.8-0.2-1.1,0l-11,7.3c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0.1c0,0,0,0,0,0c0,0,0,0,0,0.1 c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0.1,0,0.1c0,0,0,0,0,0c0,0,0,0.1,0,0.1v7.3 c0,0,0,0.1,0,0.1c0,0,0,0,0,0c0,0,0,0.1,0,0.1c0,0,0,0,0,0c0,0,0,0.1,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0.1 c0,0,0,0,0,0c0,0,0,0,0.1,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0l11,7.3c0.2,0.1,0.4,0.2,0.6,0.2 c0.2,0,0.4-0.1,0.6-0.2l11-7.3c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0.1-0.1c0,0,0,0,0,0c0,0,0,0,0-0.1 c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0-0.1,0-0.1V8.3 C24,8.3,24,8.3,24,8.2z M13,3l8.1,5.4l-3.6,2.4l-4.5-3V3z M11,3v4.8l-4.5,3L2.9,8.3L11,3z M2.1,10.3L4.6,12l-2.6,1.7V10.3z M11,21 l-8.1-5.4l3.6-2.4l4.5,3V21z M12,14.4L8.4,12L12,9.6l3.6,2.4L12,14.4z M13,21v-4.8l4.5-3l3.6,2.4L13,21z M21.9,13.7L19.4,12l2.6-1.7 V13.7z' />
		),
	},
	star: {
		viewBox: '0 0 11 11',
		path: (
			<path
				d="M4.60801 0.324626C4.77023 -0.107961 5.38212 -0.107961 5.54434 0.324625L6.63272 3.22702C6.68343 3.36223 6.79011 3.46892 6.92533 3.51962L9.82772 4.60801C10.2603 4.77023 10.2603 5.38212 9.82772 5.54434L6.92533 6.63272C6.79011 6.68343 6.68343 6.79011 6.63272 6.92533L5.54434 9.82772C5.38212 10.2603 4.77023 10.2603 4.60801 9.82772L3.51962 6.92533C3.46892 6.79011 3.36223 6.68343 3.22702 6.63272L0.324626 5.54434C-0.107961 5.38212 -0.107961 4.77023 0.324625 4.60801L3.22702 3.51962C3.36223 3.46892 3.46892 3.36223 3.51962 3.22702L4.60801 0.324626Z"
			/>
		),
	},
	// Add other icons here following same pattern...
};

const Icon = memo(({ type, className, onClick }: IconProps) => {
	// Get icon config from map
	const iconConfig = ICON_MAP[type];

	// If icon type not found, log error and return null
	if (!iconConfig) {
		console.error(
			`Icon type "${type}" not found. Please check the type prop passed to Icon component.`
		);
		return null;
	}

	// Default props for all icons
	const defaultProps = {
		width: '24',
		height: '24',
		xmlns: 'http://www.w3.org/2000/svg',
		className,
		onClick,
		viewBox: iconConfig.viewBox,
	};

	return <Jacket {...defaultProps}>{iconConfig.path}</Jacket>;
});

// Exports
// ------------
Icon.displayName = 'Icon';
export default Icon;
