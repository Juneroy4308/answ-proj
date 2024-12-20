import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { IProductPhoto } from "interfaces/product";
import { API_URL } from "utils/envData.ts";

import React, { useEffect, useState } from "react";

interface GalleryViewerProps {
    photos: IProductPhoto[];
}

const GalleryViewer: React.FC<GalleryViewerProps> = (props) => {
    const { photos } = props;
    const [active, setActive] = useState<string>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        setActive(photos[0]?.name);
        setCurrentIndex(0);
    }, [photos]);

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % photos.length;
        setCurrentIndex(nextIndex);
        setActive(photos[nextIndex].name);
    };

    const handlePrevious = () => {
        const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
        setCurrentIndex(prevIndex);
        setActive(photos[prevIndex].name);
    };

    return (
        <div className="relative">
            <div className="flex gap-[30px]">
                <div className="flex flex-col items-center gap-[10px] flex-wrap">
                    {photos.map((image, index) => (
                        <div
                            key={index}
                            className={`overflow-hidden border-[1px] ${
                                active === image.name ? "border-[#000]" : "border-[#CACACA]"
                            }`}
                        >
                            <img
                                onClick={() => {
                                    setActive(image.name);
                                    setCurrentIndex(index);
                                }}
                                src={`${API_URL}/images/800_${image.name}`}
                                className="h-[120px] w-[80px] cursor-pointer object-cover object-center"
                                alt="gallery-image"
                            />
                        </div>
                    ))}
                </div>

                <div className="relative">
                    <img
                        className="h-[570px] w-[500px] object-contain"
                        src={
                            active
                                ? `${API_URL}/images/800_${active}`
                                : "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
                        }
                        alt="main gallery-image"
                    />

                    {photos.length > 1 && (
                        <>
                            <button
                                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black px-3 py-2  "
                                onClick={handlePrevious}
                            >
                                <IconChevronLeft className="w-6 h-6 text-black dark:text-gray-200" />
                            </button>
                            <button
                                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black px-3 py-2 "
                                onClick={handleNext}
                            >
                                <IconChevronRight className="w-6 h-6 text-black dark:text-gray-200" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GalleryViewer;
