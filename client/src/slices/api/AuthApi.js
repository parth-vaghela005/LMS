import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../AuthSlice.js";

// Use environment variables for API URL
const USER_API = "http://localhost:5000/api/v1/auth/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include", // Ensures cookies are sent with requests
      
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "registration",
                method: "POST",
                body: inputData,
            }),
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.error("Login failed: ", error);
                    alert("Login failed. Please check your credentials.");
                }
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try { 
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.error("Failed to load user: ", error);
                    alert("An error occurred while loading your data.");
                }
            },
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "profile/update",
                method: "PUT",
                body: formData, // Make sure to send FormData for file uploads
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
    useLogoutUserMutation
} = authApi;
