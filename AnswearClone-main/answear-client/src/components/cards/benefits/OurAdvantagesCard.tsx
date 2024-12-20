import React from "react";

interface OurAdvantagesCardProps {
    title: string;
    description: string;
    image?: string;
}
const OurAdvantagesCard: React.FC<OurAdvantagesCardProps> = (props) => {
    const { title, description, image } = props;

    return (
        <div className="p-[20px] flex flex-col items-center">
            <img className="w-[96px] h-[96px]" src={image} alt={title} />
            <h1 className="text-center font-semibold text-[24px] my-[20px]">{title}</h1>
            <p className="text-[14px] text-center">{description}</p>
        </div>
    );
};

export default OurAdvantagesCard;
