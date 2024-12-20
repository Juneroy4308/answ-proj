import { createApi } from "@reduxjs/toolkit/query/react";
import { BasketCreateItem, BasketItem } from "interfaces/basket";
import { createBaseQuery } from "utils/baseQuery";

export const basketApi = createApi({
    reducerPath: "basketApi",
    baseQuery: createBaseQuery("basket"),
    tagTypes: ["Baskets"],

    endpoints: (builder) => ({
        getBasketItems: builder.query<BasketItem[], void>({
            query: () => "getBasketItems",
            providesTags: ["Baskets"],
        }),

        addToBasket: builder.mutation<void, BasketCreateItem>({
            query: (basketItem) => ({
                url: "addToBasket",
                method: "POST",
                body: basketItem,
            }),
            invalidatesTags: ["Baskets"],
        }),

        removeFromBasket: builder.mutation<void, number>({
            query: (productVariationId) => ({
                url: `RemoveFromBasket/${productVariationId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Baskets"],
        }),

        clearBasket: builder.mutation<void, void>({
            query: () => ({
                url: "clearBasket",
                method: "DELETE",
            }),
            invalidatesTags: ["Baskets"],
        }),

        decrementItemQuantity: builder.mutation<void, number>({
            query: (productVariationId) => ({
                url: `decrementItemQuantity/${productVariationId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Baskets"],
        }),
    }),
});

export const {
    useGetBasketItemsQuery,
    useAddToBasketMutation,
    useRemoveFromBasketMutation,
    useClearBasketMutation,
    useDecrementItemQuantityMutation,
} = basketApi;
