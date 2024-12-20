import { IconHeart, IconX } from "@tabler/icons-react";
import { IProductVariation } from "interfaces/product";
import { useAddToBasketMutation, useDecrementItemQuantityMutation, useRemoveFromBasketMutation } from "services/basket.ts";
import { useDeleteFavoritProductMutation, useGetFavoritProductsQuery, useSetFavoritProductsMutation } from "services/product.ts";
import { API_URL } from "utils/envData.ts";

import React, { useEffect, useState } from "react";

interface IProductBasketCardProps {
    product: IProductVariation;
    count: number;
}

const ProductBasketCard: React.FC<IProductBasketCardProps> = ({ product, count }) => {
    const { shortDescription, price, photos, id, discountValue, parentName, parentId } = product;

    const { data: products } = useGetFavoritProductsQuery();
    const [deleteFavoritProduct] = useDeleteFavoritProductMutation();
    const [addFavoritProduct] = useSetFavoritProductsMutation();
    const [isFavorited, setIsFavorited] = useState(false);

    const [removeBasketItem] = useRemoveFromBasketMutation();
    const [decrementItemQuantity] = useDecrementItemQuantityMutation();
    const [incrementItemQuantity] = useAddToBasketMutation();

    useEffect(() => {
        if (products) {
            setIsFavorited(products.some((product) => product.id === id));
        }
    }, [products, id]);

    const handleQuantityChange = (type: "increment" | "decrement") => {
        if (type === "increment") {
            incrementItemQuantity({ productVariationId: id, count: 1 });
        }

        if (type === "decrement") {
            decrementItemQuantity(id);
        }
    };

    const handleRemoveItem = (id: number) => {
        removeBasketItem(id);
    };

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isFavorited) {
            deleteFavoritProduct(parentId);
        } else {
            addFavoritProduct(parentId);
        }
        setIsFavorited(!isFavorited);
    };

    return (
        <div className="flex gap-10 py-5 border-t">
            <div className="w-32">
                <img
                    src={`${API_URL}/images/800_${photos[0].name}`}
                    alt={shortDescription}
                    className="w-full h-full object-cover rounded"
                />
            </div>

            <div className="flex-1">
                <div className="flex text-lg font-medium mb-4 justify-between">
                    {parentName}
                    <div className="font-bold">{price} грн</div>
                </div>

                <div className="flex flex-col gap-y-2 text-sm mb-4">
                    <div className="flex items-center">
                        <p className="text-gray-500 w-20">Опис</p>
                        <p className="font-bold">{shortDescription}</p>
                    </div>

                    {/*<div className="flex items-center">*/}
                    {/*    <p className="text-gray-500 w-20">Розмір</p>*/}
                    {/*    <p className="font-bold">{product.size}</p>*/}
                    {/*</div>*/}

                    <div className="flex items-center">
                        <p className="text-gray-500 w-20">Ціна</p>
                        <div className="flex gap-2 items-center">
                            <span className="text-red-600 font-bold">{price} грн</span>
                            {discountValue ? (
                                <span className="line-through text-black font-bold">{discountValue} грн</span>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <p className="text-gray-500 w-20">Кількість</p>
                        <div className="flex items-center gap-2">
                            <button className="px-2 py-1" onClick={() => handleQuantityChange("decrement")}>
                                -
                            </button>
                            <span className="font-bold">{count}</span>
                            <button className="px-2 py-1" onClick={() => handleQuantityChange("increment")}>
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 text-sm">
                    <button
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleRemoveItem(id)}
                    >
                        <IconX size={20} />
                        Видалити
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700" onClick={handleFavoriteToggle}>
                        <IconHeart fill={`${isFavorited ? "red" : "none"}`} size={20} />
                        <p>{isFavorited ? "Видалити із Мій Вибір" : "Додати до закладки Мій Вибір"}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductBasketCard;
