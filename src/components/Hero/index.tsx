'use client';

// Imports
// ------------
import UnicornScene from "unicornstudio-react/next";
import Grid from '@waffl';
import StarHeading from '@parts/StarHeading';
import CopyrightYear from '@parts/CopyrightYear';
import { VideoPlayer } from 'react-datocms';
import { useResponsive } from '@utils/useResponsive';


// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';


// Component
// ------------
const Hero = ({ subheading, title, videoThumbnail, video, unicornScene }: I.HeroProps) => {


    const handleLoad = () => {
        console.log("Scene loaded successfully!");
    };

    const handleError = (error: Error) => {
        console.error("Scene loading failed:", error);
        alert(`Scene loading failed: ${error}`);
    };

    const { isDesktop } = useResponsive();

    
    return (
        <S.Jacket>
            <S.Background>
                <UnicornScene
                    jsonFilePath="/scene.json"
                    dpi={1.5}
                    fps={120}
                    lazyLoad={false}
                    production={true}
                    onLoad={handleLoad}
                    onError={handleError}
                    ariaLabel="Animated background scene"
                    altText="Interactive 3D scene"
                />
            </S.Background>

            <S.CenterContent>
                <Grid>
                    <S.Texts $l='8/12'>
                        <StarHeading text={subheading} semantic="h1" />
                        <S.Text>{title}</S.Text>
                    </S.Texts>
                </Grid>
            </S.CenterContent>

            <S.BottomContent>
                <Grid>
                    {isDesktop && (
                        <S.VideoPreview $l='1/2'>
                            <VideoPlayer
                                data={videoThumbnail}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </S.VideoPreview>
                    )}
                    
                    <S.Copyright $l='8/13'>
                        1995<hr />&copy;<hr /><CopyrightYear />
                    </S.Copyright>
                </Grid>
            </S.BottomContent>
        </S.Jacket>
    );
}

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;