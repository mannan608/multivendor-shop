

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const LoginButton = () => {
    const pathname = usePathname();
    const isTrue = pathname === "/auth/login";

    const { user } = useSelector((state) => state.auth);



    return (
        <>
            {isTrue ? (
                ""
            ) : (
                <>
                    {
                        user ? (
                            <p className="text-white">Welcome back, {user.name}!</p>
                        ) : (
                            <Link
                                href="/auth/login"
                                scroll={false}
                                className="block px-4 py-1 text-white  font-medium text-base"
                            >
                                Login/Signup
                            </Link >
                        )
                    }
                </>
            )}
        </>
    );
};

export default LoginButton;