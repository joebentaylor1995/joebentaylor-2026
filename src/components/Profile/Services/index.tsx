'use client';

// Imports
// ------------
import Grid from '@waffl';
import StarHeading from '@parts/StarHeading';
import { StructuredText, SRCImage } from 'react-datocms';
import { useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import { gsap } from 'gsap';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Constants
// ------------
const IMAGE_SIZE = {
	MOBILE: 48,
	DESKTOP: 72,
};

const GAP = {
	MOBILE: 18,
	DESKTOP: 24,
};

const OFFSET = {
	MOBILE: IMAGE_SIZE.MOBILE + GAP.MOBILE,
	DESKTOP: IMAGE_SIZE.DESKTOP + GAP.DESKTOP,
};

// Component
// ------------
const Services = ({
	services,
	servicesText,
	isActive,
	wrapperRef,
	columnOverride,
}: I.ServicesProps) => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const serviceItemsRef = useRef<HTMLElement[]>([]);
	const pictureRefs = useRef<HTMLElement[]>([]);
	const titleRefs = useRef<HTMLElement[]>([]);

	// Animation
	useAnimation(
		({ isDesktop }) => {
			if (!isActive) return;

			serviceItemsRef.current.forEach((item, index) => {
				const title = titleRefs.current[index];
				const image = pictureRefs.current[index];

				if (!title || !image || !item) return;

				const IMG = {
					BEFORE: {
						scale: 0,
					},
					AFTER: {
						scale: 1,
					},
				};

				const TEXT = {
					BEFORE: {
						x: isDesktop ? -OFFSET.DESKTOP : -OFFSET.MOBILE,
						autoAlpha: 0.4,
					},
					AFTER: {
						x: 0,
						autoAlpha: 1,
					},
				};

				// Set the initial values
				gsap.set(title, { ...TEXT.BEFORE });
				gsap.set(image, { ...IMG.BEFORE });

				// Create the timeline
				const tl = gsap.timeline({
					scrollTrigger: {
						scroller: wrapperRef?.current,
						trigger: item,
						start: 'top 65%',
						end: 'bottom 55%',
						scrub: 0.5,
						markers: false,
					},
				});

				// Animate the title and image IN
				tl.to(title, { ...TEXT.AFTER, ease: 'none' }, 0);
				tl.to(image, { ...IMG.AFTER, ease: 'none' }, 0);

				// Animate the title and image OUT
				tl.to(title, { ...TEXT.BEFORE, ease: 'none' }, 0.5);
				tl.to(image, { ...IMG.BEFORE, ease: 'none' }, 0.5);
			});
		},
		{ scope: jacketRef, dependencies: [isActive] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<Grid $lCols={columnOverride}></Grid>

			<Grid $lCols={columnOverride}>
				<S.Sticky $m='1/3' $l='1/4'>
					<StarHeading text='Services' semantic='h2' />
				</S.Sticky>

				<S.Text $m='3/7' $l='4/9'>
					<S.Desc>
						<StructuredText data={servicesText} />
					</S.Desc>

					<S.ServiceList>
						{services?.map(({ id, image, title }, index) => (
							<S.ServiceItem
								key={id}
								ref={(el: HTMLElement | null) => {
									if (el) {
										serviceItemsRef.current[index] = el;
									}
								}}
							>
								<S.Picture
									ref={(el: HTMLElement | null) => {
										if (el) {
											pictureRefs.current[index] = el;
										}
									}}
								>
									<SRCImage data={image?.responsiveImage} />
								</S.Picture>

								<S.Title
									ref={(el: HTMLElement | null) => {
										if (el) {
											titleRefs.current[index] = el;
										}
									}}
								>
									<h3>{title}</h3>
								</S.Title>
							</S.ServiceItem>
						))}
					</S.ServiceList>
				</S.Text>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Services.displayName = 'Services';
export default Services;
