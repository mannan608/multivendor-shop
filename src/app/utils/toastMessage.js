import { showToast } from "nextjs-toast-notify";

export const defaultToastOptions = {
    duration: 2000,
    progress: false,
    position: "bottom-right",
    transition: "fadeIn",
    icon: '',
    sound: true,
    className: "tn-toast",
};

export const toastSuccess = (message, options = {}) => {
    showToast.success(message, { ...defaultToastOptions, ...options });
};

export const toastError = (message, options = {}) => {
    showToast.error(message, { ...defaultToastOptions, ...options });
};

export const toastWarning = (message, options = {}) => {
    showToast.warning(message, { ...defaultToastOptions, ...options });
};