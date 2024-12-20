import DiscountBlock from "components/blocks/user/DiscountBlock.tsx";
import MainProductsBlock from "components/blocks/user/MainProductsBlock.tsx";
import Carousel from "components/cards/CarouselCard.tsx";
import VideoBanerCard from "components/cards/VideoBanerCard.tsx";

const ClientHomePage = () => {
    return (
        <div>
            <VideoBanerCard
                desktopVideoSrc="/assets/FINAL_SALE_1920x558_sg_UA.mp4"
                mobileVideoSrc="/assets/FINAL_SALE_556x610_sg_UA.mp4"
            />
            <Carousel />
            <MainProductsBlock />
            <DiscountBlock />
        </div>
    );
};

export default ClientHomePage;
