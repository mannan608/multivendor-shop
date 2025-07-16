import Link from 'next/link';

const ProductCard = () => {
    const isFlashSale = true;
    const id = 3;
    return (
        <Link
            href={`/product/${id}`}
            className="group bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out"
        >
            <div className="relative">
                <img
                    src="https://placehold.co/200x200"
                    alt="Product"
                    className="w-full h-40 object-cover rounded"
                />
                <span className="absolute bottom-2 left-0 bg-green-500 text-white px-2 py-1 text-xs rounded-r-[4px]">
                    Free Delivery
                </span>

                {isFlashSale && (
                    <span className="absolute top-2 left-0 bg-green-500 text-white px-2 py-1 text-xs rounded-r-[4px]">
                        Save 500
                    </span>
                )}
                {/* <span className="hidden group-hover:flex absolute right-2 top-2 bg-green-500 text-white px-2 py-1 text-xs rounded-r-[4px]">
                    <QuickViewBtn id={id} />
                </span> */}
            </div>

            <div className="mt-2 px-3">
                <div className="flex items-center text-yellow-500 text-sm mb-1">
                    ★ 4.8 (200)
                </div>
                <h2 className="text-sm font-semibold">
                    OnePlus Nord CE 4 Lite 5G 8GB/256GB
                </h2>

                {isFlashSale ? (
                    <div className="mt-2 flex item-center justify-between bg-primary-50 rounded-bl-[8px] rounded-br-[8px] h-6 md:h-8 mx-[-12px]">
                        <div className="pl-[12px] flex items-center">
                            <h5 className="text-primary text-base font-semibold md:text-lg md:font-medium">
                                ৳500
                            </h5>
                        </div>
                        <div className="bg-cover bg-no-repeat bg-[url(/subtract.svg)] pl-4 pr-2 py-3 rounded-br-[8px] flex items-center">
                            <span className="text-white ml-2 text-[12px] font-medium md:text-base md:font-normal">
                                - 50 %
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mb-2">
                        <div className="text-green-600 font-bold mt-1">৳500</div>
                        <div className="text-gray-400 text-sm line-through">৳600</div>
                        <div className="text-sm text-green-500 font-medium">-25%</div>
                    </div>
                )}
            </div>
        </Link>

    )
}

export default ProductCard