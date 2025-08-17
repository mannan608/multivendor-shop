import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice/apiSlice';
import addToCartReducer from '../api/carts/addtocart/addToCartSlice';
import authReducer from '../api/auth/authSlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: addToCartReducer,
        auth: authReducer

    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});
