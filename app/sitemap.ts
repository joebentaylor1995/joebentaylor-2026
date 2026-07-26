// Imports
// ------------
import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config';

// Sitemap
// ------------
// NOTE • Served at /sitemap.xml. Static routes are listed by hand; with
// more CMS-driven routes, fetch slugs via @cms and spread them in.
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	return [
		{
			url: `${siteUrl}/`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	];
};

// Exports
// ------------
export default sitemap;
