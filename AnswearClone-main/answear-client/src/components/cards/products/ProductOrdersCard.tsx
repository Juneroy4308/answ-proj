import { IOrder } from "interfaces/order/orders.ts";

import React from "react";

const ProductOrdersCard: React.FC<IOrder> = (props) => {
    const { orderStatus, orderItems } = props;

    return (
        <div className="flex flex-col gap-6 p-5 border rounded-lg bg-gray-100 shadow-md">
            {/* Заголовок */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Замовлення #{props.id}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(orderStatus.name)}`}>
                    {orderStatus.name}
                </span>
            </div>

            <div>
                <h4 className="font-semibold text-black mb-2">Список товарів:</h4>
                {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                        <div>
                            <p className="font-bold text-gray-800">
                                {item.productVariation.shortDescription}{" "}
                                <a
                                    target="_blank"
                                    href={`/ua/product/${item.productVariation.slug}`}
                                    className="text-blue-600 text-[12px] underline"
                                >
                                    Переглянути
                                </a>
                            </p>

                            <p className="text-sm text-gray-600">Ціна за шт:</p>
                        </div>
                        <div className="text-right">
                            <p>{item.count} шт</p>
                            <p className="font-semibold text-gray-700">{item.productVariation.price} грн</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-4">
                <p className="font-semibold text-black text-lg">Загальна сума:</p>
                <p className="text-red-600 font-bold text-lg">
                    {orderItems?.reduce((sum, item) => sum + item.count * item.productVariation.price, 0)} грн
                </p>
            </div>
        </div>
    );
};

const getStatusStyle = (status: string) => {
    switch (status) {
        case "В обробці":
            return "bg-yellow-300 text-yellow-800";
        case "Завершено":
            return "bg-green-300 text-green-800";
        case "Скасовано":
            return "bg-red-300 text-red-800";
        default:
            return "bg-gray-300 text-gray-800";
    }
};

export default ProductOrdersCard;
