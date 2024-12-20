import OurAdvantagesCard from "components/cards/benefits/OurAdvantagesCard.tsx";

const OurAdvantagesSection = () => {
    return (
        <div className="px-[60px] bg-white gap-[50px] py-[50px] grid grid-cols-3">
            <OurAdvantagesCard
                title="Безкоштовна доставка"
                description="Від 2500 грн. 4-7 робочих днів"
                image="https://img2.ans-media.com/ua/cms/homepage-usp/60ac4297cfbba1.46116791"
            />
            <OurAdvantagesCard
                title="30 днів на повернення"
                description="Лише оригінальні товари"
                image="https://img2.ans-media.com/ua/cms/homepage-usp/61f95591249a08.88529166"
            />
            <OurAdvantagesCard
                image="https://img2.ans-media.com/ua/cms/homepage-usp/60ac42ed054b59.98201091"
                title="Заощаджуй з Answear Club"
                description="Іноді навіть -50%"
            />
        </div>
    );
};

export default OurAdvantagesSection;
