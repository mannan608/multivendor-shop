import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";


const Quantity = ({ quantity, setQuantity, stock }) => {
    const [warning, setWarning] = useState('');

    const increaseCartQty = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
            setWarning('');
        } else {
            setWarning(`Maximum available quantity is (Max: ${stock})`);
        }
    };

    const decreaseCartQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setWarning('');
        }
    };

    const handleChange = (e) => {
        let val = e.target.value;

        if (val === '') {
            setQuantity('');
            setWarning('');
            return;
        }

        val = Number(val);

        if (isNaN(val) || val < 1) {
            setQuantity(1);
            setWarning('');
            return;
        }

        if (val > stock) {
            setQuantity(stock);
            setWarning(`Maximum available quantity is (Max: ${stock})`);
            return;
        }

        setQuantity(val);
        setWarning('');
    };

    const handleBlur = () => {
        if (quantity === '' || quantity < 1) {
            setQuantity(1);
            setWarning('');
        }
    };
    return (
        <div className={`space-y-1`}>
            <div className="w-[100px] h-8 sm:w-[130px] sm:h-10 rounded-full border border-neutral-300 flex justify-between items-center px-[2px]">
                <button
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-background grid place-content-center cursor-pointer disabled:opacity-50"
                    onClick={decreaseCartQty}
                    disabled={quantity <= 1}
                >
                    <FaMinus />
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-7 h-7 sm:w-9 sm:h-9 text-center appearance-none outline-none focus:ring-0 focus:border-transparent no-spinner"
                    min="1"
                    max={stock}
                />
                <button
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-background grid place-content-center cursor-pointer disabled:opacity-50"
                    onClick={increaseCartQty}
                    disabled={quantity >= stock}
                >
                    <FaPlus />
                </button>
            </div>

            {warning && (
                <p className="text-xs text-red-500 font-medium">{warning}</p>
            )}
        </div>
    )
}

export default Quantity