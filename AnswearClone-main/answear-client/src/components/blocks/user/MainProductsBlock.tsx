import ProductCard from "components/cards/products/ProductCard.tsx";
import { useLocation } from "react-router-dom";
import { useGetPagedProductsQuery } from "services/product.ts";

const MainProductsBlock = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const targetGroupId = searchParams.get("targetGroupId");

    const { data: products } = useGetPagedProductsQuery({
        targetGroupId: targetGroupId ? parseInt(targetGroupId) : 1,
        pageIndex: 0,
        pageSize: 4,
        isRandomItems: true,
    });

    return (
        <div className={`${products?.items.length ? "grid" : "hidden"} grid-cols-4 px-14 mb-[50px]`}>
            {products?.items.map((product) => <ProductCard key={product.id} {...product} />)}
        </div>
    );
};

export default MainProductsBlock;
