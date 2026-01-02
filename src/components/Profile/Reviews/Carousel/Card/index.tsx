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
const Card = ({
	id,
	quote,
	authorName,
	authorRole,
	authorPicture,
	authorCompany,
}: I.CardProps) => {
	return (
		<S.Jacket data-hover>
			<header>
				<blockquote>
					<p>&ldquo;{quote}&rdquo;</p>
				</blockquote>
			</header>

			<footer>
				<S.Pics>
					<SRCImage data={authorPicture?.responsiveImage} />
					<SRCImage data={authorCompany?.responsiveImage} />
				</S.Pics>

				<S.Texts>
					<h4>{authorName}</h4>
					<p>{authorRole}</p>
				</S.Texts>
			</footer>
		</S.Jacket>
	);
};

// Exports
// ------------
Card.displayName = 'Card';
export default Card;
