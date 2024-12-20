import { IconHeart } from "@tabler/icons-react";
import { IProduct } from "interfaces/product";
import { Link } from "react-router-dom";
import { useDeleteFavoritProductMutation, useGetFavoritProductsQuery, useSetFavoritProductsMutation } from "services/product.ts";
import { API_URL } from "utils/envData.ts";

import React, { useEffect, useState } from "react";

const ProductCard: React.FC<IProduct> = (props) => {
    const { data: products } = useGetFavoritProductsQuery();
    const [deleteFavoritProduct] = useDeleteFavoritProductMutation();
    const [addFavoritProduct] = useSetFavoritProductsMutation();

    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        if (products) {
            setIsFavorited(products.some((product) => product.id === props.id));
        }
    }, [products, props.id]);

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isFavorited) {
            deleteFavoritProduct(props.id);
        } else {
            addFavoritProduct(props.id);
        }
        setIsFavorited(!isFavorited);
    };

    return (
        <Link to={`/product/${props.variations[0].slug}`} className="max-w-xs group relative overflow-hidden cursor-pointer">
            <div className="relative">
                <img
                    src={`${API_URL}/images/800_${props.variations[0].photos[0].name}`}
                    alt={props.name}
                    className="w-[325px] h-[495px]"
                />
                <div className="absolute top-2 right-2">
                    <IconHeart
                        fill={`${isFavorited ? "red" : "none"}`}
                        className={`cursor-pointer ${isFavorited ? "text-red-500" : "text-gray-400"} hover:text-red-500`}
                        onClick={handleFavoriteToggle}
                    />
                </div>
            </div>

            <div className="absolute -bottom-[10px] left-0 right-0 p-1 bg-white h-[55px] group-hover:h-[75px] duration-500">
                <h3 className="text-gray-900 font-semibold text-[12px] line-clamp-1">{props.name}</h3>
                <p className="text-[#C60C0C] text-[14px]">{props.variations[0].price} грн</p>

                <div className="hidden group-hover:flex">
                    {props.variations.map((variation, index) => (
                        <p key={variation.id} className="text-black font-bold text-[14px]">
                            {variation.shortDescription}
                            {props.variations.length !== index + 1 && <span className="px-[2px]">|</span>}
                        </p>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
