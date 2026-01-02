// Imports
// ------------
import { NextResponse } from 'next/server';

// GET handler - OAuth callback
// ------------
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');
	const error = searchParams.get('error');

	if (error) {
		return NextResponse.json({ error }, { status: 400 });
	}

	if (!code) {
		return NextResponse.json(
			{ error: 'No authorization code provided' },
			{ status: 400 }
		);
	}

	const clientId = process.env.DRIBBBLE_CLIENT_ID;
	const clientSecret = process.env.DRIBBBLE_CLIENT_SECRET;
	const redirectUri =
		process.env.DRIBBBLE_REDIRECT_URI ||
		'http://localhost:3000/api/dribbble/callback';

	if (!clientId || !clientSecret) {
		return NextResponse.json(
			{ error: 'Dribbble client credentials not configured' },
			{ status: 500 }
		);
	}

	try {
		// Exchange authorization code for access token
		const response = await fetch('https://dribbble.com/oauth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				client_id: clientId,
				client_secret: clientSecret,
				code: code,
				redirect_uri: redirectUri,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{
					error:
						data.error_description ||
						'Failed to exchange code for token',
				},
				{ status: response.status }
			);
		}

		// Return the access token
		return NextResponse.json({
			access_token: data.access_token,
			token_type: data.token_type,
			scope: data.scope,
			message:
				'Success! Copy the access_token and add it to your .env.local file as DRIBBBLE_ACCESS_TOKEN',
		});
	} catch (error: any) {
		console.error('Error in Dribbble OAuth callback:', error);
		return NextResponse.json(
			{ error: 'Failed to exchange authorization code' },
			{ status: 500 }
		);
	}
}
