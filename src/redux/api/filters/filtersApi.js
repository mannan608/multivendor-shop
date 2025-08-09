

import { apiSlice } from "../apiSlice/apiSlice";

export const filtersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `/categories`,
            transformResponse: (response) => response.data,
        }),
        getBrands: builder.query({
            query: () => `/brands`,
            transformResponse: (response) => response.data,
        }),

    }),
});

export const { useGetCategoriesQuery, useGetBrandsQuery } = filtersApi;