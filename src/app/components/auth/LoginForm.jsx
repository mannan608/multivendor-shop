"use client"
import { useLoginMutation, useSendOtpMutation, useSetPasswordMutation, useVerifyOtpMutation } from '@/redux/api/auth/authApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const LoginForm = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState('phone'); // phone, otp, setPassword
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [message, setMessage] = useState('');

    const router = useRouter();

    // RTK Query mutations
    const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
    const [setPasswordMutation, { isLoading: isSettingPassword }] = useSetPasswordMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();

    const handleSendOTP = async (e) => {
        e.preventDefault();

        try {
            const result = await sendOtp({ phone }).unwrap();

            console.log("first", result);

            if (result.success) {
                setStep('otp');
                setMessage('OTP sent to your phone');
                // Check if user exists to show password login option
                setShowPasswordLogin(result.userExists);
            } else {
                setMessage(result.message || 'Failed to send OTP');
            }
        } catch (error) {
            setMessage(error?.data?.message || 'Failed to send OTP');
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        try {
            const result = await verifyOtp({ phone, otp }).unwrap();

            if (result.success) {
                // Check if user needs to set password
                const passAuth = localStorage.getItem("passAuth");

                if (passAuth) {
                    // User needs to set password (second time)
                    setStep('setPassword');
                    setMessage('Please set a password for your account');
                } else {
                    // Direct login (first time or user already has password)
                    setMessage('Login successful!');
                    router.push('/dashboard');
                }
            } else {
                setMessage(result.message || 'Invalid OTP');
            }
        } catch (error) {
            setMessage(error?.data?.message || 'Verification failed');
        }
    };

    const handleSetPassword = async (e) => {
        e.preventDefault();

        try {
            const result = await setPasswordMutation({ password }).unwrap();

            if (result.success) {
                setMessage('Password set successfully! Logging you in...');
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                setMessage(result.message || 'Failed to set password');
            }
        } catch (error) {
            setMessage(error?.data?.message || 'Failed to set password');
        }
    };

    const handlePasswordLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await login({ phone, password }).unwrap();

            if (result.success) {
                setMessage('Login successful!');
                router.push('/dashboard');
            } else {
                setMessage(result.message || 'Invalid credentials');
            }
        } catch (error) {
            setMessage(error?.data?.message || 'Login failed');
        }
    };

    const resetToPhone = () => {
        setStep('phone');
        setOtp('');
        setPassword('');
        setMessage('');
        setShowPasswordLogin(false);
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {step === 'phone' ? 'Login / Sign Up' :
                    step === 'otp' ? 'Verify OTP' : 'Set Password'}
            </h2>

            {message && (
                <div className={`mb-4 p-3 rounded border ${message.includes('successful') || message.includes('sent')
                    ? 'bg-green-100 border-green-400 text-green-700'
                    : 'bg-red-100 border-red-400 text-red-700'
                    }`}>
                    {message}
                </div>
            )}

            {/* Phone Number Step */}
            {step === 'phone' && (
                <>
                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="+1234567890"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSendingOtp}
                            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSendingOtp ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>

                    {/* Password Login Option */}
                    {showPasswordLogin && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-medium mb-4">Or login with password</h3>
                            <form onSubmit={handlePasswordLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoggingIn ? 'Logging in...' : 'Login with Password'}
                                </button>
                            </form>
                        </div>
                    )}
                </>
            )}

            {/* OTP Verification Step */}
            {step === 'otp' && (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Enter OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                            placeholder="123456"
                            maxLength={6}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isVerifyingOtp || otp.length !== 6}
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button
                        type="button"
                        onClick={resetToPhone}
                        className="w-full text-blue-600 underline hover:text-blue-800"
                    >
                        Back to Phone Number
                    </button>
                </form>
            )}

            {/* Set Password Step */}
            {step === 'setPassword' && (
                <form onSubmit={handleSetPassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Create Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter a strong password"
                            minLength={6}
                            required
                        />
                        <p className="text-sm text-gray-600 mt-1">
                            Minimum 6 characters required
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={isSettingPassword || password.length < 6}
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSettingPassword ? 'Setting Password...' : 'Set Password & Login'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoginForm