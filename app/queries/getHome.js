export const GET_HOME = `
    query {
        home {
            subheading
            title
            videoThumbnail {
                url
                id
            }
            video {
                url
                provider
            }
            unicornScene
        }
    }
`;
