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
        console.error("getProducts error:", error);
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
        console.error("getSingleProduct error:", error);
        return null;
    }
};

