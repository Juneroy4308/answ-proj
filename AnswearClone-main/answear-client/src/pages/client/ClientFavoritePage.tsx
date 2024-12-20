import ProductCard from "components/cards/products/ProductCard.tsx";
import SkeletonProductCard from "components/cards/products/SkeletonProductCard.tsx";
import ItemsNotFound from "components/partials/ItemsNotFound.tsx";
import { useGetFavoritProductsQuery } from "services/product.ts";

const ClientFavoritePage = () => {
    const { data: products, isLoading, isSuccess } = useGetFavoritProductsQuery();

    return (
        <div className="w-full pt-[30px] px-[60px] bg-white">
            <h1 className="text-[28px] font-semibold">Мої обрані</h1>
            {isSuccess && !products?.length ? <ItemsNotFound /> : null}
            <div className="mt-[30px] grid grid-cols-4 gap-y-[40px]">
                {isLoading && Array.from({ length: 4 }).map((_, index) => <SkeletonProductCard key={index} />)}{" "}
                {products?.map((item) => <ProductCard key={item.id} {...item} />)}
            </div>
        </div>
    );
};

export default ClientFavoritePage;
