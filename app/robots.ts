// Imports
// ------------
import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config';

// Robots
// ------------
// NOTE • Served at /robots.txt. Non-production deploys (Netlify sets
// CONTEXT to deploy-preview / branch-deploy) are blocked from indexing so
// staging URLs never leak into search results. AI crawlers are explicitly
// allowed in production.
const isProduction = !process.env.CONTEXT || process.env.CONTEXT === 'production';

const aiCrawlers = ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web', 'PerplexityBot', 'Perplexity'];

const robots = (): MetadataRoute.Robots => {
	if (!isProduction) {
		return {
			rules: { userAgent: '*', disallow: '/' },
		};
	}

	return {
		rules: [{ userAgent: '*', allow: '/' }, ...aiCrawlers.map(userAgent => ({ userAgent, allow: '/' }))],
		sitemap: `${siteUrl}/sitemap.xml`,
	};
};

// Exports
// ------------
export default robots;
