const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//get all products
export const getProducts = async () => {
    try {
        const res = await fetch(`${BASE_URL}/shop/products`, {
            cache: "no-store",
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Get products error:", error);
        return [];
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

        console.log("Review response", data);
        return data.data;
    } catch (error) {
        console.error("Get single product error:", error);
        return null;
    }
};

