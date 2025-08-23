import { toastWarning } from "./toastMessage";

export const handleApiError = (error) => {
    const msg =
        error?.data?.message ||
        error?.data?.errors?.[Object.keys(error?.data?.errors || {})[0]]?.[0] ||
        "Something went wrong!";
    toastWarning(msg);
};