'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Radio = ({ value, label, checked, onChange }: I.RadioProps) => {
	return (
		<S.Jacket data-hover data-interactive>
			<input type='radio' id={value} name='radio-option' value={value} checked={checked} onChange={onChange} />

			<label htmlFor={value}>
				<span>
					{label.split('').map((char, idx) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static split-text letters — position is the identity
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
