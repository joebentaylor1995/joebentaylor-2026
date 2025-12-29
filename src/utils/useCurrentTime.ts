// Imports
// ------------
import { useState, useEffect, useMemo } from 'react';

// Hook
// ------------
/**
 * Hook that returns the current time in London timezone and updates every second
 * @param options - Intl.DateTimeFormatOptions for formatting the time
 * @returns Formatted time string in London timezone
 */
export function useCurrentTime(
	options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Europe/London',
	}
): string {
	const timeOptions = useMemo(
		() => ({
			...options,
			timeZone: 'Europe/London',
		}),
		[options]
	);

	const [time, setTime] = useState(() =>
		new Date().toLocaleTimeString('en-GB', timeOptions)
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date().toLocaleTimeString('en-GB', timeOptions));
		}, 1000);

		return () => clearInterval(interval);
	}, [timeOptions]);

	return time;
}
