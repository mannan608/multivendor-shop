import { toastSuccess, toastWarning } from '@/app/utils/toastMessage';
import { createSlice } from '@reduxjs/toolkit';

// Helper to get unique item ID
const getItemId = (item) => item?.product_variation_id || item?.product_id;

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem('guestCart');
        return cart ? JSON.parse(cart) : [];
    }
    return [];
};

const loadBuyNowItemFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const buyNowItem = localStorage.getItem('buyNowItem');
        return buyNowItem ? JSON.parse(buyNowItem) : null;
    }
    return null;
}

// Helper to load selected items from localStorage
const loadSelectedFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const selected = localStorage.getItem('selectedCartItems');
        return selected ? JSON.parse(selected) : [];
    }
    return [];
};

const initialState = {
    items: loadCartFromLocalStorage(),
    selectedItems: loadSelectedFromLocalStorage(),
    buyNowItem: loadBuyNowItemFromLocalStorage(),
    status: 'idle',
};

const addToCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToGuestCart: (state, action) => {
            const { product } = action.payload;
            const existingItem = state?.items?.find((item) => {
                if (product?.is_variant) {
                    return (
                        item?.product_id === product?.product_id && item?.product_variation_id === product?.product_variation_id
                    );
                }
                return (
                    item?.product_id === product?.product_id
                );
            });

            if (existingItem) {
                const newQuantity = existingItem.quantity + product?.quantity;
                if (newQuantity > existingItem.current_stock) {
                    toastWarning(
                        `Only ${existingItem.current_stock} items are available. You already have ${existingItem.quantity} in your cart.`
                    );
                    return;
                }
                existingItem.quantity = newQuantity;
                toastSuccess("Product quantity updated in cart");
            } else {
                state.items.push({
                    product_id: product?.product_id,
                    product_variation_id: product?.product_variation_id || null,
                    shop_id: product?.shop_id,
                    shop_name: product?.shop_name,
                    quantity: product?.quantity,
                    name: product?.name,
                    slug: product?.slug,
                    thumbnail: product?.thumbnail,
                    current_stock: product?.current_stock,
                    regular_price: product?.regular_price,
                    discount_price: product?.discount_price,
                    id_delivery_fee: product?.id_delivery_fee,
                    od_delivery_fee: product?.od_delivery_fee,
                    ed_delivery_fee: product?.ed_delivery_fee,
                    variation: product?.variation,
                    badges: product?.badges || [],
                    badgeProductVariationsExclude: product?.badgeProductVariationsExclude || []
                });
                toastSuccess('Product added to cart');
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("guestCart", JSON.stringify(state.items));
            }
        },

        removeFromGuestCart: (state, action) => {
            const itemIdToRemove = getItemId(action.payload);
            state.items = state.items.filter(
                item => getItemId(item) !== itemIdToRemove
            );
            // Clean up selection if removed
            state.selectedItems = state.selectedItems.filter(id => id !== itemIdToRemove);
            if (typeof window !== 'undefined') {
                localStorage.setItem('guestCart', JSON.stringify(state.items));
                localStorage.setItem('selectedCartItems', JSON.stringify(state.selectedItems));
            }
            toastSuccess('Product removed from cart');
        },
        updateGuestCartItemQuantity: (state, action) => {
            const { product_id, product_variation_id, quantity } = action.payload;
            const item = state.items.find(
                item => item.product_id === product_id &&
                    item.product_variation_id === product_variation_id
            );
            if (item) {
                item.quantity = quantity;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('guestCart', JSON.stringify(state.items));
                }
            }
        },
        clearGuestCart: (state) => {
            state.items = [];
            state.selectedItems = []; // Clear selections
            if (typeof window !== 'undefined') {
                localStorage.removeItem('guestCart');
                localStorage.removeItem('selectedCartItems');
            }
        },
        syncGuestCartToServer: (state) => {
            state.items = [];
            state.selectedItems = []; // Clear selections
            if (typeof window !== 'undefined') {
                localStorage.removeItem('guestCart');
                localStorage.removeItem('selectedCartItems');
            }
        },
        // New reducers for selections
        toggleItemSelection: (state, action) => {
            const itemId = action.payload;
            if (state.selectedItems.includes(itemId)) {
                state.selectedItems = state.selectedItems.filter(id => id !== itemId);
            } else {
                state.selectedItems.push(itemId);
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('selectedCartItems', JSON.stringify(state.selectedItems));
            }
        },
        toggleShopSelection: (state, action) => {
            const { shopId, selectAll } = action.payload;
            const shopItems = state.items.filter(item => item.shop_id === shopId);
            const shopItemIds = shopItems.map(getItemId);
            if (selectAll) {
                // Add all shop items if not already selected
                state.selectedItems = [...new Set([...state.selectedItems, ...shopItemIds])];
            } else {
                // Remove all shop items
                state.selectedItems = state.selectedItems.filter(id => !shopItemIds.includes(id));
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('selectedCartItems', JSON.stringify(state.selectedItems));
            }
        },
        toggleAllSelection: (state, action) => {
            const selectAll = action.payload;
            if (selectAll) {
                // Select all items across all shops
                state.selectedItems = state.items.map(getItemId);
            } else {
                // Deselect all
                state.selectedItems = [];
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('selectedCartItems', JSON.stringify(state.selectedItems));
            }
        },
        setBuyNowItem: (state, action) => {
            state.buyNowItem = action.payload; // single product object
            if (typeof window !== "undefined") {
                localStorage.setItem("buyNowItem", JSON.stringify(state.buyNowItem));
            }
        },
        clearBuyNowItem: (state) => {
            state.buyNowItem = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("buyNowItem");
            }
        },
    },
});

export const {
    addToGuestCart,
    removeFromGuestCart,
    updateGuestCartItemQuantity,
    clearGuestCart,
    syncGuestCartToServer,
    toggleItemSelection,
    toggleShopSelection,
    toggleAllSelection,
    setBuyNowItem,
    clearBuyNowItem,
} = addToCartSlice.actions;

export default addToCartSlice.reducer;