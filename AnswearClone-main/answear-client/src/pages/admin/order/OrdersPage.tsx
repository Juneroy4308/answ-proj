import OrdersTable from "components/partials/order/OrdersTable.tsx";
import { useGetOrderStausesQuery, useGetOrdersQuery } from "services/order.ts";

import PageTitle from "../../../components/ui/PageTitle.tsx";

const OrdersPage = () => {
    const { data: orders } = useGetOrdersQuery();
    const { data: statuses } = useGetOrderStausesQuery();

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Список замовлень" description="Всі замовлення!" />
            <OrdersTable orders={orders} statuses={statuses} />
        </div>
    );
};

export default OrdersPage;
