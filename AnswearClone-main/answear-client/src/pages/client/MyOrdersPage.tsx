import ProductOrdersCard from "components/cards/products/ProductOrdersCard.tsx";
import { useGetUserOrdersQuery } from "services/order.ts";

const MyOrdersPage = () => {
    const { data: orders } = useGetUserOrdersQuery();

    return (
        <div className="w-full pt-[30px] px-[60px] bg-white">
            <h1 className="text-[28px] font-semibold">Мої замовлення</h1>

            <div className="py-5 flex flex-col gap-5">
                {orders?.map((order, index) => <ProductOrdersCard key={index} {...order} />)}

                {orders?.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10">
                        <p className="text-xl font-semibold text-gray-700">У вас немає замовлень 🛒</p>
                        <p className="text-sm text-gray-500 mt-2">Ви можете замовити товари у нашому магазині!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;
