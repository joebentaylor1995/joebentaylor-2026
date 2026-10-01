// Imports
// ------------

import { fetchDribbbleShots, getShotImageUrls } from '@utils/dribbble';
import { NextResponse } from 'next/server';

// GET handler
// ------------
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const perPage = parseInt(searchParams.get('per_page') || '100', 10);
	const page = parseInt(searchParams.get('page') || '1', 10);

	try {
		const shots = await fetchDribbbleShots(perPage, page);
		const imageUrls = getShotImageUrls(shots);

		return NextResponse.json({
			shots,
			imageUrls,
			count: shots.length,
		});
	} catch (error) {
		console.error('Error in Dribbble API route:', error);
		return NextResponse.json({ error: 'Failed to fetch Dribbble shots' }, { status: 500 });
	}
}
