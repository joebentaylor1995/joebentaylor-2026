export const GET_HOME = `
    query {
        home {
            subheading
            title
            videoThumbnail {
                url
                id
                video {
                    streamingUrl
                    thumbhash
                    thumbnailUrl
                    muxPlaybackId
                    muxAssetId
                    mp4Url
                    height
                    framerate
                    duration
                    blurhash
                    blurUpThumb
                    alt
                }
            }
            video {
                url
                provider
            }
            unicornScene
        }

        profile {
            introSubheading
            introHeading {
                heading
            }
            introText{
                value
            }
            statement
        }
    }
`;
