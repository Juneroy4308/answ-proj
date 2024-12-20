import { createApi } from "@reduxjs/toolkit/query/react";
import { ICategory, ICategoryFilters, ICreateCategory, IPagedCategory, IUpdateCategory } from "interfaces/category";
import { createBaseQuery } from "utils/baseQuery.ts";
import { buildQueryParams } from "utils/buildQueryParams.ts";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: createBaseQuery("category"),
    tagTypes: ["Categories"],

    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => "getAll",
            providesTags: ["Categories"],
        }),

        getPagedCategories: builder.query<IPagedCategory, ICategoryFilters>({
            query: (filters) => {
                const queryParams = buildQueryParams(filters);
                return `getPage?${queryParams}`;
            },
            providesTags: ["Categories"],
        }),

        getCategoryById: builder.query<ICategory, number>({
            query: (id) => `getById/${id}`,
            providesTags: (_result, _error, arg) => [{ type: "Categories", id: arg }],
        }),

        getCategoryBySlug: builder.query<ICategory, string>({
            query: (slug) => `getBySlug/${slug}`,
            providesTags: (_result, _error, arg) => [{ type: "Categories", id: arg }],
        }),

        createCategory: builder.mutation<void, ICreateCategory>({
            query: (category) => ({
                url: "create",
                method: "POST",
                body: category,
            }),
            invalidatesTags: ["Categories"],
        }),

        updateCategory: builder.mutation<void, IUpdateCategory>({
            query: (category) => ({
                url: "update",
                method: "PUT",
                body: category,
            }),
            invalidatesTags: ["Categories"],
        }),

        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetPagedCategoriesQuery,
    useUpdateCategoryMutation,
    useGetCategoryByIdQuery,
    useGetCategoryBySlugQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
