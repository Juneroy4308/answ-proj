import { createApi } from "@reduxjs/toolkit/query/react";
import { ICreateOrder, IOrder, IOrderStatus } from "interfaces/order/orders.ts";
import { createBaseQuery } from "utils/baseQuery";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: createBaseQuery("order"),
    tagTypes: ["Orders", "OrderStauses"],

    endpoints: (builder) => ({
        getOrders: builder.query<IOrder[], void>({
            query: () => "getAll",
            providesTags: ["Orders"],
        }),

        getUserOrders: builder.query<IOrder[], void>({
            query: () => "getUserOrders",
            providesTags: ["Orders"],
        }),

        getOrderStauses: builder.query<IOrderStatus[], void>({
            query: () => "getOrderStatuses",
            providesTags: ["OrderStauses"],
        }),

        createOrder: builder.mutation<void, ICreateOrder>({
            query: (order) => ({
                url: "AddOrder",
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["Orders"],
        }),

        updateOrderStatus: builder.mutation<void, { orderId: number; orderStatusId: number }>({
            query: ({ orderId, orderStatusId }) => ({
                url: `UpdateOrderStatus/${orderId}`,
                method: "PATCH",
                body: { orderStatusId, id: orderId },
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderStausesQuery,
    useUpdateOrderStatusMutation,
    useGetUserOrdersQuery,
} = orderApi;
