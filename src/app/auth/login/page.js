"use client"
import LoginForm from "@/app/components/auth/LoginForm"
import { getRedirectPath } from "@/app/utils/redirect";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";


const LoginPage = () => {
    const { accessToken } = useSelector((state) => state.auth);
    const redirectTo = getRedirectPath();
    if (accessToken) {
        redirect(redirectTo);
    }
    return (
        <section className="h-screen grid place-items-center">
            <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
                <h4 className="font-bold text-2xl">Sign in</h4>
                <LoginForm />
            </div>
        </section>
    )
}

export default LoginPage