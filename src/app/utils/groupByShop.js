export const groupByShop = (data = []) => {
    return Object.values(
        data.reduce((acc, item) => {
            if (!acc[item.shop_id]) {
                acc[item.shop_id] = {
                    shop_id: item.shop_id,
                    shop_name: item.shop_name,
                    products: [],
                };
            }

            acc[item.shop_id].products.push({
                product_variation_id: item.product_variation_id,
                name: item.name,
                slug: item.slug,
                thumbnail: item.thumbnail,
                current_stock: item.current_stock,
                regular_price: item.regular_price,
                discount_price: item.discount_price,
                id_delivery_fee: item.id_delivery_fee,
                od_delivery_fee: item.od_delivery_fee,
                ed_delivery_fee: item.ed_delivery_fee,
                quantity: item.quantity,
                variation: item.variation,
                badges: item.badges,
                badgeProductVariationsExclude: item.badgeProductVariationsExclude,
            });

            return acc;
        }, {})
    );
};
