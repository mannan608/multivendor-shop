import { normalizeError } from "@/app/utils/errorHandler";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getProducts = async (page = 1) => {
    try {
        const res = await fetch(`${BASE_URL}/shop/products?page=${page}`, {
            cache: "no-store",
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();

        return {
            products: data.data,
            nextPageUrl: data.next_page_url,
            currentPage: data.current_page,
            lastPage: data.last_page,
        };
    } catch (error) {
        const parsed = normalizeError(error);
        toast.error(parsed.message);
        console.error("Get products error:", error);
        return {
            products: [],
            nextPageUrl: null,
            currentPage: 1,
            lastPage: 1,
        };
    }
};


//get single product base on slug
export const getSingleProduct = async (slug) => {
    try {
        const res = await fetch(`${BASE_URL}/shop/product/${slug}`, {
            cache: "no-store",
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Get single product error:", error);
        return null;
    }
};

//get single product base on slug
export const getProductReviews = async (slug) => {
    try {
        const res = await fetch(`${BASE_URL}/product/${slug}/reviews`, {
            cache: "no-store",
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error("Get single product error:", error);
        return null;
    }
};

