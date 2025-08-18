// utils/redirect.js
export const setRedirectPath = (path) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("redirectPath", path);
    }
};

export const getRedirectPath = () => {
    if (typeof window !== "undefined") {
        const path = localStorage.getItem("redirectPath") || "/";
        localStorage.removeItem("redirectPath");
        return path;
    }
    return "/";
};