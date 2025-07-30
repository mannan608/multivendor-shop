import { calculateDiscountPercentage } from '@/app/utils/discount';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const isFlashSale = false;
    const discount = calculateDiscountPercentage(
        product.regular_price,
        product.discount_price);
    return (
        <Link
            href={`/product/${product.slug}`}
            className="group bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out"
        >
            <div className="relative">
                <img
                    src={product.thumbnail}
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
                <div className="flex items-center text-yellow-500 text-sm mb-1 gap-2">
                    <FaStar className="text-yellow-500" />
                    {product.rating_avg} ({product.rating_count})
                </div>
                <h2 className="text-sm font-semibold line-clamp-1">
                    {product.name}
                </h2>

                {isFlashSale ? (
                    <div className="mt-2 flex item-center justify-between bg-primary-50 rounded-bl-[8px] rounded-br-[8px] h-6 md:h-8 mx-[-12px]">
                        <div className="pl-[12px] flex items-center">
                            <h5 className="text-primary text-base font-semibold md:text-lg md:font-medium">
                                ৳{Math.floor(product.regular_price)}
                            </h5>
                        </div>
                        <div className="bg-cover bg-no-repeat bg-[url(/subtract.svg)] pl-4 pr-2 py-3 rounded-br-[8px] flex items-center">
                            <span className="text-white ml-2 text-[12px] font-medium md:text-base md:font-normal">
                                - {discount} %
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mb-2">
                        <div className="text-green-600 font-bold mt-1">৳{product.discount_price}</div>
                        <del className="text-gray-400 text-sm line-through">৳{product.regular_price}</del>
                        <div className="text-sm text-green-500 font-medium">-{discount}%</div>
                    </div>
                )}
            </div>
        </Link>

    )
}

export default ProductCard