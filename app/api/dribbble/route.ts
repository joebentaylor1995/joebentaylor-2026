// Imports
// ------------
import { NextResponse } from 'next/server';
import { fetchDribbbleShots, getShotImageUrls } from '@utils/dribbble';

// GET handler
// ------------
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const perPage = parseInt(searchParams.get('per_page') || '100');
	const page = parseInt(searchParams.get('page') || '1');

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
		return NextResponse.json(
			{ error: 'Failed to fetch Dribbble shots' },
			{ status: 500 }
		);
	}
}
