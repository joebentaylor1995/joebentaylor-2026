'use client';

// Imports
// ------------
import Icon from '@parts/Icon';
import { forwardRef, useMemo } from 'react';
import ActionButton from './ActionButton';
import Radio from './Radio';
import { validateEmail } from '@utils/validateEmail';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const ActionBar = forwardRef<HTMLInputElement, I.ActionBarProps>(
	(
		{
			onSubmit,
			value = '',
			onChange,
			onRadioChange,
			placeholder = 'Type to respond',
			inputType = 'text',
			isDisabled = false,
			radioOptions,
			selectedRadio,
			isFinished = false,
			onReset,
		},
		ref
	) => {
		const hasRadioOptions = radioOptions && radioOptions.length > 0;
		const inputDisabled = hasRadioOptions;

		// Validate email when inputType is 'email'
		const isEmailValid = useMemo(() => {
			if (inputType !== 'email') return true;
			if (!value.trim()) return false;
			return validateEmail(value.trim());
		}, [inputType, value]);

		// Determine if button should be disabled
		const isButtonDisabled = useMemo(() => {
			if (hasRadioOptions) {
				return !selectedRadio || isDisabled;
			}
			// For email input, disable if email is invalid or if isDisabled is true
			if (inputType === 'email') {
				return !isEmailValid || isDisabled;
			}
			// For other input types, use isDisabled or empty value
			return isDisabled || !value.trim();
		}, [
			hasRadioOptions,
			selectedRadio,
			isDisabled,
			inputType,
			isEmailValid,
			value,
		]);

		return (
			<>
				<S.Jacket data-hover $isFinished={isFinished}>
					{hasRadioOptions && (
						<S.RadioGroup>
							{radioOptions.map(option => (
								<Radio
									key={option.value}
									value={option.value}
									label={option.label}
									checked={selectedRadio === option.value}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) => onRadioChange?.(e.target.value)}
								/>
							))}
						</S.RadioGroup>
					)}

					<S.Input
						ref={ref}
						type={inputType}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						disabled={inputDisabled}
					/>

					<ActionButton
						isDisabled={isButtonDisabled}
						onClick={onSubmit}
					/>
				</S.Jacket>

				<S.ResetButton
					type='button'
					onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
						e.preventDefault();
						e.stopPropagation();
						onReset?.();
					}}
					$isFinished={isFinished}
				>
					<Icon type='reset' />
				</S.ResetButton>
			</>
		);
	}
);

// Exports
// ------------
ActionBar.displayName = 'ActionBar';
export default ActionBar;
