export const normalizeError = (error) => {
    const defaultError = {
        message: 'An unexpected error occurred',
        errors: null,
        status: null,
        isNetworkError: false,
        isValidationError: false,
        isUnauthorized: false,
        isForbidden: false,
        isNotFound: false,
        isConflict: false,
        isTooManyRequests: false,
        isServerError: false,
        isBadGateway: false,
        isServiceUnavailable: false,
        isGatewayTimeout: false,
    };

    // Network error (e.g., fetch failure)
    if (error instanceof TypeError && error.message?.includes('Failed to fetch')) {
        return {
            ...defaultError,
            message: 'Network error - Please check your internet connection',
            isNetworkError: true,
        };
    }

    // Handle structured API error with status code
    if (error && error.status && error.data) {
        const { status, data } = error;

        return {
            ...defaultError,
            message: data.message || defaultError.message,
            errors: data.errors || null,
            status: status,
            isValidationError: status === 422,
            isUnauthorized: status === 401,
            isForbidden: status === 403,
            isNotFound: status === 404,
            isConflict: status === 409,
            isTooManyRequests: status === 429,
            isServerError: status >= 500 && status < 600,
            isBadGateway: status === 502,
            isServiceUnavailable: status === 503,
            isGatewayTimeout: status === 504,
        };
    }

    // Fallback for other error types
    return {
        ...defaultError,
        message: error?.message || defaultError.message,
    };
};
