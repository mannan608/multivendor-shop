"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { userLoggedOut } from "@/redux/api/auth/authSlice";
// import { userLoggedOut } from "@/redux/auth/authSlice";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        // Remove tokens from localStorage
        localStorage.removeItem("auth");
        localStorage.removeItem("passAuth");

        // Reset redux state
        dispatch(userLoggedOut());

        // Redirect to homepage (or login page)
        router.push("/");
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 text-red-600 cursor-pointer"
        >
            <FiLogOut /> Logout
        </button>
    );
};

export default LogoutBtn;
