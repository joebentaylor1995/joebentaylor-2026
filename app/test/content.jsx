'use client';

// Imports
// ------------
import { useState, useLayoutEffect } from 'react';

// Component
// ------------
const Content = ({ example }) => {
	const [browserWidth, setBrowserWidth] = useState(0);
	const [browserHeight, setBrowserHeight] = useState(0);

	useLayoutEffect(() => {
		setBrowserWidth(window.innerWidth);
		setBrowserHeight(window.innerHeight);

		const handleResize = () => {
			setBrowserWidth(window.innerWidth);
			setBrowserHeight(window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			<section
				style={{
					position: 'fixed',
					inset: 0,
					background: 'black',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						'--browser-width': `${browserWidth}px`,
						'--browser-height': `${browserHeight}px`,
						aspectRatio: `${browserWidth} / ${browserHeight}`,

						width: '25vw',
						background: 'red',
						clipPath: 'inset(0 round 6px)',
					}}
				/>
			</section>

			<aside
				style={{
					'--browser-width': `${browserWidth}px`,
					'--browser-height': `${browserHeight}px`,
					aspectRatio: `${browserWidth} / ${browserHeight}`,

					position: 'fixed',
					inset: '0 auto auto 0',
					width: '100%',
					background: 'blue',
					clipPath: 'inset(37.5% round 6px)',
				}}
			>
				<div
					style={{
						width: '100%',
						height: '100%',
						background: 'green',
						scale: 0.4,
					}}
				/>
			</aside>
		</>
	);
};

// Exports
// ------------
Content.displayName = 'Content';
export default Content;
