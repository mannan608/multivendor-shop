import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice/apiSlice';
import addToCartReducer from '../api/carts/addtocart/addToCartSlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: addToCartReducer,

    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});
