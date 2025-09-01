import { apiSlice } from "../apiSlice/apiSlice";

export const couponApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        processCoupon: builder.mutation({
            query: (data) => ({
                url: "/shop-coupon-product-eligibility",
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['coupon'],
        }),
    }),
});

export const { useProcessCouponMutation } = couponApi