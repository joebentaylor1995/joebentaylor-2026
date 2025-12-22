'use client';

// Imports
// ------------
import { SRCImage } from 'react-datocms';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------

const Content = ({ tools, isHidden }: I.SkillMarqueeProps) => {
	return (
		<S.Content aria-hidden={isHidden ? 'true' : 'false'}>
			{tools.map(({ id, logoIcon }) => (
				<li
					key={id}
					aria-label={
						isHidden ? undefined : logoIcon?.title || undefined
					}
				>
					<S.Picture>
						{logoIcon.mimeType === 'image/svg+xml' ? (
							<picture>
								<img
									src={logoIcon?.url}
									alt={logoIcon?.alt}
									width={48}
									height={48}
								/>
							</picture>
						) : (
							<SRCImage data={logoIcon?.responsiveImage} />
						)}
					</S.Picture>
				</li>
			))}
		</S.Content>
	);
};

const SkillMarquee = ({ tools }: I.SkillMarqueeProps) => {
	return (
		<S.Jacket $itemCount={tools.length}>
			<Content tools={tools} />
			<Content tools={tools} isHidden />
		</S.Jacket>
	);
};

// Exports
// ------------
SkillMarquee.displayName = 'SkillMarquee';
export default SkillMarquee;
