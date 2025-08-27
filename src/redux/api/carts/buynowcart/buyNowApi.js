

export const buyNowApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCartItems: builder.query({
            query: () => ({
                url: "/cart",
                method: "GET",
            }),
            providesTags: ["cartitems"]
        }),
        
    }),
});