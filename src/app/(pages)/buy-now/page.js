
"use client";
import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Quantity from "@/app/components/ui/Quantity";

export default function BuyNow() {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const buyNowItem = useSelector((state) => state.cart.buyNowItem);

    console.log("buyNowItem", buyNowItem);

    return (
        <div className="w-full min-h-screen bg-gray-50 py-6">
            <div className="container mx-auto px-4">
                {/* Page Heading */}
                <h1 className="text-2xl font-semibold mb-6">Buy Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white shadow rounded-lg p-5">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold">Shipping Address</h2>
                                <button className="text-blue-600 text-sm hover:underline">
                                    Change
                                </button>
                            </div>
                            <div className="space-y-1 text-gray-700">
                                <p className="font-medium">Akash Basak</p>
                                <p>House 20, road 4, PC culture housing, Adabor-1209</p>
                                <p>📞 01628665021</p>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="bg-white shadow rounded-lg p-5">
                            <h2 className="text-lg font-semibold mb-4">Items (03)</h2>

                            {/* Shop Section */}
                            <div className="shop-items mb-6">
                                <div className="flex shop-name px-3 py-2 bg-neutral-100 gap-2">
                                    {buyNowItem?.shop_name}
                                </div>
                                <div className="flex items-center gap-4 mb-4 mt-4 delivery-option">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="delivery1" defaultChecked />
                                        <span>Regular <span className="text-gray-500 text-sm">Delivery in 2–3 days</span></span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="delivery1" />
                                        <span>Express <span className="text-gray-500 text-sm">Next day delivery</span></span>
                                    </label>
                                </div>

                                <div className="items">
                                    <div className="item w-full flex flex-col gap-4 border-b border-neutral-200 pb-4 md:flex-row md:items-center md:justify-between">
                                        {/* Left: Image + Details */}
                                        <div className="flex gap-4 flex-1">
                                            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                                                <Image
                                                    src={buyNowItem?.thumbnail || "/shop_default_img.svg"}
                                                    alt={buyNowItem?.name || "Product"}
                                                    width={80}
                                                    height={80}
                                                    className="rounded"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-medium text-sm md:text-base">{buyNowItem?.name}</h4>
                                                    <p className="text-sm text-gray-500">{buyNowItem?.variation}</p>
                                                </div>

                                                <Quantity
                                                    productId={buyNowItem.product_id}
                                                    productVariationId={buyNowItem.product_variation_id}
                                                    initialQuantity={buyNowItem.quantity}
                                                    stock={buyNowItem.current_stock}
                                                    isStandalone={false}
                                                    buyNowQty={true}
                                                />
                                            </div>
                                        </div>

                                        {/* Right: Price + Quantity + Delete */}
                                        <div className="flex flex-col items-end gap-2 mt-2 md:mt-0">
                                            <p className="text-sm md:text-base">QTY: {buyNowItem?.quantity}</p>
                                            <div className="flex flex-col items-end">
                                                <del className="font-medium line-through text-gray-400">৳{buyNowItem?.regular_price}</del>
                                                <p className="font-semibold">৳{buyNowItem?.discount_price}</p>
                                            </div>
                                            <p className="text-green-600 text-sm mb-3">
                                                ৳{(Number(buyNowItem?.regular_price) || 0) - (Number(buyNowItem?.discount_price) || 0)} Discounted Price
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Payment + Order Summary */}
                    <div className="space-y-6">
                        {/* Payment Option */}
                        <div className="bg-white shadow rounded-lg p-5">
                            <h2 className="text-lg font-semibold mb-3">Payment Option</h2>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={() => setPaymentMethod("cod")}
                                    />
                                    <span>Cash on delivery</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === "card"}
                                        onChange={() => setPaymentMethod("card")}
                                    />
                                    <span className="flex items-center gap-2">
                                        Pay with
                                        <Image src="/visa.png" width={40} height={20} alt="Visa" />
                                        <Image src="/mastercard.png" width={40} height={20} alt="Mastercard" />
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white shadow rounded-lg p-5">
                            <h2 className="text-lg font-semibold mb-3">Order summary</h2>
                            <div className="space-y-2 text-gray-700">
                                <div className="flex justify-between"><span>Price (3 items)</span><span>৳1139</span></div>
                                <div className="flex justify-between"><span>Discount</span><span>-৳100</span></div>
                                <div className="flex justify-between"><span>Shipping Fee</span><span>৳120</span></div>
                                <div className="flex justify-between text-green-600">
                                    <span>Coupon applied</span>
                                    <button className="text-sm text-red-600">Remove</button>
                                </div>
                                <div className="flex justify-between">
                                    <span>Voucher</span>
                                    <span className="text-green-600">Applied</span>
                                </div>
                                <hr />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>৳979</span>
                                </div>
                            </div>

                            <button className="mt-4 w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700">
                                Place Order
                            </button>

                            <p className="mt-3 text-xs text-gray-500 text-center">
                                I have read and agree to the{" "}
                                <a href="#" className="text-blue-600 underline">Terms and Conditions</a>,{" "}
                                <a href="#" className="text-blue-600 underline">Privacy Policy</a> and{" "}
                                <a href="#" className="text-blue-600 underline">Refund Policy</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
