"use client";
import { handleApiError } from "@/app/utils/handleApiError";
import { getRedirectPath } from "@/app/utils/redirect";
import { toastSuccess, toastWarning } from "@/app/utils/toastMessage";
import {
    useLoginMutation,
    useSendOtpMutation,
    useSetPasswordMutation,
    useVerifyOtpMutation,
} from "@/redux/api/auth/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState("");
    const [otpToken, setOtpToken] = useState(null);
    const [otp, setOtp] = useState("");

    const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
    const [setPassword, { isLoading: isSettingPassword }] = useSetPasswordMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();

    const redirectTo = getRedirectPath();

    const onSubmit = async (data) => {
        if (step === "phone") {
            const phoneRegex = /^01[3-9]\d{8}$/;
            if (!phoneRegex.test(data.phone)) {
                toastWarning("Enter a valid phone number.");
                return;
            }
            try {
                const res = await sendOtp({ phone: data.phone }).unwrap();
                setPhone(data.phone);
                toastSuccess("OTP sent successfully!");

                if (res?.data?.password) setStep("password");
                else setStep("otp");
            } catch (error) {
                handleApiError(error);
            }
        }

        else if (step === "password") {
            try {
                await login({ phone, password: data.password }).unwrap();
                toastSuccess("Login successful!");
                router.back(redirectTo || "/");
            } catch (error) {
                handleApiError(error);
            }
        }

        else if (step === "otp") {
            try {
                const res = await verifyOtp({ phone, otp }).unwrap();
                setOtpToken(res?.data?.token);
                setOtp("");

                if (res?.data?.set_password === true) {
                    setStep("setPassword");
                    toastSuccess("OTP verified! Please set your password.");
                } else {
                    toastSuccess("Login successful with OTP!");
                    router.back(redirectTo || "/");
                }
            } catch (error) {
                handleApiError(error);
            }
        }

        else if (step === "setPassword") {
            if (data.password !== data.confirmPassword) {
                toastWarning("Passwords do not match.");
                return;
            }
            try {
                await setPassword({
                    phone,
                    otpToken,
                    password: data.password,
                    confirm_password: data.confirmPassword,
                }).unwrap();

                toastSuccess("Password set & login successful!");
                router.back(redirectTo || "/");
            } catch (error) {
                handleApiError(error);
            }
        }
    };

    const isLoading =
        isSendingOtp || isVerifyingOtp || isSettingPassword || isLoggingIn;

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
                    <div className="flex flex-col items-center gap-4">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            shouldAutoFocus={true}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                width: "3.25rem",
                                height: "3.25rem",
                                margin: "0 0.4rem",
                                fontSize: "1.25rem",
                                borderRadius: "0.375rem",
                                border: "1px solid #ccc",
                                textAlign: "center",
                                color: "black",
                                outline: "none",
                            }}
                            focusStyle={{
                                border: "1px solid var(--bs-primary-500)",
                                boxShadow: "0 0 0 1px var(--bs-primary-500)",
                            }}
                        />
                    </div>
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
                    disabled={isLoading}
                    className={`w-full bg-primary-500 text-white p-2 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isLoading ? "Processing..." :
                        step === "phone" ? "Continue" :
                            step === "password" ? "Login" :
                                step === "otp" ? "Verify OTP" :
                                    "Set Password"}
                </button>
            </form>
        </div>
    );
}
