"use client";

import { useDispatch } from "react-redux";
import { useProcessCouponMutation } from "@/redux/api/coupon/couponApi";
import { clearCoupon, setCoupon } from "@/redux/api/coupon/couponSlice";

export function useCoupon() {
    const dispatch = useDispatch();
    const [processCoupon, { isLoading, error }] = useProcessCouponMutation();
    const applyCoupon = async (orderData) => {
        try {
            const res = await processCoupon(orderData).unwrap();

            if (res.success) {
                dispatch(
                    setCoupon({
                        coupon: orderData.coupon_code,
                        discount: res.discount,
                        message: res.message,
                    })
                );
                return { success: true, discount: res.discount, message: res.message };
            } else {
                dispatch(clearCoupon());
                return { success: false, discount: 0, message: res.message };
            }
        } catch (err) {
            console.error("Coupon apply failed:", err);
            dispatch(clearCoupon());
            return { success: false, discount: 0, message: "Coupon apply failed" };
        }
    };

    const removeCoupon = () => {
        dispatch(clearCoupon());
    };

    return { applyCoupon, removeCoupon, isLoading, error };
}
