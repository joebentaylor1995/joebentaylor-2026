'use client';

/**
 * Marquee — A horizontally scrolling marquee/carousel component.
 *
 * @remarks
 * - Can pass multiple items as children, or pass one item and have it auto clone for you using the `autoClone` prop (default is `true`)
 * - Pauses marquee when out of view, plays when in view.
 *
 * @example
 * <Marquee>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Marquee>
 *
 * @example
 * <Marquee autoClone>
 *   <div>One item will be cloned for continuous marquee</div>
 * </Marquee>
 *
 * @param children - Marquee content. Can be single or multiple nodes.
 * @param speed - Duration (in seconds) for one full marquee animation cycle. High number = slower marquee. Default is `10`.
 * @param direction - Scroll direction, "left" or "right". Default is `"left"`.
 * @param autoClone - If true, repeats/duplicates the children automatically for seamless scroll. Default is `true`.
 */
import { useRef, useState } from 'react';
import { useAnimation } from '@utils/useAnimation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Marquee = ({
	children,
	speed = 10,
	direction = 'left',
	autoClone = true,
	cloneCount = 6,
}: I.MarqueeProps) => {
	// Reference to the outer container (jacket)
	const jacketRef = useRef<HTMLDivElement>(null);

	// Track play state
	const [isPlaying, setIsPlaying] = useState(false);

	// Sync playing state with scroll visibility using ScrollTrigger
	useAnimation(
		({}) => {
			if (!jacketRef.current) return;

			const scrollTrigger = ScrollTrigger.create({
				trigger: jacketRef.current,
				start: 'top bottom',
				end: 'bottom top',
				onEnter: () => setIsPlaying(true),
				onLeave: () => setIsPlaying(false),
				onEnterBack: () => setIsPlaying(true),
				onLeaveBack: () => setIsPlaying(false),
			});

			// Clean up ScrollTrigger on unmount or dependency change
			return () => {
				if (scrollTrigger) {
					scrollTrigger.kill();
				}
			};
		},
		{ scope: jacketRef }
	);

	/**
	 * Render a single List (loop). If autoClone is true, clones children to fill space.
	 * @param isHidden - If true, aria-hidden='true' for accessibility
	 * @param children - React children (passed by caller)
	 */
	const renderList = (isHidden?: boolean, children?: React.ReactNode) => {
		const clonedChildren = autoClone
			? Array.from({ length: cloneCount }, () => children)
			: [children];

		return (
			<S.List
				$isPlaying={isPlaying}
				$direction={direction}
				aria-hidden={isHidden ? 'true' : 'false'}
			>
				{clonedChildren.map((child, index) => (
					<li key={index}>{child}</li>
				))}
			</S.List>
		);
	};

	return (
		<S.Jacket ref={jacketRef} $speed={speed}>
			{renderList(false, children)}
			{renderList(true, children)}
		</S.Jacket>
	);
};

// Exports
// ------------
Marquee.displayName = 'Marquee';
export default Marquee;
