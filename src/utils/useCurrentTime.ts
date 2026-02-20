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
const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
	hour: '2-digit',
	minute: '2-digit',
	hour12: false,
	timeZone: 'Europe/London',
};

export function useCurrentTime(
	options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS
): string {
	// Stabilize options by stringifying so inline objects don't cause interval thrash
	const optionsKey =
		typeof options === 'object' && options !== null
			? JSON.stringify(options)
			: '';
	const timeOptions = useMemo(
		() => ({ ...DEFAULT_OPTIONS, ...options }),
		[optionsKey]
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
