import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            const { accessToken, user } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        userLoggedOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        // Action for when user needs to set password
        userNeedsPassword: (state, action) => {
            const { accessToken, user } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.isAuthenticated = false; // Not fully authenticated until password is set
            state.isLoading = false;
        },
    },
});

export const {
    userLoggedIn,
    userLoggedOut,
    updateUser,
    setLoading,
    userNeedsPassword
} = authSlice.actions;

export default authSlice.reducer;