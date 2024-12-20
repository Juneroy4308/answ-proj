import React from 'react';
import Button from "components/ui/Button.tsx";
import {IVideo} from "interfaces/video";
import {Label} from "components/ui";




const VideoBannerMobile: React.FC<IVideo> = ({ videoSrc }) => {
    return (

        <div className="relative w-full aspect-[172/189]  bg-cover bg-center" >
            <div className="absolute inset-0 flex items-center justify-center">
                <video autoPlay
                       muted
                       loop
                       playsInline
                       style={{ pointerEvents: 'none' }}
                       className="w-full h-full object-cover">
                    <source src={videoSrc} type="video/mp4" />
                </video>
            </div>
            <div
                className="absolute bottom-0 left-4 bg-white bg-opacity-50 w-[190px] h-[160px]  p-4 flex flex-col justify-start items-start text-white">
                <div className=" flex flex-col">
                    <Label size="boldmobile" >ANSWEAR</Label>
                    <Label size="boldmobile">DAYS</Label>
                    <Label size="boldmobile">ДО -40%</Label>
                    <Button variant="white" className="mt-2 text-xs px-4 h-8">Подивитися</Button>
                </div>

            </div>
        </div>
    );
}

export default VideoBannerMobile;
