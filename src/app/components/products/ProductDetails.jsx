"use client";
import { useProductVariation } from "@/hooks/useProductVariation";
import ProductActionBtn from "./ProductActionBtn";

const ProductDetails = ({ product }) => {
    const {
        selectedOptions,
        groupedAttributes,
        handleAttributeSelect,
        isOptionAvailable,
        selectedVariant, // ✅ New
    } = useProductVariation(product.attributes, product.variations);

    // Choose price: variant price if available, else product price
    const price = selectedVariant?.discount_price || selectedVariant?.regular_price || product.discount_price || product.regular_price;
    const regularPrice = selectedVariant?.regular_price || product.regular_price;
    const hasDiscount = (selectedVariant?.discount_price || product.discount_price) && regularPrice > price;

    return (
        <>
            <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold text-primary">
                    ${price}
                </span>
                {hasDiscount && (
                    <span className="text-lg text-gray-500 line-through">
                        ${regularPrice}
                    </span>
                )}
            </div>

            <ProductActionBtn
                product={product}
                selectedOptions={selectedOptions}
                groupedAttributes={groupedAttributes}
                handleAttributeSelect={handleAttributeSelect}
                isOptionAvailable={isOptionAvailable}
            />
        </>
    );
};

export default ProductDetails;
