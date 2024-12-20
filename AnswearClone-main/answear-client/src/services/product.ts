import { createApi } from "@reduxjs/toolkit/query/react";
import { IPagedProduct, IProduct, IProductCreate, IProductFilters } from "interfaces/product";
import { createBaseQuery } from "utils/baseQuery.ts";
import { buildQueryParams } from "utils/buildQueryParams.ts";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: createBaseQuery("product"),
    tagTypes: ["Products", "Favorites"],

    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => "getAll",
            providesTags: ["Products"],
        }),

        getSimilarProducts: builder.query<IProduct[], { id: number; count?: number }>({
            query: ({ id, count = 4 }) => `getSimilarProducts/${id}/similar?count=${count}`,
            providesTags: ["Products"],
        }),

        getFavoritProducts: builder.query<IProduct[], void>({
            query: () => "getFavoritProducts",
            providesTags: ["Favorites"],
        }),

        setFavoritProducts: builder.mutation<void, number>({
            query: (id) => ({
                url: `setFavoritProduct/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Favorites"],
        }),

        deleteFavoritProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `removeFavoritProduct/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Favorites"],
        }),

        getPagedProducts: builder.query<IPagedProduct, IProductFilters>({
            query: (filters) => {
                const queryParams = buildQueryParams(filters);
                return `getPage?${queryParams}`;
            },
            providesTags: ["Products"],
        }),

        getProductById: builder.query<IProduct, number>({
            query: (id) => `getById/${id}`,
            providesTags: (_result, _error, arg) => [{ type: "Products", id: arg }],
        }),

        getProductBySlug: builder.query<IProduct, string>({
            query: (slug) => `getBySlug/${slug}`,
            providesTags: (_result, _error, arg) => [{ type: "Products", id: arg }],
        }),

        createProduct: builder.mutation<void, IProductCreate>({
            query: (product) => {
                const formData = new FormData();

                formData.append("name", product.name);
                formData.append("description", product.description);
                formData.append("categoryId", product.categoryId.toString());

                product.variations?.forEach((variation, index) => {
                    formData.append(`variations[${index}].shortDescription`, variation.shortDescription);
                    formData.append(`variations[${index}].price`, variation.price.toString());

                    if (variation.discountValueId) {
                        formData.append(`variations[${index}].discountValueId`, variation.discountValueId.toString());
                    }

                    if (variation.photos?.length) {
                        Array.from(variation.photos).forEach((photo) => formData.append(`variations[${index}].photos`, photo));
                    }

                    if (variation.filters) {
                        Array.from(variation.filters).forEach((filter) =>
                            formData.append(`variations[${index}].filters`, filter.toString()),
                        );
                    }
                });

                return {
                    url: "create",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Products"],
        }),

        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetPagedProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useDeleteFavoritProductMutation,
    useGetProductByIdQuery,
    useGetSimilarProductsQuery,
    useGetFavoritProductsQuery,
    useSetFavoritProductsMutation,
    useGetProductBySlugQuery,
} = productApi;
