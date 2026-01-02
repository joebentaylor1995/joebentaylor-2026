'use client';

// Imports
// ------------
import Icon from '@parts/Icon';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Socials = ({ socials }: I.SocialsProps) => {
	return (
		<S.Jacket data-interactive>
			{socials?.map(({ name, url, isEnabled }) => {
				if (!isEnabled) return null;

				return (
					<S.Social key={name}>
						<S.SocialLink
							data-hover
							href={url}
							target='_blank'
							rel='noopener noreferrer'
							aria-label={`Go to ${name}`}
						>
							<span>
								{name.split('').map((char, idx) => (
									<span key={idx} className='letter'>
										{char === ' ' ? '\u00A0' : char}
									</span>
								))}
							</span>
							<Icon type={name.toLowerCase()} />
						</S.SocialLink>
					</S.Social>
				);
			})}
			<S.Social>
				<S.SocialLink
					href='#'
					$isResume
					data-hover
					download
					target='_blank'
					rel='noopener noreferrer'
				>
					<span>
						{'Resume'.split('').map((char, idx) => (
							<span key={idx} className='letter'>
								{char === ' ' ? '\u00A0' : char}
							</span>
						))}
					</span>
					<Icon type='arrow-right' />
				</S.SocialLink>
			</S.Social>
		</S.Jacket>
	);
};

// Exports
// ------------
Socials.displayName = 'Socials';
export default Socials;
