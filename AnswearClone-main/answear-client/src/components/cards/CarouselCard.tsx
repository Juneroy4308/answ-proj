import React, { useState } from "react";

const Carousel: React.FC = () => {
    const logos = [
        "/assets/brands/guess.png",
        "/assets/brands/hugo.png",
        "/assets/brands/tommy_hilfiger.png",
        "/assets/brands/calvin_klein.png",
        "/assets/brands/diesel.png",
        "/assets/brands/crocs.png",
        "/assets/brands/boss.png",
        "/assets/brands/medicine.png",

        "/assets/brands/armani_exchange.png",
        "/assets/brands/karl_lagerfeld.png",
        "/assets/brands/superdry.png",
        "/assets/brands/emporio_armani.png",
        "/assets/brands/ralph_lauren.png",
        "/assets/brands/ea7_emporio_armani.png",
        "/assets/brands/adidas.png",
        "/assets/brands/tommy_jeans.png",

        "/assets/brands/pepe_jeans.png",
        "/assets/brands/g_star_raw.png",
        "/assets/brands/puma.png",
        "/assets/brands/nike.png",
        "/assets/brands/dr_marlens.png",
        "/assets/brands/gant.png",
        "/assets/brands/columbia.png",
        "/assets/brands/marc_opolo.png",

        "/assets/brands/caterpillar.png",
        "/assets/brands/allsaints.png",
        "/assets/brands/champion.png",
        "/assets/brands/under_armour.png",
        "/assets/brands/lab.png",
        "/assets/brands/liujo.png",
        "/assets/brands/vans.png",
        "/assets/brands/paul_and_shark.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const maxIndex = Math.ceil(logos.length / 8) - 1;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1 > maxIndex ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? maxIndex : prevIndex - 1));
    };

    return (
        <div className="relative w-full px-[40px] py-[20px] flex items-center justify-center my-[50px]">
            <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="overflow-hidden w-full max-w-full">
                <div
                    className="flex transition-transform ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)`, transitionDuration: "2000ms" }}
                >
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex-none w-1/8 flex justify-center items-center"
                            style={{ width: `${100 / 8}%` }}
                        >
                            <img src={logo} className="h-16 object-contain" alt={`Logo ${index}`} />
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default Carousel;
