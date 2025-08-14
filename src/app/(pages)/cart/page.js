"use client";

import CheckMark from "@/app/components/icons/CheckMark";
import Quantity from "@/app/components/ui/Quantity";
import Image from "next/image";
import { useSelector } from "react-redux";


const CartPage = () => {

  const guestCart = useSelector(state => state.cart?.items);

  // console.log("guestCart", guestCart);

  const groupedItems = guestCart.reduce((acc, item) => {
    (acc[item.shop_name] = acc[item.shop_name] || []).push(item);
    return acc;
  }, {});

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
          <div className="shop-items">
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
              Packly Bangladesh
            </div>
            <div className="items">
              <div className="item flex gap-4 items-start border-b border-neutral-200 py-4 pl-3">
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
                <div className="flex-shrink-0 max-w-[64px] md:max-w-[100px]">
                  <Image
                    src="/images/product.png"
                    alt="Product Image"
                    width={100}
                    height={100}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Info container */}
                <div className="flex-grow">
                  <div className="flex gap-4 justify-between">
                    {/* Product Info */}
                    <div className="product-info flex-grow w-full">
                      <h5 className="font-semibold line-clamp-1">lorem ipsam lorem ipsamlorem ipsamlorem ipsam lorem ipsam lorem ipsam lorem ipsam lorem ipsam ipsamlorem ipsamlorem ipsam lorem ipsam lorem ipsam lorem ipsam lorem ipsam </h5>
                      <p className="text-sm text-gray-600">variation</p>
                      <p className="text-xs text-gray-500">SKU :</p>
                    </div>

                    {/* Product Price */}
                    <h5 className="product-price hidden md:block font-semibold text-xl flex-shrink-0 w-fit">
                      ৳11390000 <del className="text-neutral-400 ml-1">৳ 1500</del>
                    </h5>
                  </div>

                  <div className="flex gap-4 mt-3 justify-between md:justify-start md:gap-4">
                    <h5 className="md:hidden font-semibold flex flex-col-reverse text-base">
                      ৳1139 <del className="text-gray-400 text-xs">৳ 1500</del>
                    </h5>
                    <Quantity />
                    <button className="text-red-500 hover:underline hidden md:block">Remove</button>
                  </div>
                </div>
              </div>
              <div className="item flex gap-4 items-start border-b border-neutral-200 py-4 pl-3">
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
                <div className="flex-shrink-0 max-w-[64px] md:max-w-[100px]">
                  <Image
                    src="/images/product.png"
                    alt="Product Image"
                    width={100}
                    height={100}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Info container */}
                <div className="flex-grow">
                  <div className="flex gap-4 justify-between">
                    {/* Product Info */}
                    <div className="product-info flex-grow w-full">
                      <h5 className="font-semibold line-clamp-1">ipsam lorem ipsam ipsamlorem ipsamlorem ipsam lorem ipsam lorem ipsam lorem ipsam lorem ipsam </h5>
                      <p className="text-sm text-gray-600">variation</p>
                      <p className="text-xs text-gray-500">SKU :</p>
                    </div>

                    {/* Product Price */}
                    <h5 className="product-price hidden md:block font-semibold text-xl flex-shrink-0 w-fit">
                      ৳1139 <del className="text-neutral-400 ml-1">৳ 1500</del>
                    </h5>
                  </div>

                  <div className="flex gap-4 mt-3 justify-between md:justify-start md:gap-4">
                    <h5 className="md:hidden font-semibold flex flex-col-reverse text-base">
                      ৳1139 <del className="text-gray-400 text-xs">৳ 1500</del>
                    </h5>
                    <Quantity />
                    <button className="text-red-500 hover:underline hidden md:block">Remove</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
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