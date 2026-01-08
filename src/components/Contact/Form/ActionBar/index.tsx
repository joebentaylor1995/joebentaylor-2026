'use client';

// Imports
// ------------
import { forwardRef } from 'react';
import ActionButton from './ActionButton';

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
		},
		ref
	) => {
		// If radio options provided, render radio buttons
		if (radioOptions && radioOptions.length > 0) {
			return (
				<S.Jacket>
					<S.RadioGroup>
						{radioOptions.map(option => (
							<S.RadioOption key={option.value}>
								<input
									type='radio'
									id={option.value}
									name='radio-option'
									value={option.value}
									checked={selectedRadio === option.value}
									onChange={e =>
										onRadioChange?.(e.target.value)
									}
								/>
								<label htmlFor={option.value}>
									{option.label}
								</label>
							</S.RadioOption>
						))}
					</S.RadioGroup>

					<ActionButton
						isDisabled={!selectedRadio || isDisabled}
						onClick={onSubmit}
					/>
				</S.Jacket>
			);
		}

		// Otherwise render text input
		return (
			<S.Jacket>
				<input
					ref={ref}
					type={inputType}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>

				<ActionButton isDisabled={isDisabled} onClick={onSubmit} />
			</S.Jacket>
		);
	}
);

// Exports
// ------------
ActionBar.displayName = 'ActionBar';
export default ActionBar;
