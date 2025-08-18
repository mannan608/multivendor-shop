"use client";
import { getRedirectPath } from "@/app/utils/redirect";
import { toastWarning } from "@/app/utils/toastMessage";
import { useLoginMutation, useSendOtpMutation, useSetPasswordMutation, useVerifyOtpMutation } from "@/redux/api/auth/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit, setValue, watch } = useForm();
    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState("");
    const [otpToken, setOtpToken] = useState(null);


    const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
    const [setPassword, { isLoading: isSettingPassword }] = useSetPasswordMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();

    const redirectTo = getRedirectPath();
    const onSubmit = async (data) => {
        if (step === "phone") {
            try {
                const res = await sendOtp({ phone: data.phone });
                setPhone(data.phone);

                // Case 1: user exists and has password → go to password login
                if (res?.data?.data?.password) {
                    setStep("password");
                }
                // Case 2: user exists but no password → go to OTP
                else if (res?.data?.data && !res?.data?.data?.password) {
                    setStep("otp");
                }
                // Case 3: new user → OTP is sent → go to OTP
                else {
                    setStep("otp");
                }
            } catch (error) {
                console.error("sendOtp error:", error);
            }
        }

        else if (step === "password") {
            try {
                const res = await login({ phone, password: data.password });
                router.back(redirectTo);
            } catch (error) {
                console.error("Login error:", error);
            }
        }

        else if (step === "otp") {
            try {
                const res = await verifyOtp({ phone, otp: data.otp });
                const set_password = res?.data?.data?.set_password;
                const token = res?.data?.data?.token;

                setOtpToken(token);

                if (set_password === true) {
                    setStep("setPassword");
                } else {
                    router.back(redirectTo || "/");
                }
            } catch (error) {
                console.error("OTP error:", error);
            }
        }

        else if (step === "setPassword") {
            if (data.password !== data.confirmPassword) {
                toastWarning("Passwords do not match.");
                return;
            }
            try {
                const res = await setPassword({
                    phone,
                    otpToken,
                    password: data.password,
                    confirm_password: data.confirmPassword,
                });
                router.back(redirectTo || "/");
            } catch (error) {
                console.error("SetPassword error:", error);
            }
        }
    };


    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {step === "phone" && (
                    <input
                        type="text"
                        placeholder="Enter phone"
                        {...register("phone", { required: true })}
                        className="w-full border p-2 rounded"
                    />
                )}

                {step === "password" && (
                    <input
                        type="password"
                        placeholder="Enter password"
                        {...register("password", { required: true })}
                        className="w-full border p-2 rounded"
                    />
                )}

                {step === "otp" && (
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        {...register("otp", { required: true })}
                        className="w-full border p-2 rounded"
                    />
                )}

                {step === "setPassword" && (
                    <>
                        <input
                            type="password"
                            placeholder="Set a password"
                            {...register("password", { required: true })}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            {...register("confirmPassword", { required: true })}
                            className="w-full border p-2 rounded"
                        />
                    </>
                )}

                <button
                    type="submit"
                    className="w-full bg-primary-500 text-white p-2 rounded"
                >
                    {step === "phone" && "Continue"}
                    {step === "password" && "Login"}
                    {step === "otp" && "Verify OTP"}
                    {step === "setPassword" && "Set Password"}
                </button>
            </form>
        </div>
    );
}


