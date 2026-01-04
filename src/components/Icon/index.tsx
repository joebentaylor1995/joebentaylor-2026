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
	linkedin: {
		viewBox: '0 0 18 18',
		path: (
			<g>
				<rect width='18' height='18' fill='none' />
				<path d='M17.25 0H0.75C0.3 0 0 0.3 0 0.75V17.25C0 17.7 0.3 18 0.75 18H17.25C17.7 18 18 17.7 18 17.25V0.75C18 0.3 17.7 0 17.25 0ZM5.325 15.375H2.7V6.75H5.4V15.375H5.325ZM3.975 5.55C3.15 5.55 2.4 4.875 2.4 3.975C2.4 3.15 3.075 2.4 3.975 2.4C4.8 2.4 5.55 3.075 5.55 3.975C5.55 4.875 4.875 5.55 3.975 5.55ZM15.375 15.375H12.675V11.175C12.675 10.2 12.675 8.925 11.325 8.925C9.9 8.925 9.75 9.975 9.75 11.1V15.375H7.05V6.75H9.6V7.95C9.975 7.275 10.8 6.6 12.15 6.6C14.85 6.6 15.375 8.4 15.375 10.725V15.375Z' />
			</g>
		),
	},
	dribbble: {
		viewBox: '0 0 18 18',
		path: (
			<path d='M9 18C4.05 18 0 13.95 0 9C0 4.05 4.05 0 9 0C13.95 0 18 4.05 18 9C18 13.95 13.95 18 9 18ZM16.575 10.2C16.275 10.125 14.175 9.45 11.775 9.9C12.75 12.675 13.2 14.925 13.275 15.375C15 14.25 16.275 12.375 16.575 10.2ZM12 16.125C11.85 15.45 11.475 13.125 10.35 10.275C10.35 10.275 10.35 10.275 10.275 10.275C5.925 11.775 4.35 14.775 4.275 15.075C5.55 16.125 7.2 16.725 9 16.725C10.05 16.725 11.1 16.5 12 16.125ZM3.3 14.175C3.45 13.875 5.55 10.35 9.525 9.075C9.6 9.075 9.75 9 9.825 9C9.6 8.55 9.45 8.1 9.225 7.725C5.4 8.85 1.65 8.85 1.35 8.85C1.35 8.925 1.35 9 1.35 9.075C1.35 10.95 2.025 12.825 3.3 14.175ZM1.5 7.425C1.875 7.425 5.025 7.425 8.625 6.525C7.35 4.275 6 2.325 5.775 2.1C3.6 3.075 1.95 5.025 1.5 7.425ZM7.2 1.575C7.425 1.875 8.775 3.75 10.05 6.075C12.75 5.025 13.95 3.525 14.1 3.3C12.75 2.025 10.95 1.35 9 1.35C8.4 1.35 7.8 1.425 7.2 1.575ZM14.925 4.125C14.775 4.35 13.5 6 10.65 7.125C10.8 7.5 11.025 7.875 11.175 8.25C11.25 8.4 11.25 8.55 11.325 8.625C13.875 8.325 16.425 8.85 16.65 8.85C16.65 7.125 16.05 5.475 14.925 4.125Z' />
		),
	},
	star: {
		viewBox: '0 0 11 11',
		path: (
			<path d='M4.60801 0.324626C4.77023 -0.107961 5.38212 -0.107961 5.54434 0.324625L6.63272 3.22702C6.68343 3.36223 6.79011 3.46892 6.92533 3.51962L9.82772 4.60801C10.2603 4.77023 10.2603 5.38212 9.82772 5.54434L6.92533 6.63272C6.79011 6.68343 6.68343 6.79011 6.63272 6.92533L5.54434 9.82772C5.38212 10.2603 4.77023 10.2603 4.60801 9.82772L3.51962 6.92533C3.46892 6.79011 3.36223 6.68343 3.22702 6.63272L0.324626 5.54434C-0.107961 5.38212 -0.107961 4.77023 0.324625 4.60801L3.22702 3.51962C3.36223 3.46892 3.46892 3.36223 3.51962 3.22702L4.60801 0.324626Z' />
		),
	},
	chat: {
		viewBox: '0 0 12 12',
		path: (
			<>
				<path d='M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6V12H6C2.68629 12 0 9.31371 0 6Z' />
			</>
		),
	},
	'arrow-right': {
		viewBox: '0 0 18 18',
		path: (
			<>
				<path
					d='M2.4375 9.1875H15.9375H15.5625'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
				/>
				<path
					d='M10.6875 14.4375L15.9375 9.1875L10.6875 3.9375'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
				/>
			</>
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
