// GraphQL
// ------------
export const GET_GLOBAL = `
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
        loader {
            largeImages: loaderImages {
                responsiveImage(
                    imgixParams: { fit: crop, auto: format }
                ) {
                    ...Image
                }
            }
        }
        allSocialMediaLinks {
            name
            url
            isEnabled
        }
    }
`;
