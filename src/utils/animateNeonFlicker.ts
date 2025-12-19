import { gsap } from 'gsap';

/**
 * Configuration options for the neon flicker animation
 */
export interface NeonFlickerOptions {
	/** Maximum random delay before animation starts (in seconds). Default: 0.4 */
	maxDelay?: number;
	/** Minimum number of flickers. Default: 2 */
	minFlickers?: number;
	/** Maximum number of flickers. Default: 5 */
	maxFlickers?: number;
	/** Minimum duration of each flicker (in seconds). Default: 0.02 */
	minFlickerDuration?: number;
	/** Maximum duration of each flicker (in seconds). Default: 0.05 */
	maxFlickerDuration?: number;
	/** Minimum opacity during flicker (0-1). Default: 0.3 */
	minFlickerOpacity?: number;
	/** Maximum opacity during flicker (0-1). Default: 0.8 */
	maxFlickerOpacity?: number;
	/** Duration of final fade to full opacity (in seconds). Default: 0.2 */
	finalFadeDuration?: number;
	/** Easing function for final fade. Default: 'power2.out' */
	finalFadeEase?: string;
	/** Position in parent timeline to start animation. Default: 0 */
	timelinePosition?: number | string;
}

/**
 * Default configuration for neon flicker animation
 */
const DEFAULT_OPTIONS: Required<NeonFlickerOptions> = {
	maxDelay: 0.4,
	minFlickers: 2,
	maxFlickers: 5,
	minFlickerDuration: 0.02,
	maxFlickerDuration: 0.05,
	minFlickerOpacity: 0.3,
	maxFlickerOpacity: 0.8,
	finalFadeDuration: 0.5,
	finalFadeEase: 'sine.inOut',
	timelinePosition: 0,
};

/**
 * Creates a neon flicker animation effect for elements (like broken neon lights).
 * Each element will flicker randomly before settling at full opacity.
 *
 * @param elements - Array of elements (or single element) to animate
 * @param parentTimeline - GSAP timeline to add animations to (optional, creates new if not provided)
 * @param options - Configuration options for the animation
 * @returns GSAP timeline containing all flicker animations
 *
 * @example
 * ```tsx
 * import { animateNeonFlicker } from '@utils/animateNeonFlicker';
 * import SplitText from 'gsap/SplitText';
 *
 * // With SplitText characters
 * const split = SplitText.create(heading, { type: 'chars' });
 * const tl = gsap.timeline();
 * animateNeonFlicker(split.chars, tl);
 * ```
 *
 * @example
 * ```tsx
 * // With custom options
 * animateNeonFlicker(elements, timeline, {
 *   maxDelay: 0.6,
 *   minFlickers: 3,
 *   maxFlickers: 7,
 *   finalFadeDuration: 0.3,
 * });
 * ```
 */
export function animateNeonFlicker(
	elements: Element[] | Element | null,
	parentTimeline?: gsap.core.Timeline,
	options: NeonFlickerOptions = {}
): gsap.core.Timeline {
	// Merge options with defaults
	const config = { ...DEFAULT_OPTIONS, ...options };

	// Create timeline if not provided
	const tl = parentTimeline || gsap.timeline();

	// Handle null/empty elements
	if (!elements) return tl;

	// Convert single element to array
	const elementsArray = Array.isArray(elements) ? elements : [elements];

	// Filter out null/undefined elements
	const validElements = elementsArray.filter(
		el => el !== null && el !== undefined
	) as Element[];

	if (validElements.length === 0) return tl;

	// Animate each element individually
	validElements.forEach(element => {
		// Random delay for stagger effect
		const randomDelay = Math.random() * config.maxDelay;

		// Random number of flickers
		const flickerCount =
			Math.floor(
				Math.random() * (config.maxFlickers - config.minFlickers + 1)
			) + config.minFlickers;

		// Create individual timeline for this element
		const elementTl = gsap.timeline({ delay: randomDelay });

		// Flicker effect - rapid opacity changes
		for (let i = 0; i < flickerCount; i++) {
			// Random flicker duration
			const flickerDuration =
				config.minFlickerDuration +
				Math.random() *
					(config.maxFlickerDuration - config.minFlickerDuration);

			// Random flicker opacity
			const flickerOpacity =
				config.minFlickerOpacity +
				Math.random() *
					(config.maxFlickerOpacity - config.minFlickerOpacity);

			// Flicker ON
			elementTl.to(element, {
				autoAlpha: flickerOpacity,
				duration: flickerDuration,
				ease: 'none',
			});

			// Flicker OFF
			elementTl.to(element, {
				autoAlpha: 0,
				duration: flickerDuration,
				ease: 'none',
			});
		}

		// Final fade to full opacity
		elementTl.to(element, {
			autoAlpha: 1,
			duration: config.finalFadeDuration,
			ease: config.finalFadeEase,
		});

		// Add this element's timeline to the parent timeline
		tl.add(elementTl, config.timelinePosition);
	});

	return tl;
}
