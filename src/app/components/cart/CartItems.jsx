"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    toggleItemSelection,
    toggleShopSelection,
    removeFromGuestCart,
} from "@/redux/api/carts/addtocart/addToCartSlice";
import CheckMark from "@/app/components/icons/CheckMark";
import Quantity from "@/app/components/ui/Quantity";

const getItemId = (item) => item?.product_variation_id || item?.product_id;

const CartItems = ({ groupedItems, selectedItems }) => {
    const dispatch = useDispatch();

    return (
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
                        {/* Shop Header */}
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

                        {/* Shop Products */}
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
                                        {/* Checkbox */}
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

                                        {/* Product Thumbnail */}
                                        <div className="flex-shrink-0 w-[64px] h-[64px] md:w-[100px] md:h-[100px]">
                                            <Image
                                                src={item?.thumbnail || "/images/placeholder.png"}
                                                alt={item?.name || "Product"}
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-grow">
                                            <div className="flex gap-4 justify-between">
                                                <div className="product-info flex-grow w-full">
                                                    <h5 className="font-semibold line-clamp-1">{item?.name}</h5>
                                                    <p className="text-sm text-gray-600">{item?.variation}</p>
                                                    <p className="text-xs text-gray-500">SKU: {item?.sku || "N/A"}</p>
                                                </div>
                                                <h5 className="product-price hidden md:block font-semibold text-xl flex-shrink-0 w-fit">
                                                    ৳{Math.ceil(item?.discount_price || 0)}{" "}
                                                    <del className="text-neutral-400 ml-1">
                                                        ৳{Math.ceil(item?.regular_price || 0)}
                                                    </del>
                                                </h5>
                                            </div>

                                            <div className="flex gap-4 mt-3 justify-between md:justify-start md:gap-4">
                                                <h5 className="md:hidden font-semibold flex flex-col-reverse text-base">
                                                    ৳{Math.ceil(item?.discount_price || 0)}{" "}
                                                    <del className="text-gray-400 text-xs">
                                                        ৳{Math.ceil(item?.regular_price || 0)}
                                                    </del>
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
    );
};

export default CartItems;
