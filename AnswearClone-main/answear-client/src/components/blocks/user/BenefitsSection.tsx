import DiscountAnswearClubCard from "components/cards/benefits/DiscountAnswearClubCard.tsx";
import NewsletterSubscriptionCard from "components/cards/benefits/NewsletterSubscriptionCard.tsx";

const BenefitsSection = () => {
    return (
        <div className="flex flex-col gap-[26px] px-[60px] pb-[10px] lg:flex-row lg:items-stretch lg:justify-between">
            <DiscountAnswearClubCard />
            <NewsletterSubscriptionCard />
        </div>
    );
};

export default BenefitsSection;
