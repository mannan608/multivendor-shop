export const groupByShop = (data = []) => {
    return Object.values(
        data?.reduce((acc, item) => {
            if (!acc[item.shop_id]) {
                acc[item.shop_id] = {
                    shop_id: item.shop_id,
                    shop_name: item.shop_name,
                    products: [],
                    max_id_delivery_fee: 0,
                    max_od_delivery_fee: 0,
                    max_ed_delivery_fee: 0,
                };
            }

            // check free shipping per product
            const hasFreeShipping =
                item.badges?.some((badge) => badge.type === 4) ?? false;

            const id_delivery_fee = hasFreeShipping ? 0 : Number(item.id_delivery_fee) || 0;
            const od_delivery_fee = hasFreeShipping ? 0 : Number(item.od_delivery_fee) || 0;
            const ed_delivery_fee = Number(item.ed_delivery_fee) || 0; // always keep ed fee

            // update shop max
            acc[item.shop_id].max_id_delivery_fee = Math.max(
                acc[item.shop_id].max_id_delivery_fee,
                id_delivery_fee
            );
            acc[item.shop_id].max_od_delivery_fee = Math.max(
                acc[item.shop_id].max_od_delivery_fee,
                od_delivery_fee
            );
            acc[item.shop_id].max_ed_delivery_fee = Math.max(
                acc[item.shop_id].max_ed_delivery_fee,
                ed_delivery_fee
            );

            acc[item.shop_id].products.push({
                product_id: item.product_id,
                product_variation_id: item.product_variation_id,
                sku: item.sku,
                name: item.name,
                slug: item.slug,
                thumbnail: item.thumbnail,
                current_stock: item.current_stock,
                regular_price: item.regular_price,
                discount_price: item.discount_price,
                id_delivery_fee,
                od_delivery_fee,
                ed_delivery_fee,
                quantity: item.quantity,
                variant: item.variant,
                badges: item.badges,
                badgeProductVariationsExclude: item.badgeProductVariationsExclude,
            });

            return acc;
        }, {})
    );
};
