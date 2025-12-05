'use client';

// Imports
// ------------
import Logo from '@parts/Logo';
import Grid from '@waffl';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Header = ({}: I.HeaderProps) => {
	// Event Handlers
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('click');
	};

	// Navigation Items
	const navItems = [
		{
			label: 'Home',
		},
		{
			label: 'Profile',
		},
		{
			label: 'Projects',
		},
		{
			label: "Let's Talk",
		},
	];

	return (
		<S.Jacket>
			<Grid>
				<S.Col $s='1/2' $m='1/4' $l='1/8'>
					<Logo />
				</S.Col>

				<S.Col $s='2/3' $m='4/7' $l='8/13'>
					<S.Navigation>
						{navItems.map((item, index) => (
							<S.Button
								data-hover
								$isFirst={index === 0}
								key={index}
								onClick={(
									e: React.MouseEvent<HTMLButtonElement>
								) => handleClick(e)}
								aria-label={`Navigate to ${item.label}`}
							>
								<span>
									{item.label.split('').map((char, idx) => (
										<span key={idx} className='letter'>
											{char === ' ' ? '\u00A0' : char}
										</span>
									))}
								</span>
							</S.Button>
						))}
					</S.Navigation>
				</S.Col>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Header.displayName = 'Header';
export default Header;
