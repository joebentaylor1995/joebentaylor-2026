'use client';

// Imports
// ------------
import Image from 'next/image';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

/**
 * Background Component
 *
 * Renders an animated grid of Dribbble portfolio shots.
 * Displays images in a 7x7 grid with mouse-responsive animations.
 *
 * @component
 * @param {BackgroundProps} props - Component props
 * @param {string[]} props.imageUrls - Array of image URLs to display
 * @param {number} props.rows - Number of rows in the grid
 * @param {number} props.itemsPerRow - Number of items per row
 * @param {React.MutableRefObject<(HTMLDivElement | null)[]>} props.rowRefs - Refs for each row (for animations)
 * @param {React.RefObject<HTMLDivElement | null>} props.gridRef - Ref to grid container
 * @param {boolean} [props.isActive] - Whether animations are active
 * @returns {JSX.Element} Background grid component
 */
const Background = ({
	imageUrls,
	rows,
	itemsPerRow,
	rowRefs,
	gridRef,
	isActive,
}: I.BackgroundProps) => {
	return (
		<S.Jacket ref={gridRef}>
			<S.IntroSection>
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
