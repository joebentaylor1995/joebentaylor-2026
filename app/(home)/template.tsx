'use client';

// Imports
// ------------
import { useState, useEffect, use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Component
// ------------
const Template = ({ children }: { children: React.ReactNode }) => {
	// State for tracking if all images are loaded
	const [imagesReady, setImagesReady] = useState(false);
	const [componentsReady, setComponentsReady] = useState(false);

	// Context
	const {
		setImagesLoaded,
		setComponentsLoaded,
		setRequiresUnicornScene,
		setUnicornSceneLoaded,
	} = use(GlobalContext);

	// Mark this page as requiring unicorn scene
	useEffect(() => {
		setRequiresUnicornScene(true);
		// Reset when component unmounts (navigating away)
		return () => {
			setRequiresUnicornScene(false);
			setUnicornSceneLoaded(false); // Reset for next page load
		};
	}, [setRequiresUnicornScene, setUnicornSceneLoaded]);

	// Effect to check if all images are loaded
	useEffect(() => {
		const images = Array.from(document.images);
		if (images.length === 0) {
			setImagesReady(true);
			return;
		}

		let loadedCount = 0;
		const checkLoaded = () => {
			loadedCount += 1;
			if (loadedCount === images.length) {
				setImagesReady(true);
			}
		};

		images.forEach(img => {
			if (img.complete && img.naturalHeight !== 0) {
				checkLoaded();
			} else {
				img.addEventListener('load', checkLoaded);
				img.addEventListener('error', checkLoaded);
			}
		});

		// Cleanup event listeners when component unmounts or images change
		return () => {
			images.forEach(img => {
				img.removeEventListener('load', checkLoaded);
				img.removeEventListener('error', checkLoaded);
			});
		};
	}, []);

	// Effect to check when all components are mounted/rendered
	useEffect(() => {
		// Use a microtask to ensure all children have been rendered after mount
		Promise.resolve().then(() => setComponentsReady(true));
	}, []);

	// Update Global Context
	useEffect(() => {
		if (imagesReady) {
			setImagesLoaded(true);
		}
		if (componentsReady) {
			setComponentsLoaded(true);
		}
	}, [imagesReady, componentsReady]);

	return children;
};

// Exports
// ------------
Template.displayName = 'Template';
export default Template;
