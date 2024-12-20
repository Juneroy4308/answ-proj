import { createApi } from "@reduxjs/toolkit/query/react";
import { IForgotPassword, ILogin, IResetEmail, IResetPassword, ISignInResponse, IUser } from "interfaces/user";
import { createBaseQuery } from "utils/baseQuery.ts";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: createBaseQuery("user"),
    tagTypes: ["Users"],

    endpoints: (builder) => ({
        signIn: builder.mutation<ISignInResponse, ILogin>({
            query: (credentials) => ({
                url: "SignIn",
                method: "POST",
                body: credentials,
            }),
        }),
        googleSignIn: builder.mutation<ISignInResponse, { credential: string }>({
            query: (data) => {
                const formData = new FormData();
                formData.append("credential", data.credential);

                return {
                    url: "GoogleSignIn",
                    method: "POST",
                    body: formData,
                };
            },
        }),
        signUp: builder.mutation<ISignInResponse, ILogin>({
            query: (credentials) => ({
                url: "SignUp",
                method: "POST",
                body: credentials,
            }),
        }),
        getUsers: builder.query<IUser[], void>({
            query: () => "getAll",
            providesTags: ["Users"],
        }),

        lockUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `BlockUser/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Users"],
        }),

        unlockUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `UnlockUser/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Users"],
        }),

        resetPassword: builder.mutation<void, IResetPassword>({
            query: (credentials) => ({
                url: "ResetPassword",
                method: "POST",
                body: credentials,
            }),
        }),
        forgotPassword: builder.mutation<void, IForgotPassword>({
            query: (credentials) => ({
                url: "ForgotPassword",
                method: "POST",
                body: credentials,
            }),
        }),
        resetEmail: builder.mutation<void, IResetEmail>({
            query: (credentials) => ({
                url: "ChangeEmail",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useSignUpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useLockUserMutation,
    useSignInMutation,
    useUnlockUserMutation,
    useGoogleSignInMutation,
    useResetEmailMutation,
} = userApi;
