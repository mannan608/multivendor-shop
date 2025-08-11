import { apiSlice } from "../apiSlice/apiSlice";

// productsApi.js
export const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ page = 1, filters = {} }) => {
                const params = new URLSearchParams({ page });
                if (filters.category?.length) {
                    params.append("category_id", filters.category.join(","));
                }
                if (filters.brand?.length) {
                    params.append("brand_ids", filters.brand.join(","));
                }

                return `/shop/products?${params.toString()}`;
            },
            transformResponse: (response) => ({
                products: response.data,
                currentPage: response.current_page,
                lastPage: response.last_page,
                nextPageUrl: response.next_page_url,
            }),
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;
