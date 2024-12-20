import React from 'react';
import Button from "components/ui/Button.tsx";
import {IVideo} from "interfaces/video";
import {Label} from "components/ui";

const VideoBannerDesktop: React.FC<IVideo> = ({videoSrc}) => {
    return (
        <div className="relative w-full aspect-[172043/50000] bg-cover bg-center">
            <div className="absolute inset-0 flex items-center justify-center">
                <video autoPlay muted loop className="w-full h-full object-cover">
                    <source src={videoSrc} type="video/mp4"/>
                </video>
            </div>
            <div
                className="absolute bg-white bg-opacity-50 w-[362px] h-full left-16 p-4 flex flex-col justify-start items-start text-white">
                <div className="absolute bottom-8 left-6 flex flex-col ">
                    <Label size="superbold" >ANSWEAR</Label>
                    <Label size="superbold" >DAYS</Label>
                    <Label size="superbold" >ДО -40%</Label>
                    <Button variant="white" className="mt-4">Подивитися</Button>
                </div>

            </div>
        </div>
    );
}

export default VideoBannerDesktop;
