"use client";
import { setRedirectPath } from "@/app/utils/redirect";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, fallback = <div>Loading...</div> }) => {
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!user) {
            setRedirectPath(window.location.pathname);
            router.push("/auth/login");
        }
        setChecking(false);
    }, [user, router]);

    if (checking) return fallback;

    if (!user) return null;

    return children;
};

export default ProtectedRoute;
