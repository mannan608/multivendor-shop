'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useEffect } from 'react';
import { userLoggedIn } from '../api/auth/authSlice';

export function ReduxProvider({ children }) {
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');
        if (auth?.accessToken && auth?.user) {
            store.dispatch(userLoggedIn(auth));
        }
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}