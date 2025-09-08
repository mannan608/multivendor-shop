import { toastSuccess } from "./toastMessage";

export const syncCartAfterLogin = async (
    syncGuestCart,
    refetchCart,
    guestCartItems = [],
    selectedCartItems = []
) => {
    try {
        const items = guestCartItems.map((product) => {
            const key = product.product_variation_id ?? product.product_id;
            const isSelected = selectedCartItems.includes(key);

            return {
                product_id: product?.product_id,
                product_variation_id: product?.product_variation_id || null,
                quantity: product?.quantity || 1,
                action: "increase",
                is_select: isSelected,
            };
        });

        if (items.length > 0) {
            await syncGuestCart({ items }).unwrap();
            localStorage.removeItem("guestCart");
        }
        await refetchCart();

        toastSuccess("Your cart has been synced successfully!");
        localStorage.removeItem("selectedCartItems");
    } catch (error) {
        console.error("Cart sync error:", error);
    }
};