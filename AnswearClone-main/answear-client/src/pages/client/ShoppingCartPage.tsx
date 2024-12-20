import { IconCircleLetterA, IconClockHour4, IconGift, IconTruckDelivery } from "@tabler/icons-react";
import ProductBasketCard from "components/cards/products/ProductBasketCard.tsx";
import SkeletonProductBasket from "components/cards/products/SkeletonProductBasket.tsx";
import { Button } from "components/ui";
import { useNavigate } from "react-router-dom";
import { useGetBasketItemsQuery } from "services/basket.ts";
import { useGetDiscountsQuery } from "services/discount.ts";

import React, { useMemo, useState } from "react";

const ShoppingCartPage: React.FC = () => {
    // const [isPromoOpen, setIsPromoOpen] = useState(false);
    // const [promoCode, setPromoCode] = useState("");
    const navigate = useNavigate();
    const [isGiftWrapping, setIsGiftWrapping] = useState(false);
    const GIFT_WRAPPING_PRICE = 169;

    const { data: discounts } = useGetDiscountsQuery();
    const { data: basketProducts, isLoading } = useGetBasketItemsQuery();

    const randomDiscount = useMemo(() => {
        if (!discounts?.length) return null;
        const randomIndex = Math.floor(Math.random() * discounts.length);
        return discounts[randomIndex];
    }, [discounts]);

    // const handleApplyPromo = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log(`Applying promo code: ${promoCode}`);
    // };

    const getTotalAmount = () => {
        if (!basketProducts) return 0;
        const startPrice = isGiftWrapping ? GIFT_WRAPPING_PRICE : 0;
        return basketProducts.reduce((sum, item) => sum + item.count * item.productVariation.price, startPrice);
    };

    function handleBuyNow() {
        navigate("/checkout");
    }

    return (
        <div className="  mx-auto px-[60px] py-[30px]">
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-8">
                {/* Left Section - Cart Items */}

                {isLoading ? (
                    <SkeletonProductBasket />
                ) : (
                    <div className="lg:col-span-7">
                        <div className="bg-gray-100 p-6">
                            <p className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                Кошик
                                <span className="flex items-center justify-center w-6 h-6 p-2 rounded-full border-2 border-[#FFC300] text-[#000000] font-bold text-xs">
                                    {basketProducts?.length}
                                </span>
                            </p>

                            {/* Promo Banner */}
                            {randomDiscount ? (
                                <div className="bg-yellow-400 p-4 mb-6">
                                    <p className="text-xs">
                                        {randomDiscount.name}. Купуйте товари, та отримуйте приємні знижки!
                                        <span className="underline cursor-pointer ml-1">Подивитися</span>
                                    </p>
                                </div>
                            ) : null}

                            {/* Cart Item Here*/}
                            {basketProducts?.map((product, index) => (
                                <ProductBasketCard key={index} count={product.count} product={product.productVariation} />
                            ))}

                            {basketProducts?.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-10">
                                    <p className="text-xl font-semibold text-gray-700">Ваш кошик порожній 🛒</p>
                                    <p className="text-sm text-gray-500 mt-2">Додайте товари, щоб побачити їх тут!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Right Section - Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-white">
                        {/* Gift Section */}
                        <div className="flex justify-between items-center p-4 bg-gray-100 mb-6">
                            <div className="flex items-center gap-2 pl-2">
                                <IconGift />
                                <div>
                                    <p className="font-medium">Запакуй на подарунок</p>
                                    {/*<p className="text-sm text-black underline cursor-pointer">Більше інформації</p>*/}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{GIFT_WRAPPING_PRICE} грн</span>
                                <div
                                    onClick={() => setIsGiftWrapping(!isGiftWrapping)}
                                    className={`w-5 h-5 border cursor-pointer flex items-center justify-center ${
                                        isGiftWrapping ? "bg-black text-white" : "bg-white"
                                    }`}
                                >
                                    {isGiftWrapping && "✓"}
                                </div>
                            </div>
                        </div>

                        {/*/!* Promo Code *!/*/}
                        {/*<div className="p-4 bg-gray-100 mb-6">*/}
                        {/*    <div*/}
                        {/*        className="flex items-center gap-2 cursor-pointer pl-2"*/}
                        {/*        onClick={() => setIsPromoOpen(!isPromoOpen)}*/}
                        {/*    >*/}
                        {/*        <IconGiftCard />*/}
                        {/*        <span>Промокод</span>*/}

                        {/*        <IconChevronDown*/}
                        {/*            className={`transition-transform duration-300 ${isPromoOpen ? "rotate-180" : ""}`}*/}
                        {/*            size={16}*/}
                        {/*        />*/}
                        {/*    </div>*/}

                        {/*    <div*/}
                        {/*        className={`overflow-hidden transition-all duration-700 ease-in-out ${*/}
                        {/*            isPromoOpen ? "max-h-[200px]" : "max-h-0"*/}
                        {/*        }`}*/}
                        {/*    >*/}
                        {/*        {isPromoOpen && (*/}
                        {/*            <form onSubmit={handleApplyPromo} className="mt-3">*/}
                        {/*                <div className="flex gap-2">*/}
                        {/*                    <input*/}
                        {/*                        type="text"*/}
                        {/*                        value={promoCode}*/}
                        {/*                        onChange={(e) => setPromoCode(e.target.value)}*/}
                        {/*                        placeholder="Введіть промокод"*/}
                        {/*                        className="flex-1 px-3 py-2 focus:border-black focus:ring-0"*/}
                        {/*                    />*/}
                        {/*                    <button type="submit" className="px-4 py-2 bg-black text-white hover:bg-gray-900">*/}
                        {/*                        ОК*/}
                        {/*                    </button>*/}
                        {/*                </div>*/}
                        {/*            </form>*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/* Order Summary */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Всього</h3>
                            <div className="space-y-2 pt-2 border-t">
                                <div className="flex justify-between">
                                    <span className="text-black">Сума товарів:</span>
                                    <span>
                                        {basketProducts?.reduce((sum, item) => sum + item.count * item.productVariation.price, 0)}{" "}
                                        грн
                                    </span>

                                    {/*<span>{product.price} грн</span>*/}
                                </div>
                                {isGiftWrapping && (
                                    <div className="flex justify-between">
                                        <span className="text-black">Подарункова упаковка:</span>
                                        <span>{GIFT_WRAPPING_PRICE} грн</span>
                                    </div>
                                )}
                                {/*<div className="flex justify-between">*/}
                                {/*    <span className="text-black">Сума знижки:</span>*/}
                                {/*    <span>0 грн</span>*/}
                                {/*</div>*/}
                                {/*<div className="flex justify-between">*/}
                                {/*    <span className="text-black">Доставка:</span>*/}
                                {/*    <span>200 грн</span>*/}
                                {/*</div>*/}
                                <div className="flex justify-between text-lg font-bold pt-2">
                                    <span>Оплата:</span>
                                    <span>{getTotalAmount()} грн</span>
                                </div>
                            </div>

                            <Button onClick={handleBuyNow} size="full">
                                Купити
                            </Button>

                            <p className="text-xs text-black pb-2">
                                Увага! Вартість замовлення перевищує еквівалент 150 €. На посилку будуть нараховані державні мита
                                у розмірі
                                <span className="font-bold ml-1">18.24 €. </span>
                            </p>

                            {/* Additional Info */}
                            <div className="space-y-4 pt-4 bg-gray-100 p-5 pl-6">
                                <div className="flex items-center gap-2">
                                    <IconTruckDelivery size={26} />
                                    <p className="text-sm">Безкоштовна доставка з ЄС (при покупці від 2500 грн)</p>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <IconClockHour4 size={26} />
                                    <p className="text-sm">30 днів на повернення</p>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <IconCircleLetterA size={26} />
                                    <p className="text-sm">Заощаджуй з Answear Club</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;
