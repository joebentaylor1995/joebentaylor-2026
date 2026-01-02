// Imports
// ------------

// Exports
// ------------
export interface SocialsProps {
    socials: SocialProps[];
}

export interface SocialProps {
    name: string;
    url: string;
    isEnabled?: boolean;
}