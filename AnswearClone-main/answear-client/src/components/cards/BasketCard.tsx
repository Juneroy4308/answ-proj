import { IconChevronDown } from "@tabler/icons-react";
import { Label } from "components/ui";
import { useGetBasketItemsQuery } from "services/basket.ts";
import { API_URL } from "utils/envData.ts";

import React, { useState } from "react";

const BasketCart: React.FC = () => {
    const [showAllItems, setShowAllItems] = useState(false);

    const { data: basketProducts } = useGetBasketItemsQuery();

    const itemsToShow = showAllItems ? basketProducts : basketProducts?.slice(0, 1);

    return (
        <div className="bg-gray-100 p-6 relative overflow-hidden">
            {/*/!* Тінь *!/*/}
            {/*{!showAllItems ? (*/}
            {/*    <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>*/}
            {/*) : (*/}
            {/*    ""*/}
            {/*)}*/}

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-row space-x-2 text-lg font-semibold">
                    <Label size="superBoldBlack">Кошик</Label>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white font-semibold">
                        {basketProducts?.length || 0}
                    </div>
                    {/*<span className="bg-black w-8 h-8 text-white rounded-full text-sm">*/}
                    {/*    {cartItems.reduce((total, item) => total + item.quantity, 0)}*/}
                    {/*</span>*/}
                </div>
                {/*<a href="#" className="text-sm text-gray-600 underline">*/}
                {/*    Змінити у Кошику*/}
                {/*</a>*/}
            </div>
            <hr className="border-gray-200" />
            {/* Items */}
            {itemsToShow?.map((item) => (
                <div key={item.productVariationId} className="py-4 border-b last:border-b-0 ">
                    <div className="flex gap-4">
                        {/* Image */}
                        <img
                            src={`${API_URL}/images/800_${item.productVariation.photos[0].name}`}
                            alt={item.productVariation.shortDescription}
                            className="w-[80px] h-[121px] object-cover rounded-md bg-gray-100"
                        />
                        {/* Info */}
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold">{item.productVariation.parentName}</h3>
                            <p className="text-lg font-bold text-gray-900">{item.productVariation.price} грн</p>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                    Варіант: <span className="font-medium">{item.productVariation.shortDescription}</span>
                                </p>
                                {/*<p>*/}
                                {/*    Розмір: <span className="font-medium">{item.size}</span>*/}
                                {/*</p>*/}
                                {/*<p>*/}
                                {/*    Ціна: <span className="font-medium">{item.price / item.quantity} грн</span>*/}
                                {/*</p>*/}
                                <p>
                                    Кількість: <span className="font-medium">{item.count}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Footer */}
            <div className="pt-4 flex justify-center flex-row" onClick={() => setShowAllItems(!showAllItems)}>
                <Label>{showAllItems ? "Приховати частину товарів" : "Показати всі товари"} </Label>
                <IconChevronDown
                    className={`ml-1 transform transition-transform ${showAllItems ? "rotate-180" : ""}`}
                    stroke={2}
                />
            </div>
        </div>
    );
};

export default BasketCart;
