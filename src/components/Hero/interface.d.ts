// Imports
// ------------

// Exports
// ------------
export interface HeroProps {
    subheading: string;
    title: string;
    videoThumbnail: {
        url: string;
        id: string;
    };
    video: {
        id: string;
        url: string;
        provider: string;
    };
    unicornScene: string;
}