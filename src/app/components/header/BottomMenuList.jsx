import Link from 'next/link'
import { FaHome, FaThLarge, FaShoppingCart, FaUser } from "react-icons/fa";

const BottomMenuList = ({ isActive }) => {
    return (
        <>
            <div className="flex justify-around items-center py-2">
                {/* Home */}
                <Link href="/">
                    <div className="flex flex-col items-center text-xs">
                        <FaHome className={`text-xl ${isActive("/") ? "text-teal-600" : "text-gray-500"}`} />
                        <span className={isActive("/") ? "text-teal-600 font-medium" : "text-gray-500"}>Home</span>
                    </div>
                </Link>

                {/* Category */}
                <Link href="/category">
                    <div className="flex flex-col items-center text-xs">
                        <FaThLarge className={`text-xl ${isActive("/category") ? "text-teal-600" : "text-gray-500"}`} />
                        <span className={isActive("/category") ? "text-teal-600 font-medium" : "text-gray-500"}>Category</span>
                    </div>
                </Link>

                {/* My Cart */}
                <Link href="/cart">
                    <div className="relative flex flex-col items-center text-xs">
                        <FaShoppingCart className={`text-xl ${isActive("/cart") ? "text-teal-600" : "text-gray-500"}`} />
                        <span className={isActive("/cart") ? "text-teal-600 font-medium" : "text-gray-500"}>My Cart</span>
                        {/* Cart Badge */}
                        <span className="absolute -top-1 right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            12
                        </span>
                    </div>
                </Link>

                {/* My Profile */}
                <Link href="/profile">
                    <div className="flex flex-col items-center text-xs">
                        <FaUser className={`text-xl ${isActive("/profile") ? "text-teal-600" : "text-gray-500"}`} />
                        <span className={isActive("/profile") ? "text-teal-600 font-medium" : "text-gray-500"}>My Profile</span>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default BottomMenuList