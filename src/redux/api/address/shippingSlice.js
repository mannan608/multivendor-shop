import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isISD: true,
    selectedOptions: {},
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setIsISD: (state, action) => {
            state.isISD = action.payload;
        },
        setShippingOption: (state, action) => {
            const { shopId, option } = action.payload;
            state.selectedOptions[shopId] = option;
        },
    },
});

export const { setIsISD, setShippingOption } = shippingSlice.actions;
export default shippingSlice.reducer;