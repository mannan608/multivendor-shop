import { createSlice } from "@reduxjs/toolkit";

// ✅ Load from localStorage if available
const savedCoupon =
    typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("coupon"))
        : null;

const initialState = savedCoupon || {
    coupon: null,   // coupon code string
    discount: 0,    // discount amount
    message: "",    // success or error message
};

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        setCoupon: (state, action) => {
            state.coupon = action.payload.coupon;
            state.discount = action.payload.discount;
            state.message = action.payload.message;

            // ✅ persist in localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("coupon", JSON.stringify(state));
            }
        },
        clearCoupon: (state) => {
            state.coupon = null;
            state.discount = 0;
            state.message = "";

            // ✅ remove from localStorage
            if (typeof window !== "undefined") {
                localStorage.removeItem("coupon");
            }
        },
    },
});

export const { setCoupon, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
