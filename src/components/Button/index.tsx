'use client';

// Imports
// ------------
import { CSSProperties } from 'react';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Button = ({
	href,
	target,
	rel,
	label = 'Missing Label',
	onClick,
	className,
	disabled,
	loading,
	type,
	size,
	variant,
}: I.ButtonProps) => {
	return (
		<S.Jacket onClick={onClick}>
			<span>
				{label.split('').map((char, idx) => (
					<span
						key={idx}
						style={{ '--i': idx } as CSSProperties}
						className='letter'
					>
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
