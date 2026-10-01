'use client';

// Imports
// ------------
import { useMagneticMultiple } from '@utils/useMagnetic';
import { useIsDesktop } from '@utils/useResponsive';
import { useRef } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const DesktopMenu = ({ magneticOptions, navItems, handleClick }: I.DesktopMenuProps) => {
	// Refs
	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

	// Check if desktop
	const isDesktop = useIsDesktop();

	// Magnetic Effect
	// Apply magnetic effect to all buttons (desktop only)
	useMagneticMultiple(buttonRefs, {
		radius: magneticOptions?.radius,
		strength: magneticOptions?.strength,
		enabled: isDesktop,
	});

	return (
		<S.Jacket>
			{navItems.map((item, index) => (
				<S.Button
					ref={el => {
						buttonRefs.current[index] = el;
					}}
					disabled={item.comingSoon}
					data-hover
					data-label={item.label}
					$isFirst={index === 0}
					$index={index}
					key={item.label}
					onClick={e => handleClick(e)}
					aria-label={`Navigate to ${item.label}`}
				>
					<span>
						{item.label.split('').map((char, idx) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: static split-text letters — position is the identity
							<span key={idx} className='letter'>
								{char === ' ' ? '\u00A0' : char}
							</span>
						))}
					</span>
				</S.Button>
			))}
		</S.Jacket>
	);
};

// Exports
// ------------
DesktopMenu.displayName = 'DesktopMenu';
export default DesktopMenu;
