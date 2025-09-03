import { toastSuccess } from "@/app/utils/toastMessage";

export const syncCartAfterLogin = async (syncGuestCart) => {
    try {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

        if (guestCart.length > 0) {
            // Transform guestCart into API format
            const items = guestCart.map((product) => ({
                product_id: product?.product_id,
                product_variation_id: product?.product_variation_id || null,
                quantity: product?.quantity || 1,
                action: "increase",
            }));

            const cartApiData = { items };

            await syncGuestCart(cartApiData).unwrap();

            // Clear localStorage guestCart
            localStorage.removeItem("guestCart");

            toastSuccess("Your cart has been synced successfully!");
        }
    } catch (error) {
        console.error("Cart sync error:", error);
    }
};
