// Imports
// ------------
// import type { Metadata } from 'next';

// SEO
// ------------
// NOTE • Site-wide defaults live in app/(site)/layout.tsx — only add what
// this route changes. With CMS-driven SEO, swap the static object for
// generateMetadata:
//
// export async function generateMetadata(): Promise<Metadata> {
// 	const data = await fetchContent<HomeData>(GET_HOME);
//
// 	return {
// 		title: data?.seo?.title,
// 		description: data?.seo?.desc,
// 	};
// }

// Component
// ------------
const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};

// Exports
// ------------
Layout.displayName = 'Layout';
export default Layout;
