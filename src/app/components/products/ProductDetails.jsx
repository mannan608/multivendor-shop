"use client";
import { useProductVariation } from "@/hooks/useProductVariation";
import ProductActionBtn from "./ProductActionBtn";
import { useState } from "react";
import Quantity from "../ui/Quantity";

const ProductDetails = ({ product }) => {
    const [quantity, setQuantity] = useState(1);


    const {
        selectedOptions,
        groupedAttributes,
        handleAttributeSelect,
        isOptionAvailable,
        selectedVariant,
    } = useProductVariation(product.attributes, product.variations);



    const price = selectedVariant?.discount_price || selectedVariant?.regular_price || product.discount_price || product.regular_price;
    const regularPrice = selectedVariant?.regular_price || product.regular_price;
    const hasDiscount = (selectedVariant?.discount_price || product.discount_price) && regularPrice > price;
    const current_stock = selectedVariant?.quantity || product.quantity;


    console.log("selectedOptions", selectedOptions);
    console.log("selectedVariant", selectedVariant);
    console.log("product", product);

    const variations = selectedVariant?.variant?.map((variation) => `${variation.attribute_name}: ${variation.attribute_option}`)
        .join(", ")



    const guestProduct = {
        product_id: product?.id,
        product_variation_id: selectedVariant?.id || null,
        shop_id: product?.shop_id,
        shop_name: product?.shop_name,
        quantity: quantity,
        name: product?.name,
        slug: product?.slug,
        is_variant: product?.is_variant,
        thumbnail: product?.thumbnail || selectedVariant?.image,
        current_stock: current_stock,
        regular_price: regularPrice,
        discount_price: price,
        id_delivery_fee: product?.id_delivery_fee || selectedVariant?.id_delivery_fee,
        od_delivery_fee: product?.od_delivery_fee || selectedVariant?.od_delivery_fee,
        ed_delivery_fee: product?.ed_delivery_fee || selectedVariant?.ed_delivery_fee,
        variation: variations || null,
        badges: product?.badges || [],
        badgeProductVariationsExclude: product?.badgeProductVariationsExclude || []
    };

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

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

            <Quantity
                initialQuantity={quantity}
                stock={current_stock}
                onQuantityChange={handleQuantityChange}
                isStandalone={true}
                buyNowQty={false}
            />

            <ProductActionBtn
                product={guestProduct}
                selectedOptions={selectedOptions}
                groupedAttributes={groupedAttributes}
                handleAttributeSelect={handleAttributeSelect}
                isOptionAvailable={isOptionAvailable}
                selectedVariant={selectedVariant}

            />
        </>
    );
};

export default ProductDetails;
