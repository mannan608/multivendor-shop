

import ProductImage from "./ProductImage";
import ProductActionBtn from "./ProductActionBtn";

const ProductDetails = ({ product }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="product-images flex flex-col gap-4 w-full lg:w-[380px] flex-shrink-0">
                <ProductImage product={product} />
            </div>
            <div className="product-info flex-1">
                <div className="space-y-6">
                    <h1 className="text-base md:text-xl font-medium">{product.name}</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-semibold text-primary">
                            ${product.discount_price || product.regular_price}
                        </span>
                        {product.discount_price && (
                            <span className="text-lg text-gray-500 line-through">
                                ${product.regular_price}
                            </span>
                        )}
                    </div>
                    <ProductActionBtn product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;