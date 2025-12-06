/**
 * React hook to change the page title when the user navigates away/back
 * Uses the Page Visibility API to detect when the tab becomes hidden/visible
 *
 * @param hiddenTitle - Title to show when tab is hidden (e.g., "Come back! 👋")
 * @param visibleTitle - Title to show when tab is visible (default: original title)
 *
 * @example
 * usePageTitle("Come back! 👋", "Welcome back!");
 */
import { useEffect, useRef } from 'react';

export function usePageTitle(hiddenTitle: string, visibleTitle?: string): void {
	const originalTitleRef = useRef<string>('');
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		// Store the original title on mount
		if (!originalTitleRef.current) {
			originalTitleRef.current = document.title;
		}

		const handleVisibilityChange = () => {
			// Clear any pending timeout when visibility changes
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}

			if (document.hidden) {
				// Tab is hidden - change to hidden title
				document.title = hiddenTitle;
			} else {
				// Tab is visible - restore to visible title or original for 1 second
				document.title = visibleTitle || originalTitleRef.current;
				// After 1 second, revert back to original title
				timeoutRef.current = setTimeout(() => {
					document.title = originalTitleRef.current;
					timeoutRef.current = null;
				}, 1000);
			}
		};

		// Listen for visibility changes
		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Cleanup
		return () => {
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange
			);
			// Clear any pending timeout
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			// Restore original title on unmount
			document.title = originalTitleRef.current;
		};
	}, [hiddenTitle, visibleTitle]);
}
