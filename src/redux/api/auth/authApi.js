import { apiSlice } from "../apiSlice/apiSlice";
import { updateUser, userLoggedIn, userNeedsPassword } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendOtp: builder.mutation({
            query: (data) => ({
                url: "/send-otp",
                method: "POST",
                body: data,
            }),
        }),

        verifyOtp: builder.mutation({
            query: (data) => ({
                url: "/verify-otp",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data && data.data) {
                        const accessToken = data.data.token;
                        const user = data.data.user;

                        // use Redux to track "needs password" state
                        if (data.data.set_password === false) {
                            // User already has password OR no password required
                            localStorage.setItem("auth", JSON.stringify({ accessToken, user }));
                            dispatch(userLoggedIn({ accessToken, user }));
                        } else {
                            // User needs to set password
                            localStorage.setItem("passAuth", JSON.stringify({ accessToken, user }));
                            dispatch(userNeedsPassword({ accessToken, user }));
                        }
                    }
                } catch (err) {
                    console.error("OTP verification failed:", err);
                }
            },
        }),

        setPassword: builder.mutation({
            query: (data) => ({
                url: "/new-password",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("passAuth"))?.accessToken}`,
                },
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    const passAuth = JSON.parse(localStorage.getItem("passAuth") || "{}");

                    if (passAuth.accessToken) {
                        const authData = {
                            accessToken: passAuth.accessToken,
                            user: passAuth.user || null,
                        };

                        // promote from passAuth → auth
                        localStorage.setItem("auth", JSON.stringify(authData));
                        localStorage.removeItem("passAuth");

                        dispatch(userLoggedIn(authData));
                    }
                } catch (err) {
                    console.error("Password set failed:", err);
                }
            },
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const accessToken = data.data.token;
                    const user = data.data.user;
                    localStorage.setItem("auth", JSON.stringify({ accessToken, user }));

                    dispatch(userLoggedIn({ accessToken, user }));
                } catch (err) {
                    console.error("Login failed:", err);
                }
            },
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/profile/update",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const updatedUser = data.data.user;

                    const auth = JSON.parse(localStorage.getItem("auth"));
                    const updatedAuth = { ...auth, user: updatedUser };

                    localStorage.setItem("auth", JSON.stringify(updatedAuth));
                    dispatch(userLoggedIn({ accessToken: auth.accessToken, user: updatedUser }));
                } catch (err) {
                    console.error("Update profile failed:", err);
                }
            },
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/reset-password",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const updatedUser = data?.data?.user;

                    const auth = JSON.parse(localStorage.getItem("auth"));
                    const updatedAuth = { ...auth, user: updatedUser };

                    localStorage.setItem("auth", JSON.stringify(updatedAuth));
                    dispatch(userLoggedIn({ accessToken: auth.accessToken, user: updatedUser }));
                } catch (err) {
                    console.error("Reset password failed:", err);
                }
            },
        }),

        sentOtpEmail: builder.mutation({
            query: (email) => ({
                url: `/send-otp-email/`,
                method: "POST",
                body: email,
            }),
        }),

        verifyEmailOtp: builder.mutation({
            query: (data) => ({
                url: "/verify-otp-email",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data && data.data) {
                        const user = data.data.user;
                        const currentAuth = getState().auth;
                        localStorage.setItem("auth", JSON.stringify({
                            accessToken: currentAuth.accessToken,
                            user,
                        }));
                        dispatch(updateUser(user));
                    }
                } catch (err) {
                    console.error("Verify email OTP failed:", err);
                }
            },
        }),
    }),
});

export const {
    useSendOtpMutation,
    useVerifyOtpMutation,
    useSetPasswordMutation,
    useLoginMutation,
    useUpdateProfileMutation,
    useResetPasswordMutation,
    useSentOtpEmailMutation,
    useVerifyEmailOtpMutation,
} = authApi;
