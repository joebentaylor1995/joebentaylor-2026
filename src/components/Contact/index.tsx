'use client';

// Imports
// ------------
import SmoothScroll from './SmoothScroll';
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
const Contact = ({}: I.ContactProps) => {
	// Context
	const { lenis, contactOpen, setContactOpen } = use(GlobalContext);

	// Device detection
	const isDesktop = useIsDesktop();

	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	// Handle main Lenis Provider when modal is open/closed
	useLayoutEffect(() => {
		// Stop root lenis when profile modal is open
		if (contactOpen) {
			lenis?.current?.stop();
		} else {
			lenis?.current?.start();
		}
	}, [contactOpen, lenis]);

	// Animate on contactOpen change
	useEffect(() => {
		if (!jacketRef.current) return;

		const speed = 1;
		const ease = bezzy3;

		gsap.to(jacketRef.current, {
			autoAlpha: 1,
			xPercent: contactOpen ? 0 : 100,
			duration: speed,
			ease: ease,
		});
	}, [contactOpen]);

	// Handle click anywhere to close modal (desktop only)
	// Only closes if clicking on non-interactive elements
	const handleClose = (e: React.MouseEvent) => {
		if (!isDesktop) return;

		const target = e.target as HTMLElement;

		// Don't close if clicking on interactive elements
		const isInteractive =
			target.closest(
				'button, a, [role="button"], input, select, textarea'
			) ||
			target.closest('[data-interactive]') ||
			target.hasAttribute('title') || // Elements with tooltips
			target.closest('[title]'); // Parent elements with tooltips

		if (!isInteractive) {
			setContactOpen(false);
		}
	};

	// Handle close for mobile (used by MobileClose button)
	const handleMobileClose = () => setContactOpen(false);

	// Create Shared Props
	const sharedProps = {
		isActive: contactOpen,
		wrapperRef: jacketRef,
		columnOverride: COL_OVERRIDE,
	};

	return (
		<>
			<S.BackgroundOverlay $isOpen={contactOpen} onClick={handleClose} />

			<S.Jacket data-lenis-prevent ref={jacketRef} onClick={handleClose}>
				<SmoothScroll {...sharedProps} contentRef={contentRef} />

				<S.Content ref={contentRef}>
					{/*  */}
					{/*  */}
					{/*  */}
				</S.Content>
			</S.Jacket>
		</>
	);
};

// Exports
// ------------
Contact.displayName = 'Contact';
export default Contact;
