// Imports
// ------------
export interface DribbbleShot {
	id: number;
	title: string;
	description: string;
	images: {
		hidpi: string | null;
		normal: string;
		teaser: string;
	};
	html_url: string;
	published_at: string;
	updated_at: string;
	views_count: number;
	likes_count: number;
}

export interface DribbbleUser {
	id: number;
	name: string;
	username: string;
	html_url: string;
	avatar_url: string;
	bio: string;
	location: string;
}

/**
 * Fetches shots from Dribbble API for the authenticated user
 * Requires DRIBBBLE_ACCESS_TOKEN environment variable
 * Uses GET /user/shots endpoint which returns only shots owned by the authenticated user
 *
 * @param perPage - Number of shots per page (max 100, default 30)
 * @param page - Page number
 * @returns Promise with array of Dribbble shots
 */
export async function fetchDribbbleShots(
	perPage: number = 100,
	page: number = 1
): Promise<DribbbleShot[]> {
	// Use server-side token (more secure) or public token (client-side)
	const accessToken =
		process.env.DRIBBBLE_ACCESS_TOKEN ||
		process.env.NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN;

	if (!accessToken) {
		console.warn(
			'DRIBBBLE_ACCESS_TOKEN not found. Please set DRIBBBLE_ACCESS_TOKEN (server) or NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN (client) in your environment variables.'
		);
		return [];
	}

	try {
		// Use /user/shots endpoint - returns shots for the authenticated user
		const endpoint = 'https://api.dribbble.com/v2/user/shots';

		const url = new URL(endpoint);
		url.searchParams.set('page', page.toString());
		url.searchParams.set('per_page', perPage.toString());

		const response = await fetch(url.toString(), {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Invalid Dribbble access token');
			}
			if (response.status === 429) {
				throw new Error('Dribbble API rate limit exceeded');
			}
			throw new Error(`Dribbble API error: ${response.statusText}`);
		}

		const data = await response.json();
		return data as DribbbleShot[];
	} catch (error) {
		console.error('Error fetching Dribbble shots:', error);
		return [];
	}
}

/**
 * Gets image URLs from Dribbble shots
 * Prioritizes hidpi images, falls back to normal
 *
 * @param shots - Array of Dribbble shots
 * @returns Array of image URLs
 */
export function getShotImageUrls(shots: DribbbleShot[]): string[] {
	return shots.map(shot => shot.images.hidpi || shot.images.normal);
}
