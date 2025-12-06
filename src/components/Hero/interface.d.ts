// Imports
// ------------

import { Video } from "react-datocms";

// Exports
// ------------
export interface HeroProps {
    subheading: string;
    title: string;
    videoThumbnail: {
        url: string;
        id: string;
    };
    video: Video | null;
    unicornScene: string;
}