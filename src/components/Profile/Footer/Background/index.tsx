'use client';

// Imports
// ------------
import Image from 'next/image';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
const Background = ({
	imageUrls,
	rows,
	itemsPerRow,
	rowRefs,
	gridRef,
	introSectionRef,
	isActive,
}: I.BackgroundProps) => {
	return (
		<S.Jacket ref={gridRef}>
			<S.IntroSection ref={introSectionRef}>
				<S.GridMotionContainer>
					{Array.from({ length: rows }, (_, rowIndex) => {
						const rowImages = imageUrls.slice(
							rowIndex * itemsPerRow,
							(rowIndex + 1) * itemsPerRow
						);

						return (
							<S.Row
								key={rowIndex}
								ref={el => {
									rowRefs.current[rowIndex] = el;
								}}
							>
								{rowImages.map((imageUrl, itemIndex) => (
									<S.RowItem key={`${rowIndex}-${itemIndex}`}>
										<S.RowItemInner>
											<S.RowItemImgWrapper>
												<picture>
													<Image
														src={imageUrl}
														alt='Dribbble shot'
														fill
														sizes='(max-width: 768px) 100vw, 24rem'
														loading='lazy'
													/>
												</picture>
											</S.RowItemImgWrapper>
										</S.RowItemInner>
									</S.RowItem>
								))}
							</S.Row>
						);
					})}
				</S.GridMotionContainer>
			</S.IntroSection>
		</S.Jacket>
	);
};

// Exports
// ------------
Background.displayName = 'Background';
export default Background;
