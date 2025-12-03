// Imports
// ------------
import Hero from '@parts/Hero';
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
	const { home } = data;


	console.table(home);

	return (
		<>
			<Hero
				subheading={home?.subheading}
				title={home?.title}
				videoThumbnail={home?.videoThumbnail}
				video={home?.video}
				unicornScene={home?.unicornScene}
			/>
		</>
	);
};


// Exports
// ------------
export default Page;
