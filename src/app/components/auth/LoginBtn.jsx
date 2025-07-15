

import Link from "next/link";
import { usePathname } from "next/navigation";

const LoginButton = () => {
    const pathname = usePathname();
    const isTrue = pathname === "/auth/login";

    return (
        <>
            {isTrue ? (
                ""
            ) : (
                <Link
                    href="/auth/login"
                    scroll={false}
                    className="block px-4 py-1 text-white bg-primary-500 hover:bg-primary-600 rounded font-medium text-base"
                >
                    Login
                </Link>
            )}
        </>
    );
};

export default LoginButton;