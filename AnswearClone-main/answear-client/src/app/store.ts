import { configureStore } from "@reduxjs/toolkit";
import userReducer from "app/userSlice.ts";
import { basketApi } from "services/basket.ts";
import { categoryApi } from "services/category.ts";
import { discountApi } from "services/discount.ts";
import { filterApi } from "services/filter.ts";
import { orderApi } from "services/order.ts";
import { productApi } from "services/product.ts";
import { targetGroupApi } from "services/targetGroup.ts";
import { userApi } from "services/user.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [targetGroupApi.reducerPath]: targetGroupApi.reducer,
        [discountApi.reducerPath]: discountApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [filterApi.reducerPath]: filterApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [basketApi.reducerPath]: basketApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoryApi.middleware,
            productApi.middleware,
            targetGroupApi.middleware,
            discountApi.middleware,
            filterApi.middleware,
            userApi.middleware,
            basketApi.middleware,
            orderApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
