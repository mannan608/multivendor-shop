import { updateBuyNowItemQuantity, updateGuestCartItemQuantity } from "@/redux/api/carts/addtocart/addToCartSlice";
import { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Quantity = ({
    productId,
    productVariationId = null,
    initialQuantity,
    stock,
    onQuantityChange,
    isStandalone = false,
    buyNowQty = false
}) => {
    const dispatch = useDispatch();
    const [quantity, setLocalQuantity] = useState(initialQuantity);
    const [warning, setWarning] = useState('');
    useEffect(() => {
        setLocalQuantity(initialQuantity);
    }, [initialQuantity]);

    const updateQuantity = (newQuantity) => {
        if (isStandalone) {
            setLocalQuantity(newQuantity);
            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
        } else {
            if (buyNowQty) {
                dispatch(updateBuyNowItemQuantity({
                    product_id: productId,
                    product_variation_id: productVariationId,
                    quantity: newQuantity
                }));

            } else {
                dispatch(updateGuestCartItemQuantity({
                    product_id: productId,
                    product_variation_id: productVariationId,
                    quantity: newQuantity
                }));
            }
        }
    };

    const increaseCartQty = () => {
        if (quantity < stock) {
            const newQuantity = quantity + 1;
            setLocalQuantity(newQuantity);
            updateQuantity(newQuantity);
            setWarning('');
        } else {
            setWarning(`Maximum available quantity is ${stock}`);
        }
    };

    const decreaseCartQty = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setLocalQuantity(newQuantity);
            updateQuantity(newQuantity);
            setWarning('');
        }
    };

    const handleChange = (e) => {
        let val = e.target.value;

        if (val === '') {
            setLocalQuantity('');
            setWarning('');
            return;
        }

        val = Number(val);

        if (isNaN(val) || val < 1) {
            const newQuantity = 1;
            setLocalQuantity(newQuantity);
            updateQuantity(newQuantity);
            setWarning('');
            return;
        }

        if (val > stock) {
            const newQuantity = stock;
            setLocalQuantity(newQuantity);
            updateQuantity(newQuantity);
            setWarning(`Maximum available quantity is ${stock}`);
            return;
        }

        setLocalQuantity(val);
        setWarning('');
    };

    const handleBlur = () => {
        if (quantity === '' || quantity < 1) {
            const newQuantity = 1;
            setLocalQuantity(newQuantity);
            updateQuantity(newQuantity);
            setWarning('');
        } else {
            updateQuantity(quantity);
        }
    };

    return (
        <div className="space-y-1">
            <div className="w-[100px] h-8 sm:w-[130px] sm:h-10 rounded-full border border-neutral-300 flex justify-between items-center px-[2px]">
                <button
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-100 grid place-content-center cursor-pointer disabled:opacity-50 hover:bg-gray-200 transition-colors"
                    onClick={decreaseCartQty}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                >
                    <FaMinus size={12} />
                </button>

                <input
                    type="number"
                    value={quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-7 h-7 sm:w-9 sm:h-9 text-center appearance-none outline-none focus:ring-0 focus:border-transparent no-spinner border-0 bg-transparent"
                    min="1"
                    max={stock}
                    aria-label="Product quantity"
                />

                <button
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-100 grid place-content-center cursor-pointer disabled:opacity-50 hover:bg-gray-200 transition-colors"
                    onClick={increaseCartQty}
                    disabled={quantity >= stock}
                    aria-label="Increase quantity"
                >
                    <FaPlus size={12} />
                </button>
            </div>

            {warning && (
                <p className="text-xs text-red-500 font-medium">{warning}</p>
            )}
        </div>
    );
};

export default Quantity;