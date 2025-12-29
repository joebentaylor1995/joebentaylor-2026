// Imports
// ------------
import { useState, useEffect } from 'react';

// Hook
// ------------
/**
 * Hook that returns the current time and updates every second
 * @param options - Intl.DateTimeFormatOptions for formatting the time
 * @returns Formatted time string
 */
export function useCurrentTime(
	options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}
): string {
	const [time, setTime] = useState(() =>
		new Date().toLocaleTimeString([], options)
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date().toLocaleTimeString([], options));
		}, 1000);

		return () => clearInterval(interval);
	}, [options]);

	return time;
}
