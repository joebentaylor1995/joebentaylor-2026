// Imports
// ------------

// Exports
// ------------
export interface RadioProps {
	value: string;
	label: string;
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}