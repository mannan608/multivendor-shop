const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

