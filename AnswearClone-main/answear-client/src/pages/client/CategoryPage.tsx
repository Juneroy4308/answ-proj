import ProductCard from "components/cards/products/ProductCard.tsx";
import SkeletonProductCard from "components/cards/products/SkeletonProductCard.tsx";
import ItemsNotFound from "components/partials/ItemsNotFound.tsx";
import { useParams } from "react-router-dom";
import { useGetCategoryBySlugQuery } from "services/category.ts";
import { useGetPagedProductsQuery } from "services/product.ts";

import { useEffect, useState } from "react";

const ClientCategoryPage = () => {
    const { slug } = useParams();

    const { data: category } = useGetCategoryBySlugQuery(slug || "");
    const [categoryId, setCategoryId] = useState<number>(category?.id || 0);

    const { data: products, isLoading, isSuccess } = useGetPagedProductsQuery({ categoryId: categoryId }, { skip: !category });

    useEffect(() => {
        if (category) {
            setCategoryId(category.id);
        }
    }, [category]);

    return (
        <div className="w-full pt-[30px] px-[60px] bg-white grid grid-cols-4">
            <div className="col-span-1 flex flex-col gap-[4px]">
                <button onClick={() => setCategoryId(category?.id || 0)} className="text-[16px] font-semibold flex">
                    <p>{category?.name}</p>
                </button>
                {category?.childrens?.map((child) => (
                    <button
                        className={`${child.id === categoryId ? "font-bold" : ""} text-[14px] ps-[8px] flex`}
                        key={child.id}
                        onClick={() => setCategoryId(child.id)}
                    >
                        <p>{child.name}</p>
                    </button>
                ))}
            </div>
            <div className="col-span-3 flex flex-col gap-[20px]">
                <h1 className="text-[28px] font-semibold">{category?.name}</h1>
                {isSuccess && !products?.items.length ? <ItemsNotFound /> : null}
                <div className="grid grid-cols-3">
                    {isLoading && Array.from({ length: 3 }).map((_, index) => <SkeletonProductCard key={index} />)}
                    {products?.items.map((item) => <ProductCard key={item.id} {...item} />)}
                </div>
            </div>
        </div>
    );
};

export default ClientCategoryPage;
