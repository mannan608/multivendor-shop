export function formatProductData(products = []) {
    return products.map((product) => {
        const selectedVariant = product?.variation || null;
        const variant =
            selectedVariant?.variant
                ?.map(
                    (variation) =>
                        `${variation.attribute_name}: ${variation.attribute_option}`
                )
                .join(", ") || null;

        return {
            product_id: product?.product_id,
            product_variation_id: selectedVariant?.id || null,
            sku: selectedVariant?.sku || null,
            shop_id: product?.shop_id,
            shop_name: product?.shop_name,
            quantity: product?.quantity,
            name: product?.name,
            slug: product?.slug,
            is_variant: !!selectedVariant,
            thumbnail: product?.thumbnail || selectedVariant?.image,
            current_stock: product?.current_stock,
            regular_price:
                selectedVariant?.regular_price || product?.regular_price,
            discount_price:
                selectedVariant?.discount_price || product?.discount_price,
            id_delivery_fee:
                selectedVariant?.id_delivery_fee || product?.id_delivery_fee,
            od_delivery_fee:
                selectedVariant?.od_delivery_fee || product?.od_delivery_fee,
            ed_delivery_fee:
                selectedVariant?.ed_delivery_fee || product?.ed_delivery_fee,
            variant,
            badges: product?.badges || [],
            badgeProductVariationsExclude:
                product?.badgeProductVariationsExclude || [],
        };
    });
}
