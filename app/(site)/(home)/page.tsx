// Imports
// ------------
import { fetchContent, GET_GLOBAL, GET_HOME } from '@cms';
import Hero from '@parts/Hero';
import Profile from '@parts/Profile';
import type { GlobalData, HomeData } from '@/types/home';

// Component
// ------------
// NOTE • fetchContent returns null (never throws) when the CMS is missing
// or unconfigured, so wiring this up can't crash the route. GET_GLOBAL is
// deduped with the layout's call via React cache in the CMS client.
const Page = async () => {
	const [data, globalData] = await Promise.all([
		fetchContent<HomeData>(GET_HOME),
		fetchContent<GlobalData>(GET_GLOBAL),
	]);

	// NOTE • Without CMS data there is nothing to render — bail gracefully so
	// builds without CMS access (missing token, offline CI) still succeed
	if (!data) {
		console.warn('GET_HOME returned no data — rendering an empty home page. Check NEXT_DATOCMS_API_TOKEN.');
		return null;
	}

	const { home, profile, skills, services, clients, awards, reviews } = data;
	const allSocialMediaLinks = globalData?.allSocialMediaLinks || [];

	return (
		<>
			<Hero
				subheading={home?.subheading}
				title={home?.title}
				videoThumbnail={home?.videoThumbnail?.video}
				video={home?.video}
				unicornScene={home?.unicornScene}
			/>

			<Profile
				introSubheading={profile?.introSubheading}
				introHeading={profile?.introHeading}
				introText={profile?.introText}
				statement={profile?.statement}
				skills={skills}
				servicesText={profile?.services}
				services={services}
				aboutImage={profile?.aboutImage}
				aboutDesc={profile?.aboutDesc}
				aboutMarquee={profile?.aboutMarquee}
				clientsDesc={profile?.clientsDesc}
				clients={clients}
				ethosHeading={profile?.ethosHeading}
				ethosText={profile?.ethosText}
				awardsDesc={profile?.awardsDesc}
				awards={awards}
				reviewsDesc={profile?.reviewsDesc}
				reviews={reviews}
				socials={allSocialMediaLinks}
			/>
		</>
	);
};

// Exports
// ------------
export default Page;
