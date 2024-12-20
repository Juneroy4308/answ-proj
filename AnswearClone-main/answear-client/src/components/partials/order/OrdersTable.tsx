import { IconUser } from "@tabler/icons-react";
import { Option, Select } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { IOrder, IOrderStatus } from "interfaces/order/orders.ts";
import { toast } from "react-toastify";
import { useUpdateOrderStatusMutation } from "services/order.ts";

import React from "react";

interface OrdersTableProps {
    orders: IOrder[] | undefined;
    statuses: IOrderStatus[] | undefined;
}
const OrdersTable: React.FC<OrdersTableProps> = (props) => {
    const { orders, statuses } = props;

    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const statusChange = async (orderId: number, newStatusId: number) => {
        try {
            await updateOrderStatus({ orderId, orderStatusId: newStatusId }).unwrap();
            toast.success("Статус успішно змінено", toastOptions);
        } catch (error) {
            toast.success("Статус не змінено", toastOptions);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm font-bold text-left text-black">
                <thead className="text-xs text-black uppercase bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Товари
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Дані отримувача
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Статус замовлення
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order, index) => (
                        <tr
                            key={order.id}
                            className={`border-b ${
                                order.orderStatus.name === "В обробці"
                                    ? "bg-yellow-100"
                                    : order.orderStatus.name === "Завершено"
                                      ? "bg-green-100"
                                      : order.orderStatus.name === "Скасовано"
                                        ? "bg-red-100"
                                        : "bg-white"
                            }`}
                        >
                            <td className="px-6 py-4">{++index}</td>
                            <td className="px-6 py-4">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="max-w-[300px] flex flex-col overflow-hidden">
                                        <p className="font-semibold text-gray-700">
                                            {item.productVariation.shortDescription} * {item.count} шт
                                        </p>
                                        <a target="_blank" href={`/product/${item.productVariation.slug}/`}>
                                            <span className="font-normal text-sky-600 overflow-ellipsis underline">
                                                {item.productVariation.slug}
                                            </span>
                                        </a>
                                    </div>
                                ))}
                                <hr className="border-black my-2" />
                                <p>
                                    <span className="font-semibold text-black pe-1">Загальна сума:</span>
                                    {order.orderItems?.reduce((sum, item) => sum + item.count * item.productVariation.price, 0)}
                                    {" грн"}
                                </p>
                            </td>
                            <td className="px-6 py-4 w-[400px]">
                                <div className="flex flex-col">
                                    <p className="font-bold text-gray-700 inline-flex">
                                        <IconUser /> {order.orderContactInfo.firstName} {order.orderContactInfo.lastName}
                                    </p>
                                    <span className="font-normal text-gray-500">{order.orderContactInfo.email}</span>
                                    <span className="font-normal text-gray-500">{order.orderContactInfo.phone}</span>
                                    <span className="font-semibold italic text-gray-500">
                                        {order.orderContactInfo.address}, {order.orderContactInfo.city}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <Select
                                    onChange={(e) => statusChange(order.id, Number(e.target.value))}
                                    defaultValue={order.orderStatus.id}
                                    id="orderStatus"
                                >
                                    {statuses?.map((status) => (
                                        <Option key={status.id} value={status.id}>
                                            {status.name}
                                        </Option>
                                    ))}
                                </Select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
