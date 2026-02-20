'use client';

// Imports
// ------------
import Grid from '@waffl';
import Background from './Background';
import VideoModal from './VideoModal';
import Button from '@parts/Button';
import StarHeading from '@parts/StarHeading';
import CopyrightYear from '@parts/CopyrightYear';
import SplitText from 'gsap/SplitText';
import {
	useRef,
	useState,
	useEffect,
	useLayoutEffect,
	useCallback,
	use,
} from 'react';
import { gsap } from 'gsap';
import { useAnimation } from '@utils/useAnimation';
import { useResponsive } from '@utils/useResponsive';
import { useMagnetic } from '@utils/useMagnetic';
import { VideoPlayer } from 'react-datocms';
import { bezzy3, slow, smooth } from '@parts/AnimationPlugins/Curves';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ subheading, title, videoThumbnail, video }: I.HeroProps) => {
	// Refs
	const textRef = useRef<HTMLElement>(null);
	const jacketRef = useRef<HTMLElement>(null);
	const textSplitRef = useRef<SplitText | null>(null);
	const centerContentRef = useRef<HTMLElement>(null);
	const bottomContentRef = useRef<HTMLElement>(null);
	const modalRef = useRef<HTMLElement>(null);
	const modalContentRef = useRef<HTMLDivElement>(null);
	const videoPreviewRef = useRef<HTMLDivElement>(null);
	const buttonAnimationRef = useRef<HTMLElement>(null);
	const starHeadingRef = useRef<HTMLElement>(null);

	// Responsive Breakpoints
	const { isMobile, isDesktop } = useResponsive();

	// States
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

	// Context
	const {
		loaderFinished,
		profileOpen,
		setProfileOpen,
		contactOpen,
		loaderFinishing,
	} = use(GlobalContext);

	// On Mount Set all initial animation elements
	useLayoutEffect(() => {
		// Bottom Content
		gsap.set(bottomContentRef.current, { autoAlpha: 0, yPercent: 100 });

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

		return () => {
			if (textSplitRef.current) {
				textSplitRef.current.revert();
				textSplitRef.current = null;
			}
		};
	}, []);

	useAnimation(
		() => {
			if (!loaderFinished) return;

			gsap.to(bottomContentRef.current, {
				autoAlpha: 1,
				yPercent: 0,
				duration: 0.8,
				ease: bezzy3,
			});
		},
		{
			scope: jacketRef,
			dependencies: [loaderFinished],
		}
	);

	// Apply magnetic effect to video preview (desktop only)
	useMagnetic(videoPreviewRef, {
		radius: 120,
		strength: 0.4,
		enabled: isDesktop,
	});

	useAnimation(
		() => {
			if (!loaderFinished || !textSplitRef.current) return;

			// Use timeline instead of nested callbacks - much cleaner!
			const tl = gsap.timeline();

			// Fade in StarHeading
			if (starHeadingRef.current) {
				tl.to(starHeadingRef.current, {
					autoAlpha: 1,
					duration: 0.6,
					ease: 'power2.out',
				});
			}

			// Start text animation slightly before StarHeading completes for smoother transition

			tl.to(
				textSplitRef.current.words,
				{
					yPercent: 0,
					duration: 0.643,
					ease: slow,
					stagger: {
						each: 0.051,
						ease: smooth,
					},
				},
				'-=0.3'
			); // Start 0.3s into StarHeading animation for overlap

			// Fade in button after text animation
			if (buttonAnimationRef.current) {
				tl.to(
					buttonAnimationRef.current,
					{
						autoAlpha: 1,
						duration: 0.5,
						ease: 'power2.out',
					},
					'-=0.2'
				); // Start slightly before text animation ends
			}
		},
		{
			scope: jacketRef,
			dependencies: [loaderFinished, textSplitRef],
		}
	);

	// Handle modal open
	const handleOpenModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	// Handle modal close
	const handleCloseModal = useCallback(() => {
		if (!modalRef.current || !modalContentRef.current) {
			setIsModalOpen(false);
			return;
		}

		// Use timeline for coordinated animations
		const tl = gsap.timeline({
			onComplete: () => setIsModalOpen(false),
		});

		tl.to(modalContentRef.current, {
			opacity: 0,
			scale: 0.9,
			duration: 0.2,
			ease: 'power2.in',
		});
		tl.to(
			modalRef.current,
			{
				opacity: 0,
				duration: 0.2,
				ease: 'power2.in',
			},
			'<' // Start at same time as modalContent
		);
	}, []);

	// Pause preview video when modal opens, resume when modal closes
	useEffect(() => {
		if (!videoPreviewRef.current) return;

		const muxPlayerElement = videoPreviewRef.current.querySelector(
			'mux-player'
		) as any;
		if (!muxPlayerElement) return;

		// mux-player is a web component, access the underlying media element
		const mediaElement =
			muxPlayerElement.media || (muxPlayerElement as HTMLMediaElement);
		if (!mediaElement) return;

		if (isModalOpen) {
			mediaElement.pause?.();
		} else {
			mediaElement.play?.().catch(() => {
				// Ignore play() errors (e.g., if video hasn't loaded yet)
			});
		}
	}, [isModalOpen]);

	// Animate modal in when opened
	useEffect(() => {
		if (!isModalOpen || !modalRef.current || !modalContentRef.current)
			return;

		// Prevent body scroll
		document.body.style.overflow = 'hidden';

		// Set initial state
		gsap.set([modalRef.current, modalContentRef.current], {
			opacity: 0,
		});
		gsap.set(modalContentRef.current, { scale: 0.9 });

		// Use timeline for coordinated animations
		const tl = gsap.timeline();

		tl.to(modalRef.current, {
			opacity: 1,
			duration: 0.3,
			ease: 'power2.out',
		});
		tl.to(
			modalContentRef.current,
			{
				opacity: 1,
				scale: 1,
				duration: 0.3,
				ease: 'power2.out',
			},
			'<' // Start at same time as modalRef
		);

		return () => {
			document.body.style.overflow = '';
		};
	}, [isModalOpen]);

	// Handle escape key to close modal
	useEffect(() => {
		if (!isModalOpen) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleCloseModal();
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [isModalOpen, handleCloseModal]);

	// Bottom content offset
	const bottomheight = (bottomContentRef.current?.offsetHeight ?? 51) / 10;

	return (
		<S.Jacket ref={jacketRef}>
			<Background />

			<S.CenterContent ref={centerContentRef} $offset={bottomheight}>
				<Grid>
					<S.Texts $m='4/7' $l='8/12'>
						<StarHeading
							text={subheading}
							semantic='h1'
							passedRef={starHeadingRef}
						/>
						<S.Text ref={textRef}>{title}</S.Text>
						{isMobile && (
							<S.ButtonAnimation ref={buttonAnimationRef}>
								<Button
									href='/'
									label='View Profile'
									onClick={() => setProfileOpen(true)}
								/>
							</S.ButtonAnimation>
						)}
					</S.Texts>
				</Grid>
			</S.CenterContent>

			<S.BottomContent ref={bottomContentRef}>
				<Grid>
					<S.VideoPreview
						ref={videoPreviewRef}
						$s='1/2'
						$m='1/4'
						$l='1/3'
						$isModalOpen={profileOpen || contactOpen}
						data-hover
						onClick={handleOpenModal}
						role='button'
						tabIndex={0}
						onKeyDown={(e: KeyboardEvent) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								handleOpenModal();
							}
						}}
						aria-label='Open video modal'
					>
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

			{/* Video Modal */}
			{isModalOpen && (
				<VideoModal
					modalRef={modalRef}
					modalContentRef={modalContentRef}
					handleCloseModal={handleCloseModal}
					video={videoThumbnail}
				/>
			)}
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
