'use client';

// Imports
// ------------
import Social from './Social';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const MobileMenu = ({ navItems, socials, handleClick }: I.MobileMenuProps) => {
	// Context
	const { menuOpen } = use(GlobalContext);

	return (
		<S.Jacket $isOpen={menuOpen}>
			<S.UL>
				{navItems.map(({ label, comingSoon }) => (
					<li key={label}>
						<button
							disabled={comingSoon}
							onClick={e => handleClick(e)}
							data-label={label}
							aria-label={`Navigate to ${label}`}
						>
							{label}
						</button>
					</li>
				))}
			</S.UL>

			<S.UL $isSocial>
				{socials?.map(
					({ url, name, isEnabled }) =>
						isEnabled && (
							<li key={name}>
								<Social
									url={url}
									name={name}
									icon={name.toLowerCase()}
									isEnabled={isEnabled}
								/>
							</li>
						)
				)}
			</S.UL>
		</S.Jacket>
	);
};

// Exports
// ------------
MobileMenu.displayName = 'MobileMenu';
export default MobileMenu;
