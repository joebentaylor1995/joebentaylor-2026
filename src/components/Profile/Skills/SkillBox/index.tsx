'use client';

// Imports
// ------------
import { useRef, useState } from 'react';
import SkillMarquee from './SkillMarquee';
import gsap from 'gsap';
import { useAnimation } from '@utils/useAnimation';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SkillBox = ({
	wrapperRef,
	heading,
	description,
	tools,
	cssAreaName,
	isLast,
	isActive,
}: I.SkillBoxProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

	// States
	const [isPlaying, setIsPlaying] = useState(false);

	// Animation
	useAnimation(
		({ isDesktop }) => {
			if (!jacketRef.current || !wrapperRef?.current || !isActive) return;

			// Animate Skillboxes when sticky
			gsap.fromTo(
				jacketRef.current,
				{
					scale: 1,
					autoAlpha: 1,
				},
				{
					scale: 0.8,
					autoAlpha: 0,
					ease: 'none',
					scrollTrigger: {
						scroller: wrapperRef?.current,
						trigger: jacketRef.current,
						start: isDesktop ? 'top top+=48' : 'top top+=24',
						end: isDesktop ? 'bottom top+=48' : 'bottom top+=24',
						scrub: 0.5,
					},
				}
			);

			// Play Marquees only when in view
			scrollTriggerRef.current = ScrollTrigger.create({
				scroller: wrapperRef?.current,
				trigger: jacketRef.current,
				start: 'top bottom',
				end: 'bottom top',
				scrub: false,
				onEnter: () => setIsPlaying(true),
				onEnterBack: () => setIsPlaying(true),
				onLeave: () => setIsPlaying(false),
				onLeaveBack: () => setIsPlaying(false),
			});

			return () => {
				if (scrollTriggerRef.current) {
					scrollTriggerRef.current.kill();
					scrollTriggerRef.current = null;
				}
			};
		},
		{ scope: jacketRef, dependencies: [isActive] }
	);

	return (
		<S.Jacket $cssAreaName={cssAreaName} ref={jacketRef}>
			<SkillMarquee
				tools={tools}
				isActive={isActive}
				isPlaying={isPlaying}
			/>

			<S.Texts $isLast={isLast}>
				<h2>{heading}</h2>
				<p>{description}</p>
			</S.Texts>
		</S.Jacket>
	);
};

// Exports
// ------------
SkillBox.displayName = 'SkillBox';
export default SkillBox;
