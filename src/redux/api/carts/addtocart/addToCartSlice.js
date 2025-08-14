import { toastSuccess } from '@/app/utils/toastMessage';
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem('guestCart');
        return cart ? JSON.parse(cart) : [];
    }
    return [];
};

const initialState = {
    items: loadCartFromLocalStorage(),
    status: 'idle',
};

const addToCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToGuestCart: (state, action) => {
            const { product } = action.payload;
            const existingItem = state?.items?.find(
                item => item?.product_id === product?.id &&
                    item?.product_variation_id === product?.product_variation_id
            );

            if (existingItem) {
                existingItem.quantity += product?.quantity;

            } else {
                state.items.push({
                    product_id: product?.id,
                    product_variation_id: product?.product_variation_id || null,
                    shop_id: product?.shop_id,
                    shop_name: product?.shop_name,
                    quantity: product?.quantity,
                    name: product?.name,
                    slug: product?.slug,
                    thumbnail: product?.thumbnail,
                    current_stock: product?.current_stock,
                    // max_cart_quantity: product?.max_cart_quantity,
                    regular_price: product?.regular_price,
                    discount_price: product?.discount_price,
                    id_delivery_fee: product?.id_delivery_fee,
                    od_delivery_fee: product?.od_delivery_fee,
                    ed_delivery_fee: product?.ed_delivery_fee,
                    variation: product?.variation,
                    badges: product?.badges || [],
                    badgeProductVariationsExclude: product?.badgeProductVariationsExclude || []
                });
            }

            if (typeof window !== 'undefined') {
                localStorage.setItem('guestCart', JSON.stringify(state.items));
            }
        },
        removeFromGuestCart: (state, action) => {
            state.items = state.items.filter(
                item => !(item.product_id === action.payload.product_id &&
                    item.product_variation_id === action.payload.product_variation_id)
            );
            if (typeof window !== 'undefined') {
                localStorage.setItem('guestCart', JSON.stringify(state.items));
            }
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
            if (typeof window !== 'undefined') {
                localStorage.removeItem('guestCart');
            }
        },
        syncGuestCartToServer: (state) => {
            state.items = [];
            if (typeof window !== 'undefined') {
                localStorage.removeItem('guestCart');
            }
        }
    },
});

export const {
    addToGuestCart,
    removeFromGuestCart,
    updateGuestCartItemQuantity,
    clearGuestCart,
    syncGuestCartToServer
} = addToCartSlice.actions;

export default addToCartSlice.reducer;