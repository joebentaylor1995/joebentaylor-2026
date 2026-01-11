'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Radio = ({ value, label, checked, onChange }: I.RadioProps) => {
	return (
		<S.Jacket data-hover data-interactive>
			<input
				type='radio'
				id={value}
				name='radio-option'
				value={value}
				checked={checked}
				onChange={onChange}
			/>

			<label htmlFor={value}>
				<span>
					{label.split('').map((char, idx) => (
						<span key={idx} className='letter'>
							{char === ' ' ? '\u00A0' : char}
						</span>
					))}
				</span>
			</label>
		</S.Jacket>
	);
};

// Exports
// ------------
Radio.displayName = 'Radio';
export default Radio;
