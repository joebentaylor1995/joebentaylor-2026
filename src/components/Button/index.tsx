'use client';

// Imports
// ------------
import type { CSSProperties } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Button = ({ label = 'Missing Label', onClick }: I.ButtonProps) => {
	return (
		<S.Jacket onClick={onClick}>
			<span>
				{label.split('').map((char, idx) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: static split-text letters — position is the identity
					<span key={idx} style={{ '--i': idx } as CSSProperties} className='letter'>
						{char === ' ' ? '\u00A0' : char}
					</span>
				))}
			</span>
		</S.Jacket>
	);
};

// Exports
// ------------
Button.displayName = 'Button';
export default Button;
