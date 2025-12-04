'use client';

// Imports
// ------------
import UnicornScene from 'unicornstudio-react/next';
import { useRef } from 'react';
import Grid from '@waffl';
import StarHeading from '@parts/StarHeading';
import CopyrightYear from '@parts/CopyrightYear';
import { VideoPlayer } from 'react-datocms';
import { useResponsive } from '@utils/useResponsive';
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';
import { useAnimation } from '@/utils/useAnimation';

// Component
// ------------
const Hero = ({
	subheading,
	title,
	videoThumbnail,
	video,
	unicornScene,
}: I.HeroProps) => {
	// Refs
	const textRef = useRef<HTMLElement>(null);
	const subheadingRef = useRef<HTMLElement>(null);
	const jacketRef = useRef<HTMLElement>(null);

	const handleLoad = () => {
		console.log('Scene loaded successfully!');
	};

	const handleError = (error: Error) => {
		console.error('Scene loading failed:', error);
		alert(`Scene loading failed: ${error}`);
	};

	const { isDesktop } = useResponsive();

	useAnimation(
		({ isDesktop }) => {
			const textSplit = SplitText.create(textRef.current, {
				type: 'lines, words',
				mask: 'words',
				wordsClass: 'word++',
			});

			const subheadingSplit = SplitText.create(subheadingRef.current, {
				type: 'words',
				wordsClass: 'word++',
			});

			gsap.from(subheadingSplit.words, {
				filter: 'blur(6px)',
				duration: 0.8,
				ease: 'cubic-bezier(0, 0, 0, 1)',
				stagger: {
					each: 0.15,
					ease: 'linear',
				},
			});

			gsap.from(textSplit.words, {
				yPercent: 100, // Travel distance: 100% (upward mask in)
				duration: 0.643, // Duration: 643ms
				ease: 'cubic-bezier(0, 0, 0, 1)', // Acceleration: Slow down
				stagger: {
					each: 0.051, // Delay: 51ms per word (Order: Forward)
					ease: 'cubic-bezier(0.8, 0, 0.2, 1)', // Smoothing: Natural
				},
			});
		},
		{
			scope: jacketRef,
			dependencies: [textRef],
		}
	);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Background>
				<UnicornScene
					jsonFilePath='/scene.json'
					dpi={1.5}
					fps={120}
					lazyLoad={false}
					production={true}
					onLoad={handleLoad}
					onError={handleError}
					ariaLabel='Animated background scene'
					altText='Interactive 3D scene'
				/>
			</S.Background>

			<S.CenterContent>
				<Grid>
					<S.Texts $l='8/12'>
						<StarHeading
							text={subheading}
							semantic='h1'
							passedRef={subheadingRef}
						/>
						<S.Text ref={textRef}>{title}</S.Text>
					</S.Texts>
				</Grid>
			</S.CenterContent>

			<S.BottomContent>
				<Grid>
					{isDesktop && (
						<S.VideoPreview $l='1/2'>
							<VideoPlayer
								data={videoThumbnail}
								autoPlay
								muted
								loop
								playsInline
							/>
						</S.VideoPreview>
					)}

					<S.Copyright $l='8/13'>
						1995
						<hr />
						&copy;
						<hr />
						<CopyrightYear />
					</S.Copyright>
				</Grid>
			</S.BottomContent>
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
