'use client';

// Imports
// ------------
import UnicornScene from 'unicornstudio-react/next';
import Grid from '@waffl';
import Button from '@parts/Button';
import StarHeading from '@parts/StarHeading';
import CopyrightYear from '@parts/CopyrightYear';
import SplitText from 'gsap/SplitText';
import { VideoPlayer } from 'react-datocms';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useAnimation } from '@utils/useAnimation';
import { waitForFonts } from '@utils/waitForFonts';
import { useResponsive } from '@utils/useResponsive';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

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
	const jacketRef = useRef<HTMLElement>(null);
	const textSplitRef = useRef<SplitText | null>(null);
	const subheadingSplitRef = useRef<SplitText | null>(null);
	const bottomContentRef = useRef<HTMLElement>(null);

	// Responsive Breakpoints
	const { isMobile } = useResponsive();

	// State to control when animations trigger
	const [shouldAnimate, setShouldAnimate] = useState(false);

	const handleLoad = () => {
		console.log('Scene loaded successfully!');
		// Trigger animations when scene loads
		setTimeout(() => setShouldAnimate(true), 500);
	};

	const handleError = (error: Error) => {
		console.error('Scene loading failed:', error);
		alert(`Scene loading failed: ${error}`);
	};

	// Create splits with autoSplit for reflow handling
	// Wait for fonts to load before splitting to prevent layout shifts
	useAnimation(
		({ isDesktop }) => {
			// Wait for fonts to load before creating splits
			waitForFonts().then(() => {
				if (textRef.current && !textSplitRef.current) {
					textSplitRef.current = SplitText.create(textRef.current, {
						type: 'words',
						mask: 'words',
						wordsClass: 'word++',
						autoSplit: true, // Keep for reflow handling
						reduceWhiteSpace: true, // Fix Safari spacing issues
						onSplit: self => {
							// Capture the split instance for later animation
							textSplitRef.current = self;

							gsap.set(self.words, {
								yPercent: 100,
							});
						},
					});
				}
			});
		},
		{
			scope: jacketRef,
			dependencies: [textRef],
		}
	);

	// Trigger animations when shouldAnimate becomes true
	useEffect(() => {
		if (!shouldAnimate) return;

		const slowCurve = 'cubic-bezier(0, 0, 0, 1)';
		const smoothCurve = 'cubic-bezier(0.8, 0, 0.2, 1)';

		// Animate text
		if (textSplitRef.current?.words) {
			gsap.to(textSplitRef.current.words, {
				yPercent: 0,
				duration: 0.643,
				ease: slowCurve,
				stagger: {
					each: 0.051,
					ease: smoothCurve,
				},
			});
		}
	}, [shouldAnimate]);

	// Cleanup splits on unmount
	useEffect(() => {
		return () => {
			textSplitRef.current?.revert();
			subheadingSplitRef.current?.revert();
		};
	}, []);

	// Bottom content offset
	const bottomheight = (bottomContentRef.current?.offsetHeight ?? 51) / 10;

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

			<S.CenterContent $offset={bottomheight}>
				<Grid>
					<S.Texts $m='4/7' $l='8/12'>
						<StarHeading text={subheading} semantic='h1' />
						<S.Text ref={textRef}>{title}</S.Text>
						{isMobile && <Button href='/' label='View Profile' />}
					</S.Texts>
				</Grid>
			</S.CenterContent>

			<S.BottomContent ref={bottomContentRef}>
				<Grid>
					<S.VideoPreview $s='1/2' $m='1/4' $l='1/3'>
						<VideoPlayer
							data={videoThumbnail}
							autoPlay
							muted
							loop
							playsInline
						/>
					</S.VideoPreview>

					<S.Copyright $s='2/3' $m='4/7' $l='8/13'>
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
