import React from 'react';
import {isMobile} from 'react-device-detect';
import {IVideoBlockProps} from "interfaces/video";
import VideoBannerMobile from "components/cards/VideoBanerMobile.tsx";
import VideoBannerDesktop from "components/cards/VideoBanerDesktop.tsx";



const VideoBannerCard: React.FC<IVideoBlockProps> = ({ desktopVideoSrc, mobileVideoSrc }) => {
    return (

        isMobile ? <VideoBannerMobile videoSrc={mobileVideoSrc} /> : <VideoBannerDesktop videoSrc={desktopVideoSrc} />
    );
}

export default VideoBannerCard;
