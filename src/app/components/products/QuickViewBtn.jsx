"use client";
import { useRouter } from "next/navigation";


const QuickViewBtn = ({ id }) => {
    const router = useRouter();

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/product/${id}`);
    };
    return (
        <button onClick={handleQuickView}>view</button>
    )
}

export default QuickViewBtn