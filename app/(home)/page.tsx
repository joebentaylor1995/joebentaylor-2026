// Imports
// ------------
import Hero from '@parts/Hero';
import Profile from '@parts/Profile';
import { performRequest } from '@utils/datocms';
import { GET_HOME } from '../queries/getHome';

// Data fetching at build time
// ------------
async function getHomeData() {
	try {
		const data = await performRequest(GET_HOME);
		return data;
	} catch (error) {
		console.error('Failed to fetch data from DatoCMS:', error);
		// Return fallback data or null to prevent app crash
		return null;
	}
}

// Component
// ------------
const Page = async () => {
	const data = await getHomeData();
	const { home, profile, skills, services, clients, awards, reviews } = data;

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
			/>
		</>
	);
};

// Exports
// ------------
export default Page;
