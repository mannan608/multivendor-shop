
import ProductVariations from './ProductVariations'
import { PrimaryBtn } from '../ui/button/PrimaryBtn';
import OutlineBtn from '../ui/button/OutlineBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useAddCartItemsMutation } from '@/redux/api/carts/addtocart/addToCartApi';
import { addToGuestCart, clearBuyNowItem, setBuyNowItem } from '@/redux/api/carts/addtocart/addToCartSlice';
import { toastError, toastSuccess } from '@/app/utils/toastMessage';
import { useRouter } from 'next/navigation';

const ProductActionBtn = ({ product, selectedOptions,
    groupedAttributes,
    handleAttributeSelect,
    isOptionAvailable
}) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [addToCart] = useAddCartItemsMutation();
    const buyNowItem = useSelector((state) => state.cart.buyNowItem);
    const { isAuthenticated } = useSelector((state) => state.auth || {});

    const handleAddToCart = async () => {
        try {
            if (isAuthenticated) {
                const cartApiData = {
                    items: [
                        {
                            product_id: product?.product_id,
                            product_variation_id: product?.product_variation_id || null,
                            quantity: product?.quantity || 1,
                            action: "increase",
                        },
                    ],
                };

                await addToCart(cartApiData).unwrap();
                toastSuccess("Item added to your cart.");
            } else {
                dispatch(addToGuestCart({ product }));
            }
        } catch (error) {
            if (error?.data?.message) {
                toastError(error.data.message);
            } else if (error?.message) {
                toastError(error.message);
            } else {
                toastError("Something went wrong while adding to cart.");
            }
        }
    };

    const handleBuyNow = () => {
        if (buyNowItem) {
            dispatch(clearBuyNowItem());
        }
        dispatch(setBuyNowItem(product));
        router.push("/buy-now");
    }

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
                <PrimaryBtn handleAction={handleBuyNow} text="Buy Now" />
            </div>


        </>
    )
}

export default ProductActionBtn