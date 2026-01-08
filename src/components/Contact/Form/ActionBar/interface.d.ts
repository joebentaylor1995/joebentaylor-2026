// Imports
// ------------

// Exports
// ------------
export interface RadioOption {
	value: string;
	label: string;
}

export interface ActionBarProps {
	onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRadioChange?: (value: string) => void;
	placeholder?: string;
	inputType?: 'text' | 'email' | 'tel';
	isDisabled?: boolean;
	radioOptions?: RadioOption[];
	selectedRadio?: string;
}