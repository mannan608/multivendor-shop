
import ProductVariations from './ProductVariations'
import { PrimaryBtn } from '../ui/button/PrimaryBtn';
import OutlineBtn from '../ui/button/OutlineBtn';
import { useDispatch } from 'react-redux';
import { useAddCartItemsMutation } from '@/redux/api/carts/addtocart/addToCartApi';
import { addToGuestCart } from '@/redux/api/carts/addtocart/addToCartSlice';
import { toastSuccess } from '@/app/utils/toastMessage';

const ProductActionBtn = ({ product, selectedOptions,
    groupedAttributes,
    handleAttributeSelect,
    isOptionAvailable
}) => {


    const dispatch = useDispatch();
    const isAuthenticated = false;
    const [addToCart] = useAddCartItemsMutation();


    const handleAddToCart = async () => {
        if (isAuthenticated) {
            try {
                await addToCart({
                    items: [{
                        product_id: product?.product_id,
                        product_variation_id: product?.product_variation_id,
                        quantity: product?.quantity,
                    }]
                }).unwrap();
            } catch (error) {
                console.error('Failed to add to cart:', error);
            }
        } else {
            dispatch(addToGuestCart({ product }));
        }
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