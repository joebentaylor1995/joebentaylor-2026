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
import { waitForFonts } from '@utils/waitForFonts';
import { useResponsive } from '@utils/useResponsive';
import { useMagnetic } from '@utils/useMagnetic';
import { VideoPlayer } from 'react-datocms';
import { slow, smooth } from '@parts/AnimationPlugins/Curves';
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
	const [resizeTrigger, setResizeTrigger] = useState(0); // Ref to help trigger animation on resize

	// Context
	const { loaderFinished, profileOpen, setProfileOpen } = use(GlobalContext);

	// State to control when animations trigger
	const [shouldAnimate, setShouldAnimate] = useState(false);

	// Hide CenterContent and BottomContent initially until loader finishes
	useLayoutEffect(() => {
		const elementsToHide = [
			centerContentRef.current,
			bottomContentRef.current,
		].filter(Boolean) as HTMLElement[];

		if (elementsToHide.length > 0) {
			gsap.set(elementsToHide, { autoAlpha: 0 });
		}
	}, []);

	// Fade in CenterContent and BottomContent when loader finishes
	useEffect(() => {
		if (!loaderFinished) return;

		const elementsToFadeIn = [
			centerContentRef.current,
			bottomContentRef.current,
		].filter(Boolean) as HTMLElement[];

		if (elementsToFadeIn.length > 0) {
			// Fade in CenterContent and BottomContent
			gsap.to(elementsToFadeIn, {
				autoAlpha: 1, // opacity + visibility
				duration: 0.8,
				delay: 0.75,
				ease: 'power2.out',
				stagger: 0.1,
			});
		}
	}, [loaderFinished]);

	// Apply magnetic effect to video preview (desktop only)
	useMagnetic(videoPreviewRef, {
		radius: 120,
		strength: 0.4,
		enabled: isDesktop,
	});

	// Helper to split/re-split text before animating
	const splitAndPrepareText = useCallback(() => {
		return new Promise<void>(resolve => {
			// Wait for fonts to load before splitting to prevent layout shifts
			waitForFonts().then(() => {
				// Kill any running animations
				if (textSplitRef.current?.words) {
					gsap.killTweensOf(textSplitRef.current.words);
				}

				// Revert any previous split
				textSplitRef.current?.revert?.();
				textSplitRef.current = null;

				if (textRef.current) {
					// Ensure text is hidden before splitting
					gsap.set(textRef.current, { opacity: 0 });

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

							// Resolve when split is complete
							resolve();
						},
					});
				} else {
					resolve();
				}
			});
		});
	}, []);

	// Create splits when component is first rendered
	useAnimation(
		() => {
			splitAndPrepareText();
		},
		{
			scope: jacketRef,
			dependencies: [textRef], // Split on mount/re-render
		}
	);

	// Listen for window resize to reset split and play animation
	useEffect(() => {
		let resizeTimeout: ReturnType<typeof setTimeout>;
		let splitTimeout: ReturnType<typeof setTimeout>;

		const handleResize = () => {
			// Debounce resize
			clearTimeout(resizeTimeout);
			clearTimeout(splitTimeout);
			resizeTimeout = setTimeout(() => {
				// Re-split the text, then trigger animation
				splitAndPrepareText().then(() => {
					// Small delay to ensure split is ready
					splitTimeout = setTimeout(() => {
						setResizeTrigger(prev => prev + 1);
					}, 50);
				});
			}, 150);
		};

		window.addEventListener('resize', handleResize, { passive: true });
		return () => {
			clearTimeout(resizeTimeout);
			clearTimeout(splitTimeout);
			window.removeEventListener('resize', handleResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [splitAndPrepareText]);

	// Whenever loaderFinished, shouldAnimate, or resizeTrigger changes, animate text in
	useEffect(() => {
		if (!loaderFinished && !shouldAnimate && resizeTrigger === 0) return;

		const slowCurve = slow;
		const smoothCurve = smooth;

		if (textSplitRef.current?.words) {
			// Kill any running animations first
			gsap.killTweensOf(textSplitRef.current.words);
			if (buttonAnimationRef.current) {
				gsap.killTweensOf(buttonAnimationRef.current);
			}
			if (starHeadingRef.current) {
				gsap.killTweensOf(starHeadingRef.current);
			}

			// Prepare: move words down, hide button and star heading
			gsap.set(textSplitRef.current.words, { yPercent: 100 });
			// Show text container now that words are positioned
			if (textRef.current) {
				gsap.set(textRef.current, { opacity: 1 });
			}
			// Batch opacity settings for better performance
			const elementsToHide = [
				buttonAnimationRef.current,
				starHeadingRef.current,
			].filter(Boolean) as HTMLElement[];
			if (elementsToHide.length > 0) {
				gsap.set(elementsToHide, { opacity: 0 });
			}

			// Small delay to ensure DOM is ready
			const timeoutId = setTimeout(() => {
				// Fade in StarHeading first
				if (starHeadingRef.current) {
					gsap.to(starHeadingRef.current, {
						opacity: 1,
						duration: 0.6,
						ease: 'power2.out',
						onComplete: () => {
							// Then animate text up after StarHeading fades in
							if (textSplitRef.current?.words) {
								gsap.to(textSplitRef.current.words, {
									yPercent: 0,
									duration: 0.643,
									ease: slowCurve,
									stagger: {
										each: 0.051,
										ease: smoothCurve,
									},
									onComplete: () => {
										// Fade in button after text animation completes
										if (buttonAnimationRef.current) {
											gsap.to(
												buttonAnimationRef.current,
												{
													opacity: 1,
													duration: 0.5,
													ease: 'power2.out',
												}
											);
										}
									},
								});
							}
						},
					});
				}
			}, 10);

			// Cleanup: clear timeout if component unmounts or effect re-runs
			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [loaderFinished, shouldAnimate, resizeTrigger]);

	// Cleanup splits on unmount
	useEffect(() => {
		return () => {
			textSplitRef.current?.revert();
		};
	}, []);

	// Handle modal open
	const handleOpenModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	// Handle modal close
	const handleCloseModal = useCallback(() => {
		if (modalRef.current && modalContentRef.current) {
			// Animate out
			gsap.to(modalContentRef.current, {
				opacity: 0,
				scale: 0.9,
				duration: 0.2,
				ease: 'power2.in',
			});
			gsap.to(modalRef.current, {
				opacity: 0,
				duration: 0.2,
				ease: 'power2.in',
				onComplete: () => {
					setIsModalOpen(false);
				},
			});
		} else {
			setIsModalOpen(false);
		}
	}, []);

	// Pause preview video when modal opens, resume when modal closes
	useEffect(() => {
		if (!videoPreviewRef.current) return;

		const muxPlayerElement = videoPreviewRef.current.querySelector(
			'mux-player'
		) as any;

		if (muxPlayerElement) {
			// mux-player is a web component, access the underlying media element
			const mediaElement =
				muxPlayerElement.media ||
				(muxPlayerElement as HTMLMediaElement);

			if (mediaElement) {
				if (isModalOpen) {
					// Pause when modal opens
					if (typeof mediaElement.pause === 'function') {
						mediaElement.pause();
					}
				} else {
					// Resume when modal closes
					if (typeof mediaElement.play === 'function') {
						mediaElement.play().catch(() => {
							// Ignore play() errors (e.g., if video hasn't loaded yet)
						});
					}
				}
			}
		}
	}, [isModalOpen]);

	// Animate modal in when opened
	useEffect(() => {
		if (!isModalOpen || !modalRef.current || !modalContentRef.current)
			return;

		// Prevent body scroll
		document.body.style.overflow = 'hidden';

		// Animate in
		gsap.set(modalRef.current, { opacity: 0 });
		gsap.set(modalContentRef.current, { opacity: 0, scale: 0.9 });

		gsap.to(modalRef.current, {
			opacity: 1,
			duration: 0.3,
			ease: 'power2.out',
		});
		gsap.to(modalContentRef.current, {
			opacity: 1,
			scale: 1,
			duration: 0.3,
			ease: 'power2.out',
		});

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
			<Background setShouldAnimate={setShouldAnimate} />

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
						$isModalOpen={isModalOpen}
						$isProfileOpen={profileOpen}
						data-hover
						onClick={handleOpenModal}
						role='button'
						tabIndex={0}
						onKeyDown={e => {
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
