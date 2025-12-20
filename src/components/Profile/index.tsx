'use client';

// Imports
// ------------
import SmoothScroll from './SmoothScroll';
import Introduction from './Introduction';
import Statement from './Statement';
import Skills from './Skills';
import { use, useRef, useLayoutEffect, useEffect } from 'react';
import { GlobalContext } from '@parts/Contexts';
import { gsap } from 'gsap';
import { bezzy3 } from '@parts/AnimationPlugins/Curves';
import { useIsDesktop } from '@utils/useResponsive';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Constants
// ------------
const COL_OVERRIDE = 8;

// Component
// ------------
const Profile = ({
	introSubheading,
	introHeading,
	introText,
	statement,
	skills,
}: I.ProfileProps) => {
	// Context
	const { lenis, profileOpen, setProfileOpen } = use(GlobalContext);

	// Device detection
	const isDesktop = useIsDesktop();

	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		// Stop root lenis when profile modal is open
		if (profileOpen) {
			lenis?.current?.stop();
		} else {
			lenis?.current?.start();
		}
	}, [profileOpen, lenis]);

	// Set initial position
	useLayoutEffect(() => {
		if (!jacketRef.current) return;

		// Set initial position offscreen and make visible (GSAP takes over)
		gsap.set(jacketRef.current, {
			xPercent: 100,
			autoAlpha: 1, // Makes it visible (opacity: 1, visibility: visible)
			immediateRender: true,
		});
	}, []);

	// Animate on profileOpen change
	useEffect(() => {
		if (!jacketRef.current) return;

		const speed = 1;
		const ease = bezzy3;

		gsap.to(jacketRef.current, {
			xPercent: profileOpen ? 0 : 100,
			duration: speed,
			ease: ease,
		});
	}, [profileOpen]);

	// Handle click anywhere to close modal (desktop only)
	const handleClose = () => {
		if (isDesktop) {
			setProfileOpen(false);
		}
	};

	// Handle close for mobile (used by MobileClose button)
	const handleMobileClose = () => {
		setProfileOpen(false);
	};

	return (
		<>
			<S.BackgroundOverlay
				$isProfileOpen={profileOpen}
				onClick={handleClose}
			/>

			<S.MobileClose
				onClick={handleMobileClose}
				$isProfileOpen={profileOpen}
			>
				Close
			</S.MobileClose>

			<S.Jacket data-lenis-prevent ref={jacketRef} onClick={handleClose}>
				<SmoothScroll
					wrapperRef={jacketRef}
					contentRef={contentRef}
					isActive={profileOpen}
				/>
				<S.Content ref={contentRef}>
					<Introduction
						isActive={profileOpen}
						columnOverride={COL_OVERRIDE}
						introSubheading={introSubheading}
						introHeading={introHeading}
						introText={introText}
					/>

					<Statement
						isActive={profileOpen}
						wrapperRef={jacketRef}
						columnOverride={COL_OVERRIDE}
						text={statement}
					/>

					<Skills
						skills={skills}
						isActive={profileOpen}
						wrapperRef={jacketRef}
						columnOverride={COL_OVERRIDE}
					/>
				</S.Content>
			</S.Jacket>
		</>
	);
};

// Exports
// ------------
Profile.displayName = 'Profile';
export default Profile;
