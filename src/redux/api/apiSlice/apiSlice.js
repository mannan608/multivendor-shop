import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        // Get token from Redux state
        const token = getState().auth.accessToken;

        // If we have a token, include it in headers
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        // Set content type
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        return headers;
    },
});

// Base query with re-authentication logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // If we get a 401, try to refresh or redirect to login
    if (result.error && result.error.status === 401) {
        // Clear auth state and redirect to login
        api.dispatch({ type: 'auth/userLoggedOut' });
        localStorage.removeItem('auth');
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Profile', 'cartitems', 'addresses'],
    endpoints: () => ({}),
});
