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
import {  useState } from "react";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import CompanySortInfo from "./CompanySortInfo";
import { useGetCartItemsQuery, useSyncGuestCartMutation } from "@/redux/api/carts/addtocart/addToCartApi";
import { syncCartAfterLogin } from "@/app/utils/syncCartAfterLogin";
import { useSelector } from "react-redux";

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();
    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState("");
    const [otpToken, setOtpToken] = useState(null);
    const [otp, setOtp] = useState("");
    const [isForgotFlow, setIsForgotFlow] = useState(false);

    const { isAuthenticated } = useSelector((state) => state.auth || {});

    const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
    const [setPassword, { isLoading: isSettingPassword }] = useSetPasswordMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();

 const [syncGuestCart] = useSyncGuestCartMutation();
  const { refetch: refetchCart } = useGetCartItemsQuery(undefined, { skip: !isAuthenticated });

  const { items: guestCart = [], selectedItems: selectedCartItems = [] } = useSelector(
    (state) => state.cart || {}
  );


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
                if (isForgotFlow) {
                    setStep("otp");
                } else {
                    if (res?.data?.password) setStep("password");
                    else {
                        setStep("otp");
                        toastSuccess("OTP sent successfully!");
                    }

                }
            } catch (error) {
                handleApiError(error);
            }
        }

        else if (step === "password") {
            try {
                await login({ phone, password: data.password }).unwrap();
                toastSuccess("Login successful!");
               await syncCartAfterLogin(syncGuestCart, refetchCart, guestCart, selectedCartItems);
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

                if (isForgotFlow) {
                    setStep("setPassword");
                    toastSuccess("OTP verified! Now set a new password.");
                } else {
                    if (res?.data?.set_password === true) {
                        setStep("setPassword");
                        toastSuccess("OTP verified! Please set your password.");
                    } else {
                        toastSuccess("Login successful with OTP!");
                        await syncCartAfterLogin(syncGuestCart, refetchCart, guestCart, selectedCartItems);
                        router.back(redirectTo || "/");
                    }
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

                if (isForgotFlow) {
                    toastSuccess("Password reset successful! Please login now.");
                    setIsForgotFlow(false);
                    reset();
                    setStep("phone");
                } else {
                    toastSuccess("Password set & login successful!");
                    await syncCartAfterLogin(syncGuestCart, refetchCart, guestCart, selectedCartItems);
                    router.back(redirectTo || "/");
                }
            } catch (error) {
                handleApiError(error);
            }
        }
    };


    const handleResendOtp = async () => {
        try {
            await sendOtp({ phone }).unwrap();
            toastSuccess("OTP resent successfully!");
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleChangePhone = () => {
        setStep("phone");
        setOtp("");
        setOtpToken(null);
    };

    const isLoading =
        isSendingOtp || isVerifyingOtp || isSettingPassword || isLoggingIn;

    return (
        <div className="max-w-md mx-auto p-4 bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {step === "phone" && (
                    <>
                        <CompanySortInfo title="Login to Continue"
                            message="Login to your account to continue shopping" />
                        <input
                            type="text"
                            placeholder="Please enter your phone number"
                            {...register("phone", { required: true })}
                            className="w-full py-2 px-3 text-black rounded border border-neutral-300 focus:outline-none focus:ring-primary-500 focus:ring-1 focus:border-transparent "
                        />
                    </>
                )}

                {step === "password" && (
                    <>
                        <CompanySortInfo title="Login to Continue"
                            message="Login to your account to continue shopping" />

                        <input
                            type="password"
                            placeholder="Enter password"
                            {...register("password", { required: true })}
                            className="w-full text-black rounded border px-3 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--bs-primary-500)]"
                        />


                        <button
                            type="button"
                            onClick={() => {
                                setIsForgotFlow(true);
                                setStep("phone");
                            }}
                            className="text-sm text-neutral-600 underline"
                        >
                            Forgot Password?
                        </button>
                    </>
                )}

                {step === "otp" && (
                    <>
                        <CompanySortInfo
                            title="OTP Verification"
                            message="Please enter it below to continue shopping"
                        />
                        <div className=" mb-6">
                            <span className="font-medium text-neutral-600 text-sm">
                                An OTP has been sent to <strong>{phone}</strong>.
                            </span>

                            <button
                                type="button"
                                onClick={handleChangePhone}
                                className="text-primary hover:underline text-sm font-medium cursor-pointer ml-2"
                            >
                                Change number
                            </button>
                        </div>
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
                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                className="text-sm text-primary cursor-pointer hover:underline"
                            >
                                Resend OTP
                            </button>
                        </div>
                    </>
                )}

                {step === "setPassword" && (
                    <>
                        <CompanySortInfo
                            title="Set your Password"
                            message="Set a new password to continue shopping"
                        />
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
                    className={`w-full bg-primary-500 text-white p-2 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
