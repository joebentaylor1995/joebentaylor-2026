'use client';

// Imports
// ------------
import Form from './Form';
import StarHeading from '@parts/StarHeading';
import WelcomeTitle from './WelcomeTItle';
import MobileModalClose from '@parts/MobileModalClose';
import { FormProvider, FormContext } from '@parts/Contexts/ContactForm';
import { use, useRef, useLayoutEffect, useEffect, useContext } from 'react';
import { GlobalContext } from '@parts/Contexts';
import { gsap } from 'gsap';
import { bezzy3 } from '@parts/AnimationPlugins/Curves';
import { useIsDesktop } from '@utils/useResponsive';
import { useAnimation } from '@utils/useAnimation';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Inner component that can access FormContext
// ------------
const ContactContent = ({
	titlesRef,
	contactOpen,
}: {
	titlesRef: React.RefObject<HTMLDivElement | null>;
	contactOpen: boolean;
}) => {
	// Refs
	const { currentStep } = useContext(FormContext);

	useAnimation(
		({ isDesktop }) => {
			// If current step is 0, show titles (reset state)
			if (currentStep === 0) {
				gsap.set(titlesRef.current, {
					autoAlpha: contactOpen ? 1 : 0,
				});
				return;
			}

			gsap.to(titlesRef.current, {
				autoAlpha: contactOpen ? 0 : 1,
				duration: 0.5,
				delay: contactOpen ? 0 : 0.25,
				ease: bezzy3,
			});
		},
		{
			scope: titlesRef,
			dependencies: [currentStep, contactOpen],
		}
	);

	return (
		<>
			<S.Titles ref={titlesRef}>
				<StarHeading
					text="let's Talk"
					semantic='h2'
					iconOverride='chat'
					hasRotation={false}
				/>
				<WelcomeTitle text='Hello' shouldAnimate={contactOpen} />
			</S.Titles>

			<Form />
		</>
	);
};

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
	const titlesRef = useRef<HTMLDivElement>(null);

	// Handle main Lenis Provider when modal is open/closed
	useLayoutEffect(() => {
		// Stop root lenis when contact modal is open
		if (contactOpen) {
			lenis?.current?.stop();
		} else {
			lenis?.current?.start();
		}
	}, [contactOpen, lenis]);

	// Set initial position
	useLayoutEffect(() => {
		if (!jacketRef.current) return;

		// Set initial position offscreen and hidden
		gsap.set(jacketRef.current, {
			xPercent: 100,
			immediateRender: true,
		});
	}, []);

	// Animate on contactOpen change
	useEffect(() => {
		if (!jacketRef.current) return;

		const speed = 1;
		const ease = bezzy3;

		gsap.set(jacketRef.current, {
			autoAlpha: 1,
		});

		gsap.to(jacketRef.current, {
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

	return (
		<>
			<S.BackgroundOverlay $isOpen={contactOpen} onClick={handleClose} />

			<MobileModalClose
				onClick={() => setContactOpen(false)}
				isOpen={contactOpen}
			/>

			<S.Jacket data-lenis-prevent ref={jacketRef} onClick={handleClose}>
				<S.Content ref={contentRef}>
					<FormProvider>
						<ContactContent
							titlesRef={titlesRef}
							contactOpen={contactOpen}
						/>
					</FormProvider>
				</S.Content>
			</S.Jacket>
		</>
	);
};

// Exports
// ------------
Contact.displayName = 'Contact';
export default Contact;
