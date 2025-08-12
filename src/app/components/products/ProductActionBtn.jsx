
import ProductVariations from './ProductVariations'
import { PrimaryBtn } from '../ui/button/PrimaryBtn';
import OutlineBtn from '../ui/button/OutlineBtn';

const ProductActionBtn = ({ product, selectedOptions,
    groupedAttributes,
    handleAttributeSelect,
    isOptionAvailable, }) => {

    //    "data": [
    //         {
    //             "product_id": 8,
    //             "product_variation_id": null,
    //             "shop_id": 3,
    //             "shop_name": "Packly Bangladesh",
    //             "quantity": 1,
    //             "name": "P9 Bluetooth Wireless Headphones With Microphone Noise Cancellation",
    //             "slug": "p9-bluetooth-wireless-headphones-with-microphone-noise-cancellation",
    //             "thumbnail": "http://157.230.240.97:8888/storage/media/20250628_124247_13908182-4059-4cc1-9b15-2591733c1f0c.jpg",
    //             "current_stock": 100,
    //             "max_cart_quantity": null,
    //             "regular_price": "750.00",
    //             "discount_price": "25.00",
    //             "id_delivery_fee": "60.00",
    //             "od_delivery_fee": "120.00",
    //             "ed_delivery_fee": "150.00",
    //             "variation": null,
    //             "badges": [
    //                 {
    //                     "id": 1,
    //                     "name": "Free Shipping",
    //                     "type": 4,
    //                     "type_label": "Free Shipping"
    //                 }
    //             ],
    //             "badgeProductVariationsExclude": []
    //         }
    //]


    const handleAddToCart = () => {
        // Add to cart logic
    };

    return (
        <>
            <ProductVariations
                selectedOptions={selectedOptions}
                groupedAttributes={groupedAttributes}
                handleAttributeSelect={handleAttributeSelect}
                isOptionAvailable={isOptionAvailable}
            />
            <div className="flex gap-3 mt-5">
                <OutlineBtn handleAction={handleAddToCart} text="Add to Cart" />
                <PrimaryBtn handleAction={handleAddToCart} text="Buy Now" />
            </div>


        </>
    )
}

export default ProductActionBtn