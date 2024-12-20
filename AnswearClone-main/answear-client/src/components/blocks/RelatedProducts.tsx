import ProductCard from "components/cards/products/ProductCard.tsx";
import { useGetSimilarProductsQuery } from "services/product.ts";

import React from "react";

interface RelatedProductsProps {
    id: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = (props) => {
    const { id } = props;
    const { data: products } = useGetSimilarProductsQuery({ id: id });

    return (
        <div className="mt-[60px] w-full py-[60px] bg-[#F4F4F4]">
            <h1 className="px-[60px] font-bold text-[20px] pb-[40px]">Схожі товари</h1>
            <div className={`${products?.length ? "grid" : "hidden"} grid-cols-4 px-14`}>
                {products?.map((product) => <ProductCard key={product.id} {...product} />)}
            </div>
        </div>
    );
};

export default RelatedProducts;
