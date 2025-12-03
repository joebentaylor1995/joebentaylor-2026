'use client';

// Imports
// ------------
import UnicornScene from "unicornstudio-react/next";


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
    };
    
    return (
        <S.Jacket>
            <S.Background>
                <UnicornScene
                    projectId={unicornScene}
                    dpi={[1, 1.5, 2]}
                    fps={120}
                    lazyLoad={false}
                    production={true}
                    onLoad={handleLoad}
                    onError={handleError}
                    ariaLabel="Animated background scene"
                    altText="Interactive 3D scene"
                />
            </S.Background>

            
        </S.Jacket>
    );
}

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;