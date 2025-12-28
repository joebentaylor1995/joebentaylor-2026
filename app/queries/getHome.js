export const GET_HOME = `
    fragment Image on ResponsiveImage {
        src
        srcSet
        sizes
        width
        height
        alt
        title
        base64
        bgColor
    }

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
            services: servicesText {
                value
            }
            aboutImage: aboutMeImage {
                responsiveImage {
                    ...Image
                }
            }
            aboutDesc: aboutMeText {
                value
            }
            aboutMarquee: aboutMeMarquee {
                id
                responsiveImage {
                    ...Image
                }
            }
            clientsDesc {
                value
            }
            ethosHeading
            ethosText {
                value
            }
            awardsDesc {
                value
            }
        }

        services: allServices {
            id
            title: serviceTitle
            image: serviceImage {
                responsiveImage {
                    ...Image
                }
            }
        }

        skills: allSkills {
            id
            heading
            desc: description
            tools {
                id
                logoIcon {
                    url
                    alt
                    title
                    mimeType
                    responsiveImage {
                        ...Image
                    }
                }
            }
        }

        clients: allClients {
            id
            name
            logo {
                responsiveImage {
                    ...Image
                }
            }
        }

        awards: allAwards {
            id
            title: institution
            count: numberOfAwards
        }
    }
`;
