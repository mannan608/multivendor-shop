"use client";

import CartItems from "@/app/components/cart/CartItems";
import CheckMark from "@/app/components/icons/CheckMark";
import Quantity from "@/app/components/ui/Quantity";
import { groupByShop } from "@/app/utils/groupByShop";
import { toastWarning } from "@/app/utils/toastMessage";
import { useCoupon } from "@/hooks/useCoupon";
import { useGetCartItemsQuery } from "@/redux/api/carts/addtocart/addToCartApi";
import {
  toggleItemSelection,
  toggleShopSelection,
  toggleAllSelection,
  removeFromGuestCart,
} from "@/redux/api/carts/addtocart/addToCartSlice";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const getItemId = (item) => item?.product_variation_id || item?.product_id;

const CartPage = () => {
  const dispatch = useDispatch();
  const { coupon, discount, message } = useSelector((state) => state.coupon);
  const { applyCoupon, removeCoupon, isLoading: applyCouponLoading } = useCoupon();
  const [couponCode, setCouponCode] = useState("");
  const { items: guestCart = [], selectedItems = [] } = useSelector(
    (state) => state.cart || {}
  );
  const { accessToken } = useSelector((state) => state.auth || {});
  const {
    data: apiCartItems,
    isLoading,
    isFetching,
  } = useGetCartItemsQuery(undefined, {
    skip: !accessToken,
  });


  const cartItems = accessToken && apiCartItems ? apiCartItems : guestCart;
  const groupedItems = groupByShop(cartItems || []);

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

    if (!accessToken) {
      toastWarning("Please login to apply coupon code.");
      return;
    }

    if (!couponCode.trim()) return;

    const orderData = {
      coupon_code: couponCode,
      product_id: cartItems.map((p) => p.id),
      sku: cartItems.map((p) => p.sku),
      quantity: cartItems.map((p) => p.qty),
    };

    await applyCoupon(orderData);
  };

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
            {groupedItems?.map((shop) => {
              const shopItemIds = shop.products.map(getItemId);
              const shopAllSelected = shopItemIds.every((id) => selectedItems.includes(id));
              const shopSomeSelected = shopItemIds.some((id) => selectedItems.includes(id));
              const isShopIndeterminate = shopSomeSelected && !shopAllSelected;

              const shopRef = useRef(null);

              useEffect(() => {
                if (shopRef.current) {
                  shopRef.current.indeterminate = isShopIndeterminate;
                }
              }, [isShopIndeterminate]);

              const handleShopChange = (e) => {
                dispatch(
                  toggleShopSelection({
                    shopId: shop.shop_id,
                    selectAll: e.target.checked,
                  })
                );
              };

              return (
                <div className="shop-items" key={shop?.shop_id}>
                  <div className="flex shop-name px-3 py-2 bg-neutral-100 gap-2">
                    <label className="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        checked={shopAllSelected}
                        ref={shopRef}
                        onChange={handleShopChange}
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-neutral-300 checked:bg-[#00b795] checked:border-[#00b795]"
                      />
                      <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <CheckMark />
                      </span>
                    </label>
                    {shop?.shop_name}
                  </div>
                  <div className="items">
                    {shop?.products?.map((item) => {
                      const itemId = getItemId(item);
                      const handleItemChange = () => {
                        dispatch(toggleItemSelection(itemId));
                      };

                      return (
                        <div
                          className="item flex gap-4 items-start border-b last:border-b-0 border-neutral-200 py-4 pl-3"
                          key={itemId}
                        >
                          <label className="flex items-center cursor-pointer relative">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(itemId)}
                              onChange={handleItemChange}
                              className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded border border-neutral-300 checked:bg-[#00b795] checked:border-[#00b795]"
                            />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                              <CheckMark />
                            </span>
                          </label>
                          <div className="flex-shrink-0 w-[64px] h-[64px] md:w-[100px] md:h-[100px]">
                            <Image
                              src={item?.thumbnail || "/images/placeholder.png"}
                              alt={item?.name || "Product"}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex gap-4 justify-between">
                              <div className="product-info flex-grow w-full">
                                <h5 className="font-semibold line-clamp-1">{item?.name}</h5>
                                <p className="text-sm text-gray-600">{item?.variation}</p>
                                <p className="text-xs text-gray-500">SKU: {item?.sku || "N/A"}</p>
                              </div>
                              <h5 className="product-price hidden md:block font-semibold text-xl flex-shrink-0 w-fit">
                                ৳{Math.ceil(item?.discount_price || 0)}{" "}
                                <del className="text-neutral-400 ml-1">৳{Math.ceil(item?.regular_price || 0)}</del>
                              </h5>
                            </div>
                            <div className="flex gap-4 mt-3 justify-between md:justify-start md:gap-4">
                              <h5 className="md:hidden font-semibold flex flex-col-reverse text-base">
                                ৳{Math.ceil(item?.discount_price || 0)}{" "}
                                <del className="text-gray-400 text-xs">৳{Math.ceil(item?.regular_price || 0)}</del>
                              </h5>
                              <Quantity
                                productId={item.product_id}
                                productVariationId={item.product_variation_id}
                                initialQuantity={item.quantity}
                                stock={item.current_stock}
                                isStandalone={false}
                                buyNowQty={false}
                              />
                              {(selectedItems.includes(itemId) || shopAllSelected) && (
                                <button
                                  className="text-red-500 hover:underline text-sm"
                                  onClick={() =>
                                    dispatch(
                                      removeFromGuestCart({
                                        product_id: item.product_id,
                                        product_variation_id: item.product_variation_id,
                                      })
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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