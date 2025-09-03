import { apiSlice } from "../../apiSlice/apiSlice";

export const addToCartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCartItems: builder.query({
            query: () => ({
                url: "/cart",
                method: "GET",
            }),
            providesTags: ["cartitems"]
        }),
        addCartItems: builder.mutation({
            query: (data) => ({
                url: "/cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["cartitems"]
        }),
        deleteCartItems: builder.mutation({
            query: (data) => ({
                url: "/cart",
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["cartitems"]
        }),
        syncGuestCart: builder.mutation({
            query: (data) => ({
                url: "/cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["cartitems"]
        }),
    }),
});

export const {
    useGetCartItemsQuery,
    useAddCartItemsMutation,
    useDeleteCartItemsMutation,
    useSyncGuestCartMutation,
} = addToCartApi;