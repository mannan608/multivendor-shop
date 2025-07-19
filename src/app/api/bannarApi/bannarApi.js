const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getBanners = async () => {
    try {
        const res = await fetch(`${BASE_URL}/sliders`, {
            cache: "no-store",
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        const response = await res.json();
        const rawData = response.data;

        // Group by slider_type
        const grouped = {};
        for (const key in rawData) {
            const { slider_type, sliders } = rawData[key];
            if (slider_type && sliders?.length) {
                grouped[slider_type] = sliders;
            }
        }

        return grouped;
    } catch (error) {
        console.error("getBanners error:", error);
        return {};
    }
};
