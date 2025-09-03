"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
// import CartItems from "@/app/components/cart/CartItems";
import CheckMark from "@/app/components/icons/CheckMark";
// import Quantity from "@/app/components/ui/Quantity";
import { groupByShop } from "@/app/utils/groupByShop";
import { toastWarning } from "@/app/utils/toastMessage";
import { useCoupon } from "@/hooks/useCoupon";
import { useGetCartItemsQuery } from "@/redux/api/carts/addtocart/addToCartApi";
import {
  toggleAllSelection,
  removeFromGuestCart,
} from "@/redux/api/carts/addtocart/addToCartSlice";
import ShopItems from "@/app/components/cart/ShopItems";
import { useHydration } from "@/hooks/useHydration";
import { formatProductData } from "@/app/utils/formatProductData";


const getItemId = (item) => item?.product_variation_id || item?.product_id;

const CartPage = () => {
  const dispatch = useDispatch();
  const { coupon, discount, message } = useSelector((state) => state.coupon);
  const { applyCoupon, removeCoupon } = useCoupon();
  const [couponCode, setCouponCode] = useState("");
  const { items: guestCart = [], selectedItems = [] } = useSelector(
    (state) => state.cart || {}
  );
  const { isAuthenticated } = useSelector((state) => state.auth || {});

  const {
    data,
    isLoading,
    isFetching,
  } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });
  const apiCartItems = data?.data ? formatProductData(data.data) : [];

  const cartItems = Array.isArray(isAuthenticated && apiCartItems ? apiCartItems : guestCart)
    ? (isAuthenticated && apiCartItems ? apiCartItems : guestCart)
    : [];

  const groupedItems = groupByShop(cartItems);

  const allItemIds = cartItems.map(getItemId);
  const allSelected =
    allItemIds.length > 0 && allItemIds.every((id) => selectedItems.includes(id));
  const someSelected = allItemIds.some((id) => selectedItems.includes(id));
  const isAllIndeterminate = someSelected && !allSelected;

  const selectAllRef = useRef(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isAllIndeterminate;
    }
  }, [isAllIndeterminate]);

  const handleSelectAll = (e) => {
    dispatch(toggleAllSelection(e.target.checked));
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach((itemId) => {
      const item = cartItems.find((i) => getItemId(i) === itemId);
      if (item) {
        dispatch(
          removeFromGuestCart({
            product_id: item.product_id,
            product_variation_id: item.product_variation_id,
          })
        );
      }
    });
  };

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(getItemId(item))
  );

  const totalItems = selectedCartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const totalPrice = selectedCartItems.reduce(
    (sum, item) => sum + (item.discount_price || 0) * (item.quantity || 1),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toastWarning("Please login to apply coupon code.");
      return;
    }

    if (!couponCode.trim()) return;

    const productIds = selectedCartItems.map((item) => item.product_id);
    const productSku = selectedCartItems.map((item) => item.sku);
    const productQty = selectedCartItems.map((item) => item.quantity);
    const orderData = {
      coupon_code: couponCode,
      product_id: productIds,
      sku: productSku,
      quantity: productQty,
    };

    await applyCoupon(orderData);
  };
  const mounted = useHydration();

  if (!mounted) return null;

  console.log("cartItems", cartItems);

  return (
    <div className="container-fluid mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
      {/* Left Section */}
      <div className="lg:col-span-2 bg-white p-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">My Cart ({cartItems.length})</h2>
        {groupedItems.length > 0 && (
          <div className="flex justify-between items-center border-b border-neutral-300 pb-3 mb-4 text-sm sm:text-base px-3">
            <div className="flex gap-2">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={selectAllRef}
                  onChange={handleSelectAll}
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-neutral-300 checked:bg-[#00b795] checked:border-[#00b795]"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <CheckMark />
                </span>
              </label>
              <span>Select All</span>
            </div>
            {selectedItems.length > 0 && (
              <button
                className="text-gray-500 hover:underline"
                onClick={handleDeleteSelected}
              >
                Delete
              </button>
            )}
          </div>
        )}

        {/* Cart Items */}
        {isLoading || isFetching ? (
          <div>Loading cart...</div>
        ) : groupedItems.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <div className="cart-items">
            {groupedItems?.map((shop) => (
              <ShopItems
                key={shop.shop_id}
                shop={shop}
                selectedItems={selectedItems}
                dispatch={dispatch}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="rounded-lg h-fit bg-white p-4">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>Price ({totalItems} items)</span>
          <span>৳{Math.ceil(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Shipping fee</span>
          <span className="text-blue-500">To be added</span>
        </div>
        <div className="mb-4">
          {!coupon ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Store / Packly coupon"
                className="border rounded px-3 py-2 flex-1 text-sm"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-500 text-white px-4 rounded disabled:opacity-50"
              >
                {isLoading ? "Applying..." : "Apply"}
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded p-2">
              <p className="text-sm text-green-700">
                {message} ✅ (Saved {discount})
              </p>
              <button
                onClick={removeCoupon}
                className="text-red-500 text-xs font-medium"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between font-semibold mb-4">
          <span>Sub Total</span>
          <span>৳{Math.ceil(totalPrice)}</span>
        </div>
        <button
          className="w-full bg-green-500 text-white py-2 rounded mb-4"
          disabled={selectedItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
