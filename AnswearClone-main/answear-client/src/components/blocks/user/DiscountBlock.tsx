import Button from "components/ui/Button.tsx";
import { useGetDiscountsQuery } from "services/discount.ts";
import { API_URL } from "utils/envData.ts";

import { useMemo } from "react";

const DiscountBlock = () => {
    const { data: discounts } = useGetDiscountsQuery();

    const randomDiscount = useMemo(() => {
        if (!discounts?.length) return null;
        const randomIndex = Math.floor(Math.random() * discounts.length);
        return discounts[randomIndex];
    }, [discounts]);

    if (!randomDiscount) return null;

    return (
        <div className="grid grid-cols-2 px-14 mb-[50px]">
            <div className="flex flex-col items-start justify-center max-w-[375px]">
                <h1 className="mb-[20px] font-bold text-[34px] leading-none">{randomDiscount.name}</h1>
                <Button>Подивитися</Button>
            </div>
            <div>
                <img
                    className="w-full object-contain"
                    src={`${API_URL}/images/1200_${randomDiscount.mediaFile}`}
                    alt={randomDiscount.name}
                />
            </div>
        </div>
    );
};

export default DiscountBlock;
