import { IconX } from "@tabler/icons-react";
import { Button, Label } from "components/ui";
import { Link } from "react-router-dom";
import { useGetDiscountsQuery } from "services/discount.ts";

import { useState } from "react";

const TopBar = () => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    const { data } = useGetDiscountsQuery();

    return (
        <div className="relative">
            {isBannerVisible ? (
                <div className="bg-black h-8 flex items-center gap-5 justify-center">
                    <Label size="sm" className="text-white">
                        {data?.[0]?.name ?? "Вітаємо на AriaApparel"}
                    </Label>
                    <Button
                        variant="icon"
                        size="iconsm"
                        className="bg-inherit absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={() => setIsBannerVisible(false)}
                    >
                        <IconX className="text-white" />
                    </Button>
                </div>
            ) : (
                <div className="bg-black h-8 flex items-center gap-5 justify-center">
                    <Link className="mx-8 hidden lg:block" to="/">
                        <Label variant="primary" size="sm">
                            Безкоштовна доставка з ЄС (від 2000 грн)
                        </Label>
                    </Link>
                    <Link className="mx-8 hidden lg:block" to="/">
                        <Label variant="primary" size="sm">
                            Лише оригінальні товари
                        </Label>
                    </Link>
                    <Link className="mx-8" to="/">
                        <Label variant="primary" size="sm">
                            Заощаджуй з Answear Club
                        </Label>
                    </Link>
                    <Link className="mx-8 hidden lg:block" to="/">
                        <Label variant="primary" size="sm">
                            -15% на перше замовлення
                        </Label>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TopBar;
