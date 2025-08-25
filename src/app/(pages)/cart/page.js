"use client";

import CheckMark from "@/app/components/icons/CheckMark";
import Quantity from "@/app/components/ui/Quantity";
import { groupByShop } from "@/app/utils/groupByShop";
import { useGetCartItemsQuery } from "@/redux/api/carts/addtocart/addToCartApi";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";


const CartPage = () => {
  const guestCart = useSelector(state => state.cart?.items);

  console.log("guestCart", guestCart);


  const { accessToken } = useSelector(state => state.auth);
  const { data: apiCartItems, isLoading, isFetching } = useGetCartItemsQuery(undefined, {
    skip: !accessToken,
  });
  const CartItems = guestCart;

  const groupedItems = groupByShop(CartItems || []);

  console.log("groupedItems", groupedItems);



  return (
    <div className="container-fluid mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">

      {/* Left Section */}
      <div className="lg:col-span-2 bg-white p-4">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          My Cart (5)
        </h2>
        <div className="flex justify-between items-center border-b border-neutral-300 pb-3 mb-4 text-sm sm:text-base px-3">
          <div className="flex gap-2">
            <label className="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded  border border-neutral-300 checked:bg-[#00b795] checked:border-[#00b795]"

              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <CheckMark />
              </span>
            </label>
            <span>Select All</span>
          </div>
          <button className="text-gray-500 hover:underline">Delete</button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {
            groupedItems?.map((shop) => {
              return (
                <div className="shop-items" key={shop?.shop_id}>
                  <div className="flex shop-name px-3 py-2 bg-neutral-100 gap-2">
                    <label className="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded  border border-neutral-300 checked:bg-[#00b795] checked:border-[#00b795]"

                      />
                      <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <CheckMark />
                      </span>
                    </label>
                    {shop?.shop_name}
                  </div>
                  <div className="items">

                    {
                      shop?.products?.map((item) => {
                        const [itemQuantity, setItemQuantity] = useState(item?.quantity || 1);
                        return (
                          <div className="item flex gap-4 items-start border-b last:border-b-0 border-neutral-200 py-4 pl-3" key={item?.product_variation_id ? item?.product_variation_id : item?.product_id} >
                            <label className="flex items-center cursor-pointer relative">
                              <input
                                type="checkbox"
                                className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded  border border-neutral-300 checked:bg-[#00b795] checked:border-[#00b795]"

                              />
                              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <CheckMark />
                              </span>
                            </label>
                            {/* Image container */}
                            <div className="flex-shrink-0 w-[64px] h-[64px] md:w-[100px] md:h-[100px]">
                              <Image
                                src={item?.thumbnail || "/images/placeholder.png"}
                                alt={item?.name || "Product"}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>

                            {/* Info container */}
                            <div className="flex-grow">
                              <div className="flex gap-4 justify-between">
                                {/* Product Info */}
                                <div className="product-info flex-grow w-full">
                                  <h5 className="font-semibold line-clamp-1">{item?.name} </h5>
                                  <p className="text-sm text-gray-600">{item?.variation}</p>
                                  <p className="text-xs text-gray-500">SKU : {item?.sku}</p>
                                </div>

                                {/* Product Price */}
                                <h5 className="product-price hidden md:block font-semibold text-xl flex-shrink-0 w-fit">
                                  ৳{Math.ceil(item?.discount_price)} <del className="text-neutral-400 ml-1">৳ {Math.ceil(item?.regular_price)}</del>
                                </h5>
                              </div>

                              <div className="flex gap-4 mt-3 justify-between md:justify-start md:gap-4">
                                <h5 className="md:hidden font-semibold flex flex-col-reverse text-base">
                                  ৳{Math.ceil(item?.discount_price)} <del className="text-gray-400 text-xs">৳{Math.ceil(item?.regular_price)}</del>
                                </h5>
                                <Quantity
                                  productId={item.product_id}
                                  productVariationId={item.product_variation_id}
                                  initialQuantity={item.quantity}
                                  stock={item.current_stock}
                                  isStandalone={false}
                                />
                                <button className="text-red-500 hover:underline hidden md:block">Remove</button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }


                  </div>
                </div>
              )
            })
          }

        </div>

        {/* Right Section */}

      </div>
      <div className=" rounded-lg h-fit bg-white p-4">
        <h3 className="text-lg font-semibold mb-4">Order summary</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>Price (2 items)</span>
          <span>৳00</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Shipping fee</span>
          <span className="text-blue-500">To be added</span>
        </div>

        {/* Coupon Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Store / Packly coupon"
            className="border rounded px-3 py-2 flex-1 text-sm"
          />
          <button className="bg-green-500 text-white px-4 rounded">
            Apply
          </button>
        </div>

        {/* Total */}
        <div className="flex justify-between font-semibold mb-4">
          <span>Sub Total</span>
          <span>৳00</span>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-green-500 text-white py-2 rounded mb-4">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default CartPage