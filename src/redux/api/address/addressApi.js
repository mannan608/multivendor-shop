import { apiSlice } from "../apiSlice/apiSlice"

export const addressApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //get addresses,add address,update address

        getAddresses: builder.query({
            query: () => `/addresses`,
            transformResponse: (response) => response.data,
        }),
        addAddress: builder.mutation({
            query: (data) => ({
                url: "/addresses",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["addresses"],
        }),
        updateAddress: builder.mutation({
            query: (data) => ({
                url: `/addresses/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["addresses"],
        }),

    }),
})

export const {
    useGetAddressesQuery,
    useAddAddressMutation,
    useUpdateAddressMutation
} = addressApi