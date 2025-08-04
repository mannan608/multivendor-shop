
import { apiSlice } from "../apiSlice/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (page = 1) => `/shop/products?page=${page}`,
            transformResponse: (response) => ({
                products: response.data,
                nextPageUrl: response.next_page_url,
                currentPage: response.current_page,
                lastPage: response.last_page,
            }),
        }),

    }),
});

export const { useGetProductsQuery } = productsApi;